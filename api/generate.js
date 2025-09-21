import qr from "qr-image";

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const qr_png = qr.imageSync(url, { type: "png" });
      res.setHeader("Content-Type", "image/png");
      res.send(qr_png);
    } catch (err) {
      res.status(500).json({ error: "QR generation failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
