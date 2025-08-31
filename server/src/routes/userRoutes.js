import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all users" });
});

router.post("/", (req, res) => {
  res.json({ message: "User created" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});



export default router;
