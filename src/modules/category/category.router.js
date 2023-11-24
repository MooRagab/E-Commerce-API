import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Category Router" });
});

export default router;
