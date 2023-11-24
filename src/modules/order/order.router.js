import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Order Router" });
});

export default router;
