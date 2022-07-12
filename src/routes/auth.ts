import { Router } from "express";
import { makeAuthService } from "../services/auth";

export const authRouter = Router();

const authService = makeAuthService();

authRouter.post("/register", async (req, res) => {
  try {
    const params = req.body as {
      username: string;
      first_name: string;
      last_name: string;
      email:string;
      password: string;
      age:number;
      gender: string;
      country: string;
      role: "Instructor" | "Student";
    };
    const userInfo = await authService.createAccount(
        params.username,
        params.first_name,
        params.last_name,
        params.email,
        params.password,
        params.age,
        params.gender,
        params.country,
        params.role
    );

    res.json(userInfo);
  } catch (e) {
    res.status(404).send("Failed to create an account");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const params = req.body as {
      username: string;
      password: string;
    };

    const userInfo = await authService.login(params.username, params.password);

    res.json(userInfo);
  } catch (e) {
    res.status(404).send("Failed to login");
  }
});
