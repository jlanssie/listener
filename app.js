const express = require("express");
const app = express();
const port = 5555;

const fs = require("fs");
const LOG = "output.log";

resetColor = "\x1b[0m";
redColor = "\x1b[31m";
greenColor = "\x1b[32m";
cyanColor = "\x1b[36m";

const method = (req) => `Request Method: ${req.method}`;
const url = (req) => `Request URL: ${req.url}`;
const headers = (req) => `Request Headers: ${JSON.stringify(req.headers)}`;
const body = (req) => `Request Body: ${JSON.stringify(req.body)}`;
const queryParams = (req) =>
  `Request Query Params: ${JSON.stringify(req.query)}`;
const params = (req) => `Request Params: ${JSON.stringify(req.params)}`;
const ip = (req) => `Request IP: ${req.ip}`;
const time = () => `Request Time: ${new Date().toISOString()}`;

function logRequest(req) {
  const requestDetailsForConsole = [
    `\n${cyanColor}${url(req)}${resetColor}`,
    `${method(req)}`,
    `${cyanColor}${headers(req)}${resetColor}`,
    body(req),
    queryParams(req),
    params(req),
    ip(req),
    `${time()}\n`,
  ].join("\n");

  const requestDetailsForFile = [
    `\nurl(req)`,
    `${method(req)}`,
    headers(req),
    body(req),
    queryParams(req),
    params(req),
    ip(req),
    `${time()}\n`,
  ].join("\n");

  console.log(requestDetailsForConsole);

  fs.writeFile(LOG, requestDetailsForFile, { flag: "a" }, (err) => {
    if (err) {
      console.error(`${redColor}Error writing to file:`, err, `${resetColor}`);
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
