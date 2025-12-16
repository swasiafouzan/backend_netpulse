import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//ping 
router.get("/ping", (req, res) => {
    res.send("pong");
});

// router.get("/download/:size", (req, res) => {
//     const { size } = req.params;
//     const filePath = path.join(
//         __dirname,
//         "../test-files",
//         `${size}mb.bin`
//     );
//     if (!fs.existsSync(filePath)) {
//         return res.status(404).json({
//             error: "Test file not found",
//             path: filePath
//         });
//     }
//     res.download(filePath);
// });

//adding function to upload chunk data as test-files not working in render
router.get("/download", (req, res) => {
  const sizeMB = Number(req.query.size || 20);
  const totalBytes = sizeMB * 1024 * 1024;

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Length", totalBytes);
  res.setHeader("Cache-Control", "no-store");

  const chunk = Buffer.alloc(1024 * 64); // 64KB chunk
  let sent = 0;

  function send() {
    while (sent < totalBytes) {
      if (!res.write(chunk)) {
        return res.once("drain", send);
      }
      sent += chunk.length;
    }
    res.end();
  }

  send();
});
  


//upload test
router.post("/upload", (req, res) => {
    req.on("data", () => { });
    req.on("end", () => {
        res.send("Upload received");
    });
});

export default router;



