const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "cache/" });
const PORT = process.env.PORT || 3001;
const cachePath = process.env.CACHE_DIRECTORY || path.join(__dirname, "cache");

app.post("/image", upload.single("image"), (req, res) => {
  const { path: tmpPath, originalname: imageFileName } = req.file;
  const targetPath = path.join(cachePath, imageFileName);

  fs.rename(tmpPath, targetPath, (err) => {
    if (err) {
      console.error(
        `Error while uploading image ${imageFileName} : ${JSON.stringify(err)}}`
      );
      return res
        .status(500)
        .send(`Error while uploading image ${imageFileName}`);
    }
    res.send("Image upload succesfull");
  });
});

app.get("/image/:imageFileName", (req, res) => {
  const { imageFileName } = req.params;
  const imagePath = path.join(cachePath, imageFileName);

  if (!fs.existsSync(imagePath)) {
    console.error(`Image ${imageFileName} not found`);
    return res.status(404).send(`Image ${imageFileName} not found`);
  }
  res.sendFile(imagePath);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
