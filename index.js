#!/usr/bin/env node

const express = require("express");
const server = express();

const opts = {
  port: process.env.PORT || 8080,
  respCode: 200,
  body: "",
  cors: false,
};

process.argv.forEach((arg, index) => {
  if (arg === "-p" || arg === "--port") opts.port = process.argv[index + 1];
  if (arg === "-x" || arg === "--cors") opts.cors = true;
  if (arg === "-c" || arg === "--code")
    opts.respCode = Number.parseInt(process.argv[index + 1]);

  if (arg === "-b" || arg === "--body") {
    try {
      const parsed = JSON.parse(process.argv[index + 1]);
      if (parsed) opts.body = parsed;
    } catch (err) {
      opts.body = process.argv[index + 1];
    }
  }
});

server.use(function (req, res, next) {
  req.rawBody = "";
  req.setEncoding("utf8");

  req.on("data", function (chunk) {
    req.rawBody += chunk;
  });

  req.on("end", function () {
    next();
  });
});
server.all("/*", (req, res) => {
  if(opts.cors) {
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader("access-control-allow-headers", "*");
    res.setHeader("access-control-allow-methods", "*");
  }
  console.log(
    `${req.method} => ${req.originalUrl}[${
      req.headers["content-type"]
    }]:\n${req.rawBody
      .split("\n")
      .map((e) => `\t${e}`)
      .join("\n")}\n`
  );
  res.status(opts.respCode);
  res.setHeader("Connection", "close");
  if (typeof opts.body === "object") res.json(opts.body);
  else {
    res.setHeader("Content-Type", "text/plain");

    res.send(opts.body);
  }
});

server.listen(opts.port, () => console.log("server ready on", opts.port));
