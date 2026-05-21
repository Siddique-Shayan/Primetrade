import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { Env } from "./config/env.config.js";
import { globalErrorHandler } from "./middlewares/globalError.middlewares.js";
import {
    swaggerUi,
    swaggerSpec
} from "./config/swagger.config.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(globalErrorHandler);
app.use(helmet());
app.use(morgan("dev"));


app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

import authRouter from "./routes/auth.routes.js";
import taskRouter from './routes/task.routes.js';
import adminRouter from './routes/admin.routes.js';

app.use(`${Env.BASE_PATH}/auth`, authRouter);
app.use(`${Env.BASE_PATH}/tasks`, taskRouter);
app.use(`${Env.BASE_PATH}/admin`, adminRouter);




export { app };
