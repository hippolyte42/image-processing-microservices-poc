const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "cache/" });
const PORT = 3001;

app.post("/image", upload.single("image"), (req, res) => {
  const tmpPath = req.file.path;
  const targetPath = path.join(__dirname, "cache", req.file.originalname);

  fs.rename(tmpPath, targetPath, (err) => {
    if (err) {
      return res
        .status(500)
        .send(`Error while uploading image: ${JSON.stringify(err)}`);
    }
    res.send("Image upload succesfull");
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
