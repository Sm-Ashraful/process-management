const fs = require("fs").promises;
const path = require("path");
const child_process = require("child_process"); // For process termination

exports.killProcessAndDeleteFile = async (req, res) => {
  const processDirectory = "D:\\Task\\process-management";
  const pid = req.body.pid;

  const filePath = path.join(processDirectory, `process_${pid}.json`);
  try {
    await killProcess(pid);

    await fs.unlink(filePath);
    res.status(200).json({
      message: `Process with PID ${pid} terminated and file deleted.`,
    });
  } catch (err) {
    if (err.code === "ENOENT") {
      return res.status(404).json({ error: "Process not found" });
    } else {
      console.error("Error killing process or deleting file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

async function killProcess(pid) {
  return new Promise((resolve, reject) => {
    const platform = process.platform;
    console.log("Platform: ", platform);
    let command;
    switch (platform) {
      case "win32":
        command = `taskkill /F /PID ${pid}`;
        break;
      default:
        return reject(new Error("Unsupported platform"));
    }
    child_process.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log("Done");
        resolve();
      }
    });
  });
}
