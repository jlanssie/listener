const express = require("express");
const app = express();
const port = 5555;

function logRequest(req) {
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  console.log("Request Query Params:", req.query);
  console.log("Request Params:", req.params);
  console.log("Request IP:", req.ip);
  console.log("\n----\n");
}

app.use(express.json());

app.use(function(req, res){
  logRequest(req);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`ExpressJS listening on port ${port}`);
});
