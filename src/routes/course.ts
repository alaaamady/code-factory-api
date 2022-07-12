import { Router } from "express";
import {  makeCourseStore } from "../models";

export const courseRouter = Router();
const courseStore = makeCourseStore();
courseRouter.get("/", async (_, res) => {
  try {
    const courses = await courseStore.index();
    res.json(courses);
  } catch (error) {
    res.status(404).send("Failed to load courses");
  }
});

courseRouter.get("/:courseId", async (req, res) => {
  try {
    const courses = await courseStore.get(Number(req.params.courseId));
    res.json(courses);
  } catch (error) {
    res.status(404).send("Failed to load course");
  }
});

