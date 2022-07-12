import client from "../database";

async function getUser(username: string): Promise<{
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string,
  age: number; 
  gender: string;
  country: string;
}> {
  const connection = await client.connect();

  const result = await connection.query(
    'SELECT * FROM "users" WHERE username = $1',
    [username]
  );

  connection.release();

  if (result.rowCount === 0) {
    throw new Error("Cant find user");
  }

  return result.rows[0];
}

async function createUser(
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  age: number,
  gender: string,
  country: string,
): Promise<{ id: number;  username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    age: number,
    gender: string,
    country: string, }> {
  const connection = await client.connect();

  const result = await connection.query(
    'INSERT INTO "users" (username,first_name,last_name,email,password,age,gender,country) VALUES ($1, $2, $3, $4, $5, $6, $7 , $8) RETURNING *',
    [username, first_name, last_name, email, password, age, gender, country]
  );


  connection.release();

  return result.rows[0];
}

export function makeUserStore() {
  return {
    getUser,
    createUser,
  };
}


