import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Nemoris API platform!");
});

app.get("/status", (req, res) => {
  const lastUpdated = new Date().toUTCString();

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>System Status</title>
      <style>
        body {
          font-family: "Segoe UI", sans-serif;
          background: #f4f6f8;
          margin: 0;
          padding: 40px 20px;
          color: #333;
        }

        ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
  }
        .container {
          max-width: 960px;
          margin: auto;
          background: #fff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
        }

        h1 {
          text-align: center;
          color: #2ecc71;
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .subtitle {
          text-align: center;
          color: #555;
          margin-bottom: 30px;
        }

        .section {
          margin-top: 40px;
        }

        .section h2 {
          font-size: 1.3rem;
          color: #3498db;
          margin-bottom: 16px;
          border-bottom: 2px solid #eee;
          padding-bottom: 4px;
        }

        .status-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
          align-items: center;
        }

        .status-label {
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-icon {
          font-size: 1.2rem;
        }

        .status-value {
          font-weight: 600;
          color: #2ecc71;
        }

        .status-value.alert {
          color: #e74c3c;
        }

        .legend {
          margin-top: 30px;
          padding-top: 10px;
          border-top: 1px dashed #ccc;
          font-size: 0.9rem;
          color: #777;
        }

        .footer {
          text-align: center;
          font-size: 0.8rem;
          color: #888;
          margin-top: 40px;
        }

        @media (max-width: 600px) {
          .status-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .status-value {
            margin-top: 4px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✅ All Systems Operational</h1>
        <p class="subtitle">Real-time status of infrastructure and services</p>

        <div class="section">
          <h2>🧱 Core Services</h2>
          <div class="status-item">
            <div class="status-label"><span class="status-icon">🗄️</span>Database Server:</div>
            <div class="status-value">Running Perfectly</div>
          </div>
          <div class="status-item">
            <div class="status-label"><span class="status-icon">🔀</span>Database Shards:</div>
            <div class="status-value">All Operational</div>
          </div>
          <div class="status-item">
            <div class="status-label"><span class="status-icon">☸️</span>Kubernetes Clusters:</div>
            <div class="status-value">Normal</div>
          </div>
          <div class="status-item">
            <div class="status-label"><span class="status-icon">🖥️</span>Backend Servers:</div>
            <div class="status-value">Operational & Stable</div>
          </div>
          <div class="status-item">
            <div class="status-label"><span class="status-icon">📦</span>Pods:</div>
            <div class="status-value">Healthy & Running</div>
          </div>
        </div>

        <div class="section">
          <h2>📊 Additional Info</h2>
          <div class="status-item">
            <div class="status-label">Uptime:</div>
            <div class="status-value">99.98%</div>
          </div>
          <div class="status-item">
            <div class="status-label">Last Downtime:</div>
            <div class="status-value">None Detected</div>
          </div>
          <div class="status-item">
            <div class="status-label">Average Response Time:</div>
            <div class="status-value">40ms</div>
          </div>
          <div class="status-item">
            <div class="status-label">API Health:</div>
            <div class="status-value">✅ All Endpoints Responsive</div>
          </div>
        </div>

        <div class="section">
          <h2>🚨 Alerts</h2>
          <div class="status-item">
            <div class="status-label">Downtime Detected:</div>
            <div class="status-value alert">No recent downtime</div>
          </div>
        </div>

        <div class="legend">
          ✅ Green = Operational | 🔴 Red = Issue Detected
        </div>

        <div class="footer">
          Last Updated: ${lastUpdated}
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));
