const { spawn } = require("child_process");
const fs = require("fs");

exports.createProcessController = (req, res) => {
  const childProcess = spawn("node", { detached: true });
  const pid = childProcess.pid;
  const creationTime = new Date().toLocaleString();
  const data = { pid, creationTime, logsTime: [] };
  try {
    fs.writeFileSync(`process_${pid}.json`, JSON.stringify(data));

    setInterval(() => {
      const filePath = `process_${pid}.json`;
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, fileData) => {
          if (err) {
            console.error("Error reading process file:", err);
            return;
          }
          try {
            let processData = JSON.parse(fileData);
            processData.logsTime.push(new Date().toLocaleString());
            fs.writeFile(filePath, JSON.stringify(processData), (err) => {
              if (err) console.error("Error updating process file:", err);
            });
          } catch (err) {
            console.error("Error parsing or updating JSON data:", err);
          }
        });
      }
    }, 5000);
  } catch (error) {
    console.log("Errors: ", error);
  }

  res.status(200).json({ pid, creationTime });
};
