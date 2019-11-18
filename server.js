const express = require("express");
const dotenv = require("dotenv");
const bootcampRoutes = require("./routes/bootcamps.route");
const coursesRoutes = require("./routes/courses.route");
const authRoutes = require("./routes/auth.route");
const { logger } = require("./middleware/logger.middleware");
const morgan = require("morgan");
const connectDB = require("./config/db");
var colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const path = require("path");

const app = express();

// body parse
app.use(express.json());

// cookie parse
app.use(cookieParser);

// load env file
dotenv.config({ path: "./config/config.env" });

// Connect to db
connectDB();

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File upload
app.use(fileupload());

// set static foalder
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 5000;

// Routes
app.use("/api/v1/bootcamps", bootcampRoutes);
app.use("/api/v1/courses", coursesRoutes);
app.use("/api/v1/auth", authRoutes);

// middlware
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`listening on http://localhost:${port}`.yellow.bold)
);

process.on("unhandledRejection", error => {
  // Will print "unhandledRejection err is not defined"
  console.log("unhandledRejection =>", error.message.red);
  server.close(() => process.exit(1));
});
