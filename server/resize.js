const fs = require("fs");
const sharp = require("sharp");

const AWS = require("aws-sdk");
AWS.config.loadFromPath("./aws-config.json");
const S3 = new AWS.S3({
  signatureVersion: "v4",
});

module.exports = function resize(path, format, width, height, fit, position) {
  try {
    let quality = 80;

    return S3.getObject({
      Bucket: "cdn.nicholasgriffin.dev",
      Key: path,
    })
      .promise()
      .then((data) => {
        if (data && data.Body) {
          return sharp(data.Body)
            .resize(width, height, {
              fit: fit ? fit : "cover",
              position: position ? position : "centre",
            })
            .toFormat(format, { quality: quality })
            .toBuffer();
        } else {
          return {
            statusCode: 500,
            body: "No image data was returned.",
          };
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "NoSuchKey") err.message = "Image not found.";
        return {
          statusCode: err.statusCode,
          body: err.message,
        };
      });
  } catch (err) {
    console.error(err);
  }
};
