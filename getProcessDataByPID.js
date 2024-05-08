const fs = require("fs").promises;
const path = require("path");

exports.getProcessDataByPID = async (req, res) => {
  const processDirectory = "D:\\Task\\process-management";
  const pid = req.body.pid;

  const filePath = path.join(processDirectory, `process_${pid}.json`);
  console.log("FIle path: ", filePath);
  try {
    const processData = await fs.readFile(filePath, "utf8");
    console.log("Process data: ", processData);
    const parsedData = JSON.parse(processData);
    res.status(200).json(parsedData);
  } catch (err) {
    if (err.code === "ENOENT") {
      return res.status(404).json({ error: "Process not found" });
    } else {
      console.error("Error reading process file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
