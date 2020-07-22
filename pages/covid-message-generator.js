import React, { useState, useEffect } from "react";

import Page from "../components/Page";

const htmlToImage = require("html-to-image");

const generatedMessageStyle = {
  backgroundColor: "#fff503",
  backgroundImage: "url('/images/CovidMessageBG.png')",
  backgroundSize: "contain",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  minHeight: "632px",
  maxHeight: "632px",
};

const generatedMessageWrapStyle = {
  height: "100%",
  width: "100%",
  padding: "30px",
  minHeight: "632px",
  textTransform: "uppercase",
  fontSize: "87px",
  fontWeight: "900",
  lineHeight: "125px",
  textAlign: "center",
  color: "#1d1d1b",
};

const messageTextStyle = {
  width: "100%",
  display: "inline-block",
};

const messageTextSecondStyle = {
  width: "100%",
  display: "inline-block",
  marginTop: "60px",
  fontSize: "100px",
  lineHeight: "100px",
};

const messageTextThirdStyle = {
  width: "100%",
  display: "inline-block",
  marginTop: "50px",
};

const messageFormStyles = {
  background: "rgb(230, 230, 230)",
  padding: "30px",
};

const messageModalStyles = {
  position: "absolute",
  top: "100px",
  zIndex: "9999",
  maxWidth: "500px",
  padding: "30px",
  background: "#fff",
  left: "25%",
  width: "50%",
  minWidth: "50%",
  textAlign: "center",
};

const messageModalImageStyles = {
  maxHeight: "500px",
  width: "auto",
  margin: "auto",
  maxWidth: "100%",
};

const CovidMessageGenerator = function (props) {
  const [messageTextFirst, setMessageTextFirst] = useState("Stay Alert");
  const [messageTextSecond, setMessageTextSecond] = useState(
    "Control the Virus"
  );
  const [messageTextThird, setMessageTextThird] = useState("Save Lives");
  const [generatedImage, setGeneratedImage] = useState("");

  const generatePNG = function () {
    htmlToImage
      .toPng(document.getElementById("generatedMessage"))
      .then(function (dataUrl) {
        console.log(dataUrl);
        setGeneratedImage(dataUrl);
      });
  };

  const generateJPEG = function () {
    htmlToImage
      .toJpeg(document.getElementById("generatedMessage"))
      .then(function (dataUrl) {
        console.log(dataUrl);
        setGeneratedImage(dataUrl);
      });
  };

  const generateSVG = function () {
    htmlToImage
      .toSvgDataURL(document.getElementById("generatedMessage"))
      .then(function (dataUrl) {
        console.log(dataUrl);
        setGeneratedImage(dataUrl);
      });
  };

  return (
    <Page displayHeader={true} title="Covid Message Generator">
      <div className="content-wrap landing-content-wrap">
        <div className="container-main">
          <div className="page-header-spacer"></div>

          <h1 id="single-title" className="animated bounceInDown">
            Covid "Stay Alert" Message Generator
          </h1>
          {generatedImage && (
            <div className="model" style={messageModalStyles}>
              <h3>Your generated image</h3>
              <br></br>
              <img style={messageModalImageStyles} src={generatedImage} />
            </div>
          )}
          <div className="message-gen-wrap row">
            <div className="col-12 col-6-m">
              <div id="generatedMessage" style={generatedMessageStyle}>
                <div
                  className="generated-message-wrap"
                  style={generatedMessageWrapStyle}
                >
                  <div className="generated-message-inner">
                    <span className="first-message" style={messageTextStyle}>
                      {messageTextFirst}
                    </span>
                    <span
                      className="second-message"
                      style={messageTextSecondStyle}
                    >
                      {messageTextSecond}
                    </span>
                    <span
                      className="third-message"
                      style={messageTextThirdStyle}
                    >
                      {messageTextThird}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-6-m">
              <div style={messageFormStyles}>
                <div className="form-control">
                  <label className="form-control">Stay Alert</label>
                  <input
                    autoComplete="off"
                    style={{ marginBottom: 12 }}
                    placeholder="Enter text here"
                    onChange={(e) => setMessageTextFirst(e.target.value)}
                    value={messageTextFirst}
                  />
                </div>
                <div className="form-control">
                  <label className="form-control">Control the Virus</label>
                  <input
                    autoComplete="off"
                    style={{ marginBottom: 12 }}
                    placeholder="Enter text here"
                    onChange={(e) => setMessageTextSecond(e.target.value)}
                    value={messageTextSecond}
                  />
                </div>
                <div className="form-control">
                  <label className="form-control">Save Lives</label>
                  <input
                    autoComplete="off"
                    style={{ marginBottom: 12 }}
                    placeholder="Enter text here"
                    onChange={(e) => setMessageTextThird(e.target.value)}
                    value={messageTextThird}
                  />
                </div>
                <div className="form-control">
                  <button
                    style={{ marginRight: 5 }}
                    className="btn btn-primary-inverted"
                    onClick={() => generatePNG()}
                  >
                    Generate PNG
                  </button>
                  <button
                    style={{ marginRight: 5 }}
                    className="btn btn-primary-inverted"
                    onClick={() => generateJPEG()}
                  >
                    Generate JPEG
                  </button>
                  <button
                    className="btn btn-primary-inverted"
                    onClick={() => generateSVG()}
                  >
                    Generate SVG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CovidMessageGenerator;
