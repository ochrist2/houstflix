var express = require("express");
var app = express();
var cors = require("cors");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var http = require("http").Server(app);

const path = require("path");
var port = 4200;
var files = [];
function hostVideo(req, res) {
  var currentVid = req.query.vidString;
  var fs = require("fs");
  console.log(currentVid);
  const path = __dirname + currentVid;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start =
      parseInt(parts[0], 10) > 0
        ? parseInt(parts[0], 10) - 1
        : parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;

    const file = fs.createReadStream(path, { start, end });
    files.push(file);
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4"
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
}
app.use(cors());
app.use(express.static(path.join(__dirname, "/build/")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
app.get("/video", function(req, res) {
  try {
    hostVideo(req, res);
  } catch (err) {
    console.log(err);
  }
});
app.post("/changeVideo", (req, res) => {
  currentVid = req.body.newVid;
  console.log(currentVid);
  res.json({ message: "changed to " + req.body.newVid });
});
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
