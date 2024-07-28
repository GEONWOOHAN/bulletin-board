import express from "express";
import { getUpload, postUpload, seeArticle, getEditArticle, postEditArticle, deleteArticle } from "../controllers/articleController";
import { imageUpload } from "../middlewares";

const articleRouter = express.Router();

articleRouter.route("/upload").get(getUpload).post(imageUpload.array("image"), postUpload);
articleRouter.get("/:id", seeArticle);
articleRouter.route("/:id/edit").get(getEditArticle).post(imageUpload.array("image"), postEditArticle);
articleRouter.get("/:id/delete", deleteArticle);

export default articleRouter;