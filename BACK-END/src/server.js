import express from "express";
import cors from "cors";
import notesRoutes from "./Routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

//routes
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../FRONT-END/dist")));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../FRONT-END/dist/index.html"));
  });
}

//connect to database and start server

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started successfully on PORT: ${PORT}`);
  });
});
