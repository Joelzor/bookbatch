const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// routers
const userRouter = require("./routes/users");
const batchRouter = require("./routes/batches");

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/batches", batchRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}`);
});
