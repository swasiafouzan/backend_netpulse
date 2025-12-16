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

router.get("/download/:size", (req, res) => {
    const { size } = req.params;

    const filePath = path.join(
        __dirname,
        "../test-files",
        `${size}mb.bin`
    );

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            error: "Test file not found",
            path: filePath
        });
    }

    res.download(filePath);
});


//upload test
router.post("/upload", (req, res) => {
    req.on("data", () => { });
    req.on("end", () => {
        res.send("Upload received");
    });
});

export default router;



