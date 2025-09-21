import express from "express";
import qr from "qr-image";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from "public" folder
app.use(express.static("public"));

// API route to generate QR
app.post("/generate", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const qr_png = qr.imageSync(url, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    res.send(qr_png);
  } catch (err) {
    res.status(500).json({ error: "QR generation failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
