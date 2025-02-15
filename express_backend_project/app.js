const express = require("express");
const { spawn } = require("child_process");

const app = express();
const PORT = 3001;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

app.get("/data", (req, res) => {
  let dataToSend;

  const pythonProcess = spawn("python3.10", ["python/script.py"]);
  // collect data from script
  pythonProcess.stdout.on("data", function (data) {
    dataToSend = data.toString();
  });

  // close stream from child process
  pythonProcess.on("exit", (code) => {
    console.log(`Data sent successfully`);
    res.send(dataToSend);
  });
});
