import {
    makeInstructorStore,
    makeStudentStore,
    makeUserStore,
  } from "../models";
  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";
  
  const userStore = makeUserStore();
  const studentStore = makeStudentStore();
  const instructorStore = makeInstructorStore();
  
  const {
    TOKEN_SECRET: tokenSecret,
    BCRYPT_PASSWORD: pepper,
    SALT_ROUNDS: saltRounds,
  } = process.env;
  
  async function login(
    username: string,
    password: string
  ): Promise<{ id: number; username: string; token: string }> {
    if (!tokenSecret || !pepper) throw new Error("Missing env variables");
  
    const storedUser = await userStore.getUser(username);
  
    const storedUserHash = storedUser.password;
  
    const isValid = await bcrypt.compare(password + pepper, storedUserHash);
  
    if (!isValid) throw new Error("Invalid login");
  
    const token = jwt.sign(
      { id: storedUser.id, username: storedUser.username },
      tokenSecret
    );
  
    return {
      id: storedUser.id,
      username: storedUser.username,
      token,
    };
  }
  
  async function createAccount(
    username: string,
    first_name: string,
    last_name: string,
    email : string,
    password: string,
    age: number,
    gender: string,
    country: string,
    role: "Instructor" | "Student"
  ) {

    if (!saltRounds || !tokenSecret) throw new Error("Missing env variable");
  
    const hashedPassword = await bcrypt.hash(
      password + pepper,
      Number(saltRounds)
    );
  
    const createdUser = await userStore.createUser(  
        username,
        first_name,
        last_name,
        email,
        hashedPassword,
        age,
        gender,
        country,
    );
  
    if (role === "Instructor") {
      await instructorStore.add({ 
          id: createdUser.id,
          first_name: createdUser.first_name,
          last_name: createdUser.last_name,
          email: createdUser.email,});


    } else {
      await studentStore.add({ 
        id: createdUser.id,
        first_name: createdUser.first_name,
        last_name: createdUser.last_name,
        email: createdUser.email,
        age: createdUser.age,
        gender: createdUser.gender,
        country: createdUser.country, });
    }
  
    const token = jwt.sign(
      { id: createdUser.id, username: createdUser.username },
      tokenSecret
    );
  
    return {
      id: createdUser.id,
      username: createdUser.username,
      token,
    };
  }
  
  function verify(token: string) {
    if (!tokenSecret) throw new Error("Missing env variables");
    return jwt.verify(token, tokenSecret);
  }
  
  export function makeAuthService() {
    return {
      login,
      createAccount,
      verify,
    };
  }
  

