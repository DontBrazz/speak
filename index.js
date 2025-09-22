import express from "express";
import { generateDataUrix } from "./generateDataUrix.js";

const app = express();
app.use(express.json());

app.post("/speak", async (req, res) => {
  const { phrase } = req.body;
  if (!phrase) return res.status(400).json({ error: "Missing phrase" });

  try {
    const base64 = await generateDataUrix(phrase);
    res.json({ audio: base64 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
