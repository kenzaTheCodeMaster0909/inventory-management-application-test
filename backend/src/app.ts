import express from "express";
import type {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import articleRoutes from "./routes/article.routes.js";
import type { SimpleResponse } from "./types/requests.js";

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// Health check endpoint
app.get("/health", (_req: Request, res: Response<SimpleResponse>) => {
  res.json({ success: true, message: "Server is running" });
});

// 404 handler
app.use((_req: Request, res: Response<SimpleResponse>) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// Global error handler
const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response<SimpleResponse>,
  _next: NextFunction
) => {
  console.error("Error:", err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
};

app.use(errorHandler);

export default app;
