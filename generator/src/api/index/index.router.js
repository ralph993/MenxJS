import express from "express";
const router = express.Router();
import { helloWord } from "./index.controller.js";
import {} from "./index.middleware.js";

router.get("/", helloWord);

export default router;
