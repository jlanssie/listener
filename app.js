const express = require("express");
const app = express();
const port = 5555;

const fs = require("fs");
const LOG = "output.log";

function logRequest(req) {
  let string = `
    Request Method: ${req.method}\nRequest URL: ${
    req.url
  }\nRequest Headers: ${JSON.stringify(
    req.headers
  )}\nRequest Body: ${JSON.stringify(
    req.body
  )}\nRequest Query Params: ${JSON.stringify(
    req.query
  )}\nRequest Params: ${JSON.stringify(req.params)}\nRequest IP: ${
    req.ip
  }\nRequest Time: ${new Date().toISOString()}\n\n`;

  console.log(string);

  fs.writeFile(LOG, string, { flag: "a" }, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
  });
}

app.use(express.json());

app.use(function (req, res) {
  logRequest(req);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`ExpressJS listening on port ${port}`);
});
