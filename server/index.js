import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/speed.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`NetPulse server running on port ${PORT}`) });
