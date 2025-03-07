import React, { useState, useEffect } from "react";

import Typed from "typed.js";

import { config } from '../config/config';

function HomepageJS() {
  useEffect(() => {
    function fadeOut(el) {
      el.style.opacity = 1;

      (function fade() {
        if ((el.style.opacity -= 0.1) < 0) {
          el.style.display = "none";
        } else {
          requestAnimationFrame(fade);
        }
      })();
    }

    function fadeIn(el, display) {
      el.style.opacity = 0;
      el.style.display = display || "block";

      (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += 0.1) > 1)) {
          el.style.opacity = val;
          requestAnimationFrame(fade);
        }
      })();
    }

    function scrollIt(
      destination,
      duration = 200,
      easing = "linear",
      callback
    ) {
      var easings = {
        linear(t) {
          return t;
        },
        easeInQuad(t) {
          return t * t;
        },
        easeOutQuad(t) {
          return t * (2 - t);
        },
        easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
          return t * t * t;
        },
        easeOutCubic(t) {
          return --t * t * t + 1;
        },
        easeInOutCubic(t) {
          return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuart(t) {
          return t * t * t * t;
        },
        easeOutQuart(t) {
          return 1 - --t * t * t * t;
        },
        easeInOutQuart(t) {
          return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        },
        easeInQuint(t) {
          return t * t * t * t * t;
        },
        easeOutQuint(t) {
          return 1 + --t * t * t * t * t;
        },
        easeInOutQuint(t) {
          return t < 0.5
            ? 16 * t * t * t * t * t
            : 1 + 16 * --t * t * t * t * t;
        },
      };

      var start = window.pageYOffset;
      var startTime =
        "now" in window.performance ? performance.now() : new Date().getTime();

      var documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      var windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName("body")[0].clientHeight;
      var destinationOffset =
        typeof destination === "number" ? destination : destination.offsetTop;
      var destinationOffsetToScroll = Math.round(
        documentHeight - destinationOffset < windowHeight
          ? documentHeight - windowHeight
          : destinationOffset
      );

      if ("requestAnimationFrame" in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
          callback();
        }
        return;
      }

      function scroll() {
        var now =
          "now" in window.performance
            ? performance.now()
            : new Date().getTime();
        var time = Math.min(1, (now - startTime) / duration);
        var timeFunction = easings[easing](time);
        window.scroll(
          0,
          Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
        );

        if (window.pageYOffset === destinationOffsetToScroll) {
          if (callback) {
            callback();
          }
          return;
        }

        requestAnimationFrame(scroll);
      }

      scroll();
    }

    var scrollpos = window.scrollY;
    var header_height = 20;
    var add_class_on_scroll = () => document.body.classList.add("scrolled");
    var remove_class_on_scroll = () =>
      document.body.classList.remove("scrolled");
    window.addEventListener("scroll", function () {
      scrollpos = window.scrollY;
      if (scrollpos >= header_height) {
        add_class_on_scroll();
      } else {
        remove_class_on_scroll();
      }
    });

    function typedDelayInit() {
      var typed = new Typed("#typed", {
        stringsElement: "#typed-strings-delay",
        typeSpeed: 0,
        backSpeed: 0,
        backDelay: 3000,
        startDelay: 1000,
        showCursor: false,
        onComplete: (self) => {
          secondTypedDelayTimeout();
        },
      });
    }

    function defaultTypedDelayInit() {
      var typed = new Typed("#typed", {
        stringsElement: "#default-typed-strings",
        typeSpeed: 0,
        backSpeed: 0,
        backDelay: 1500,
        startDelay: 1000,
        showCursor: false,
      });
    }

    function typedDelayTimeout() {
      fadeIn(document.querySelector(".scroll-down"));

      /* if (!document.body.classList.contains("scrolled")) {
        setTimeout(typedDelayInit, 5000);
      } else {
        setTimeout(defaultTypedDelayInit, 2500);
      } */
    }

    function secondTypedDelayInit() {
      var typed = new Typed("#typed", {
        stringsElement: "#second-typed-strings-delay",
        typeSpeed: 0,
        backSpeed: 0,
        backDelay: 1500,
        startDelay: 1000,
        showCursor: false,
        onComplete: (self) => {
          thirdTypedDelayTimeout();
        },
      });
    }

    function secondTypedDelayTimeout() {
      setTimeout(secondTypedDelayInit, 2500);
    }

    function thirdTypedDelayInit() {
      var typed = new Typed("#typed", {
        stringsElement: "#third-typed-strings-delay",
        typeSpeed: 0,
        backSpeed: 0,
        backDelay: 1500,
        startDelay: 1000,
        showCursor: false,
      });
    }

    function thirdTypedDelayTimeout() {
      if (!document.body.classList.contains("scrolled")) {
        if (document.getElementById("homepage-scroll-target")) {
          scrollIt(
            document.getElementById("homepage-scroll-target"),
            300,
            "easeOutQuad",
            () =>
              console.log(`Just finished scrolling to ${window.pageYOffset}px`)
          );
        }
        setTimeout(thirdTypedDelayInit, 300);
      } else {
        setTimeout(defaultTypedDelayInit, 0);
      }
    }

    function getGithubRepoList() {
      // Github Query
      var xhrGithubRepos = new XMLHttpRequest();

      xhrGithubRepos.onload = function () {
        // Process our return data
        if (xhrGithubRepos.status >= 200 && xhrGithubRepos.status < 300) {
          let respData = xhrGithubRepos.responseText;

          if (respData) {
            let parsedData = JSON.parse(respData);
            parsedData = parsedData.body;
            parsedData = JSON.parse(parsedData);

            var githubReposHTML = "";

            var currentRepoNumber = 0;

            parsedData.forEach(function (element) {
              if (currentRepoNumber < 6) {
                //console.log(element);
                let updatedDateToFormat = new Date(element.updated_at);
                let updatedDateToFormatFormated = updatedDateToFormat.toString();
                githubReposHTML +=
                  '<div class="ui card">' +
                  '<div class="content">' +
                  '<a href="' +
                  element.html_url +
                  '" class="header">' +
                  element.name +
                  "</a>" +
                  '<div class="meta">' +
                  '<span class="language ' +
                  element.language +
                  '">' +
                  '<span class="repo-language-color ml-0"></span>' +
                  element.language +
                  "</span>" +
                  /* '<span class="date">' +
                                          'Updated on ' + updatedDateToFormatFormated +
                                      '</span>' + */
                  "</div>" +
                  '<div class="description">' +
                  element.description +
                  "</div>" +
                  "</div>" +
                  "</div>";
              }
              currentRepoNumber++;
            });

            if (document.getElementById("githubReposContainer")) {
              document.getElementById(
                "githubReposContainer"
              ).innerHTML = githubReposHTML;
            }
          } else {
            console.error("Something has gone wrong with the Github thing");
          }
        } else {
          console.error("Something has gone wrong with the Github thing");
        }
      };

      // Set the request URL for Last.fm
      var github_request_urls = config.appUrl + "/api/github";

      xhrGithubRepos.open("GET", github_request_urls);
      xhrGithubRepos.send();
    }

    function queryLastfm(reload, resolve, reject) {
      // Last FM Query
      var xhrLastFM = new XMLHttpRequest();

      xhrLastFM.onload = function () {
        // Process our return data
        if (xhrLastFM.status >= 200 && xhrLastFM.status < 300) {
          let respData = xhrLastFM.responseText;

          if (respData) {
            if (document.getElementById("spotify-widget")) {
              getSpotifyData(respData, reload);
            }

            if (resolve) {
              resolve("Last FM call complete");
            }
          } else {
            console.log("Something has gone wrong with the last fm thing");

            if (reject) {
              reject("Last FM call failed");
            }
          }
        } else {
          console.log("Something has gone wrong with the last fm thing");

          if (reject) {
            reject("Last FM call failed");
          }
        }
      };

      // Set the request URL for Last.fm
      var lastfm_request_url =
        config.appUrl + "/api/spotify?timestamp=" + Math.round(new Date().getTime() / 1000);

      xhrLastFM.open("GET", lastfm_request_url);
      xhrLastFM.send();
    }

    function getSpotifyData(data, reload) {
      let parsedData = JSON.parse(data);
      parsedData = parsedData.body;
      parsedData = JSON.parse(parsedData);

      var tracks = parsedData.recenttracks.track;

      //console.log(tracks);

      if (document.getElementById("spotify-widget")) {
        let customSpotifyWidgetContainer = document.getElementById(
          "spotify-widget"
        );

        if (reload != true) {
          customSpotifyWidgetContainer.innerHTML = "";
          // refresh song list
          setTimeout(queryLastfm, 120000);
        }

        var customSpotifyRight = document.createElement("div");
        customSpotifyRight.id = "customSpotifyRight";
        customSpotifyRight.className =
          "sixteen wide tablet sixteen wide computer column";

        customSpotifyWidgetContainer.appendChild(customSpotifyRight);

        var customSpotifyLeft = document.createElement("div");
        customSpotifyLeft.id = "customSpotifyLeft";
        customSpotifyLeft.className =
          "sixteen wide tablet sixteen wide computer column";

        customSpotifyWidgetContainer.appendChild(customSpotifyLeft);

        let trackNumber = 0;

        let customSpotifyLeftElement = document.getElementById(
          "customSpotifyLeft"
        );

        let customSpotifyRightElement = document.getElementById(
          "customSpotifyRight"
        );

        var customSpotifyLeftElementSongWrapper = document.createElement("div");
        customSpotifyLeftElementSongWrapper.id =
          "customSpotifyLeftElementSongWrapper";

        customSpotifyLeftElement.appendChild(
          customSpotifyLeftElementSongWrapper
        );

        tracks.forEach(function (element) {
          //console.log(element);
          let trackNowPlaying = false;
          if (element["@attr"]) {
            trackNowPlaying = element["@attr"].nowplaying;
          } else {
            trackNowPlaying = false;
          }
          let trackAlbumName = element.album["#text"];
          let trackArtistName = element.artist["#text"];

          let trackImageSmall = element.image[0]["#text"];
          let trackImageMedium = element.image[1]["#text"];
          let trackImageLarge = element.image[2]["#text"];
          let trackImageExtraLarge = element.image[3]["#text"];

          let trackName = element.name;
          let trackUrl = element.url;

          //console.log(trackNowPlaying);

          if (trackNumber == "0") {
            var customSpotifyRightElementSongWrapper = document.createElement(
              "div"
            );
            customSpotifyRightElementSongWrapper.id =
              "customSpotifyRightElementSongWrapper";

            var customSpotifyRightElementSongContainer = document.createElement(
              "div"
            );
            customSpotifyRightElementSongContainer.id =
              "customSpotifyRightElementSongContainer";
            customSpotifyRightElementSongContainer.style.backgroundImage =
              "url(" + trackImageExtraLarge + ")";

            customSpotifyRightElementSongWrapper.appendChild(
              customSpotifyRightElementSongContainer
            );

            var customSpotifyRightElementSongOverlay = document.createElement(
              "div"
            );
            customSpotifyRightElementSongOverlay.id =
              "customSpotifyRightElementSongOverlay";

            var customSpotifyRightElementSongOverlayContent = document.createElement(
              "div"
            );
            customSpotifyRightElementSongOverlayContent.id =
              "customSpotifyRightElementSongOverlayContent";

            customSpotifyRightElementSongOverlayContent.innerHTML =
              "<h3>" +
              trackName +
              "</h3>" +
              "<span>" +
              trackArtistName +
              "</span>" +
              "<span>" +
              trackAlbumName +
              "</span>" +
              '<a class="trackLinkPlay" rel="noopener nofollow" target="_blank" href="' +
              trackUrl +
              '">' +
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><path d="M45.563 29.174l-22-15A1 1 0 1 0 22 15v30a.999.999 0 0 0 1.563.826l22-15a1 1 0 0 0 0-1.652zM24 43.107V16.893L43.225 30 24 43.107z"/><path d="M30 0C13.458 0 0 13.458 0 30s13.458 30 30 30 30-13.458 30-30S46.542 0 30 0zm0 58C14.561 58 2 45.439 2 30S14.561 2 30 2s28 12.561 28 28-12.561 28-28 28z"/></svg>' +
              "</a>";

            customSpotifyRightElementSongOverlay.appendChild(
              customSpotifyRightElementSongOverlayContent
            );

            if (trackNowPlaying) {
              var nowPlayingOverlay = document.createElement("div");
              nowPlayingOverlay.id = "nowPlayingOverlay";

              nowPlayingOverlay.innerHTML = "<span>Now Playing</span>";

              customSpotifyRightElementSongOverlay.appendChild(
                nowPlayingOverlay
              );
            }

            customSpotifyRightElementSongWrapper.appendChild(
              customSpotifyRightElementSongOverlay
            );

            customSpotifyRightElement.appendChild(
              customSpotifyRightElementSongWrapper
            );
          } else {
            var customSpotifyLeftElementSong = document.createElement("div");
            customSpotifyLeftElementSong.className = "leftSideSong ui grid";

            var customSpotifyLeftElementSongHTML =
              '<a rel="noopener nofollow" target="_blank" class="trackLinkFloat" href="' +
              trackUrl +
              '"></a>' +
              '<div class="four wide  column">' +
              '<img alt="' +
              trackAlbumName +
              '" class="lazy" loading="lazy" src="' +
              trackImageSmall +
              '">' +
              "</div>" +
              '<div class="twelve wide column">' +
              "<h3>" +
              trackName +
              "</h3>" +
              "<span>" +
              trackArtistName +
              "</span>" +
              "<span>" +
              trackAlbumName +
              "</span>" +
              "</div>";

            customSpotifyLeftElementSong.innerHTML = customSpotifyLeftElementSongHTML;

            customSpotifyLeftElementSongWrapper.appendChild(
              customSpotifyLeftElementSong
            );
          }

          trackNumber++;
        });
      }
    }

    // Set up promises
    // First load the typed
    var initTypedTextHeader = new Promise(function (resolve, reject) {
      var typed = new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 0,
        backSpeed: 0,
        backDelay: 1500,
        startDelay: 1000,
        loop: false,
        smartBackspace: true,
        onComplete: (self) => {
          typedDelayTimeout();
        },
      });
      resolve("complete");
    });

    // Init the Spotify stuff
    var initSpotifyStuff = new Promise(function (resolve, reject) {
      // refresh song list
      setTimeout(queryLastfm, 60000);

      // Get song list on load
      queryLastfm(true, resolve, reject);
    });

    // Run the promises in order, finishing with Github
    var initJSRequests = function () {
      console.log("initing promises");
      initTypedTextHeader.then(function () {
        console.log("successfully init'd typed, initing Spotify");
        initSpotifyStuff.then(function () {
          console.log("successfully init'd sspotify, initing github");
          getGithubRepoList();
        });
      });
    };

    initJSRequests();
  }, []);

  return <div id="HomepageJS"></div>;
}

export default HomepageJS;
