const express = require("express");
const sharp = require("sharp");

const app = express();
const PORT = 3002;

app.get("/process/:imageFileName", async (req, res) => {
  try {
    const { imageFileName } = req.params;
    const imageFileExtension = imageFileName.split(".").pop();

    const response = await fetch(
      `http://service1:3001/image/${imageFileName}`,
      {
        method: "GET",
        headers: {
          Accept: "application/octet-stream",
        },
      }
    );
    const imageDataArrayBuffer = await response.arrayBuffer();

    const blurredImage = await sharp(imageDataArrayBuffer).blur(10).toBuffer();

    res.set("Content-Type", `image/${imageFileExtension}`);
    res.send(blurredImage);
  } catch (err) {
    res
      .status(500)
      .send(
        `Error while processing image ${imageFileName} : ${JSON.stringify(err)}`
      );
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
