const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

// routers
const userRouter = require("./routes/users");
const batchRouter = require("./routes/batches");

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/batches", batchRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}`);
});
