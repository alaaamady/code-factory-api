import express, { json, urlencoded } from "express";
import { authMiddleware } from "./middleware/auth";
import {
  authRouter,
  courseRouter,
  instructorRouter,
  studentRouter,
} from './routes';


const app = express();
const port = 3001;

app.use(urlencoded({ extended: true }));
app.use(json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/course", courseRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api/student", studentRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
