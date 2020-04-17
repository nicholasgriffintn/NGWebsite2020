window.Promise ||
  document.write('<script src="js/es6-promise.min.js" ></script>');
window.fetch || document.write('<script src="js/fetch.min.js"></script>');

// Load the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { scope: "/" })

    .then(function(registration) {
      console.log(
        `Service Worker successfully registered for`,
        registration.scope
      );
    })

    .catch(function(error) {
      console.log(`ServiceWorker not registered: ${error}`);
    });

  if (navigator.serviceWorker.controller) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.controller.postMessage({
        command: "trimCaches"
      });
    });
  }
}

// Create cookie function
function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Reading cookies function
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

var hasCookie = readCookie("visited");

// Create cookie notification
var doNotTrackEnabled = () => {
  return (
    window.doNotTrack == "1" ||
    navigator.doNotTrack == "yes" ||
    navigator.doNotTrack == "1" ||
    navigator.msDoNotTrack == "1" ||
    (typeof window.external === "object" &&
      typeof window.external.msTrackingProtectionEnabled === "function" &&
      typeof window.external.msTrackingProtectionEnabled())
  );
};

var cookieMessage = document.querySelector(".js-cookie-message");

if (!doNotTrackEnabled()) {
  //console.log("you has dnt");
  if (!hasCookie) {
    //console.log("you do not has cookie or dnt");
    cookieMessage.removeAttribute("hidden");
  }
}

cookieMessage.addEventListener("click", el => {
  if (el.target.nodeName === "BUTTON") {
    console.log("hiding cookie message now");
    cookieMessage.setAttribute("hidden", true);
    createCookie("visited", true, 365);
  }
});

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

function scrollIt(destination, duration = 200, easing = "linear", callback) {
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
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
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
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
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
      "now" in window.performance ? performance.now() : new Date().getTime();
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
var remove_class_on_scroll = () => document.body.classList.remove("scrolled");
window.addEventListener("scroll", function() {
  scrollpos = window.scrollY;
  if (scrollpos >= header_height) {
    add_class_on_scroll();
  } else {
    remove_class_on_scroll();
  }
});

if ("serviceWorker" in navigator) {
  var offlineButton = document.createElement("button");

  offlineButton.className = "button";

  caches.open("SavedPages").then(function(cache) {
    cache.match(window.location.href).then(function(result) {
      if (result) {
        document
          .querySelector(".post-buttons-wrapper")
          .appendChild(offlineButton);
        offlineButton.innerText = "This page is ready for offline reading 👍🏻";
        offlineButton.setAttribute("disabled", "disabled");
      } else {
        document
          .querySelector(".post-buttons-wrapper")
          .appendChild(offlineButton);
        offlineButton.innerText = "Save this page for offline reading";
      }
    });
  });

  caches.open("cachedPages").then(function(cache) {
    cache.match(window.location.href).then(function(result) {
      if (result) {
        document
          .querySelector(".post-buttons-wrapper")
          .appendChild(offlineButton);
        offlineButton.innerText = "This page is ready for offline reading 👍🏻";
        offlineButton.setAttribute("disabled", "disabled");
      } else {
        document
          .querySelector(".post-buttons-wrapper")
          .appendChild(offlineButton);
        offlineButton.innerText = "Save this page";
      }
    });
  });

  offlineButton.addEventListener("click", function(ev) {
    ev.preventDefault();

    var btn = this;

    btn.innerText = "Saving...";

    caches.open("SavedPages").then(function(cache) {
      cache.add(window.location.href).then(function() {
        var data = {
          title: document.querySelector("title").innerText
        };

        localStorage.setItem(window.location.href, JSON.stringify(data));

        btn.innerText = "This page is ready for offline reading 👍🏻";
        btn.setAttribute("disabled", "disabled");
      });
    });
  });
}
