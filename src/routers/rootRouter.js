import express from "express";
import { home, search } from "../controllers/articleController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/search", search);

export default rootRouter;