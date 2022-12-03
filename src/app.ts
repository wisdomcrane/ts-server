import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import hpp from "hpp";
import helmet from "helmet";
import indexRouter from "./routes";

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || "development";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.set("json spaces", 2);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", indexRouter);

interface Err extends Error {
  status: number;
  data?: any;
}

app.use("/api", (req: Request, res: Response) => {
  // make 500 error
  res.status(200).json({ message: "Hello, TS!" });
});

// 여기까지 왔으면 라우트를 찾지 못했다는 것이므로 ststus 404를 세팅
app.use(function (req: Request, res: Response, next: NextFunction) {
  let err = new Error("Not Found") as Err;
  err.status = 404;
  next(err);
});

// render the error page
app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  if (process.env.NODE_ENV === "development") {
    res.json({
      message: err.message,
      data: err.data,
    });
  } else {
    res.json({ message: "무언가가 잘못되었습니다.", status: 500 });
  }
});

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
