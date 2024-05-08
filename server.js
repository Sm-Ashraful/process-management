const express = require("express");
const bodyParser = require("body-parser");

const { createProcessController } = require("./CreateProcessController");
const { getAllProcesses } = require("./GetAllProcess");
const { getProcessDataByPID } = require("./getProcessDataByPID");
const { killProcessAndDeleteFile } = require("./DeleteProcessByPID");

const app = express();
app.use(bodyParser.json());

const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/create-process", createProcessController);
app.get("/get-all", getAllProcesses);
app.post("/get-single", getProcessDataByPID);
app.post("/delete-process", killProcessAndDeleteFile);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
