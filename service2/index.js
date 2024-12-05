const express = require("express");
const sharp = require("sharp");

const app = express();
const PORT = process.env.PORT || 3002;

app.get("/process/:imageFileName", async (req, res) => {
  const { imageFileName } = req.params;
  const imageFileExtension = imageFileName.split(".").pop();
  const service1Port = process.env.PORT_SERVICE1 || 3001;

  try {
    const response = await fetch(
      `http://service1:${service1Port}/image/${imageFileName}`,
      {
        method: "GET",
        headers: {
          Accept: "application/octet-stream",
        },
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const imageDataArrayBuffer = await response.arrayBuffer();

    const blurredImage = await sharp(imageDataArrayBuffer).blur(10).toBuffer();

    res.set("Content-Type", `image/${imageFileExtension}`);
    res.send(blurredImage);
  } catch (err) {
    console.error(
      `Error while processing image ${imageFileName} : ${JSON.stringify(err)}`
    );
    res.status(500).send(`Error while processing image ${imageFileName}`);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
