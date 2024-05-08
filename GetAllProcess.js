const fs = require("fs").promises; // Use promises for cleaner async/await syntax

exports.getAllProcesses = async (req, res) => {
  const processFiles = await fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.error("Error reading process directory:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return files;
  });

  const processes = [];
  for (const file of processFiles) {
    if (file.startsWith("process_")) {
      try {
        const filePath = `${__dirname}/${file}`;
        const processData = await fs.readFile(filePath, "utf8");
        const parsedData = JSON.parse(processData);

        processes.push({
          pid: parsedData.pid,
          creationTime: parsedData.creationTime,
        });
      } catch (err) {
        console.error("Error reading process file:", err);
      }
    }
  }

  res.status(200).json({ processes });
};
