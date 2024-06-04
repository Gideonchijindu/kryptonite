import "express-async-errors";
import "dotenv/config";
import express, { Router, urlencoded } from "express";
import cors from "cors";
import baseRoutes from "./routes/index.js";
import env from "./config/env.js"
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";



const router = Router();
const rootRouter = baseRoutes(router);

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
const port = env.port; /*
const baseURL =
  env.node_env === "development" ? "/krypto/api/v1" : "/krypto/api/v1/stag";

app.use(baseURL, rootRouter);*/
// route for home page
app.get("/", (req, res) => {
  res.send("Kryptonite says Hi");
});

app.use("/api/v1", rootRouter);


app.use("*", (req, res) => {
  res
    .status(404)
    .send({ message: "Cannot get resource", success: false, data: null });
});

//Database connection function
connectDB();

//error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server up and running @ port ${port}`);
});
