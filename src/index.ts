import express, { Request, Response, NextFunction } from "express";
import router from "./routes";
import multer from "multer";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router());

// Error handling middleware
app.use((
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
    }
    next(err);
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
