import express from "express";

import * as postController from "../controllers/postController";

const router = express.Router();

router.get("/posts", postController.index);

export default router;
