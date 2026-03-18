import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => {
  res.json({
    message: "Secure API Template running"
  });
});
import { errorHandler } from "./middlewares/error.middleware";

export default app;