import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeMessage } from "./openai.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.post("/analyze", async (req, res) => {
  console.log("HIT /analyze route");
  console.log(req.body);

  try {
    const { message } = req.body;
    const result = await analyzeMessage(message);

    console.log("FINAL RESULT SENT TO FRONTEND:", result);
    
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});