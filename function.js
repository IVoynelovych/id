const noisy = document.querySelector(".noiser");
const quit = document.querySelector(".quit");
const skip = document.querySelector(".next");
const back = document.querySelector(".back");
const hid = document.querySelector(".is-hidden");
const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);
const donateModal = document.getElementById("donateModal");
const donateButton = document.querySelector(".donate");
const closeButton = document.querySelector(".close-don");
const mod = document.querySelector(".fade");
const close_vid = document.querySelector(".close-vid");
const modal = new bootstrap.Modal(donateModal);
let adPlayd = 1;
let inter;
let counter = 0;
let modalOpened = false;
let currentVolmn = 1;
let durations = 0;
player.on("play", function () {
  setInterval(() => {
    player.getCurrentTime().then(function (seconds) {
      localStorage.setItem("time", seconds);
    });
  }, 1000);
  player
    .setCurrentTime(localStorage.getItem("time"))
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case "RangeError":
          break;

        default:
          break;
      }
    });
  player
    .getDuration()
    .then(function (duration) {
      const quarterDuration = duration / 4;

      inter = setInterval(() => {
        player.getCurrentTime().then(function (currentTime) {
          if (
            (currentTime = quarterDuration && !modalOpened) ||
            (currentTime = quarterDuration* 2 && !modalOpened) ||
            (currentTime = quarterDuration* 3 && !modalOpened) ||
            (currentTime = quarterDuration* 4 && !modalOpened)
          ) {
            modalOpened = true;
            player.pause();
            close_vid.click();
            modal.show();
          }
        });
      }, 1000);
    })
    .catch(function (error) {});
});
noisy.addEventListener("click", () => {
  player
    .setVolume((currentVolmn += 0.1))
    .then(function (volume) {
      console.log(volume);
    })
    .catch(function (error) {
      switch (error.name) {
        case "RangeError":
          break;
        default:
          break;
      }
    });
});
quit.addEventListener("click", () => {
  player
    .setVolume((currentVolmn -= 0.1))
    .then(function (volume) {
      console.log(volume);
    })
    .catch(function (error) {
      switch (error.name) {
        case "RangeError":
          break;
        default:
          break;
      }
    });
});
skip.addEventListener("click", () => {
  let times = Number(localStorage.time);
  localStorage.time = times += 10;
  player
    .setCurrentTime(localStorage.getItem("time"))
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case "RangeError":
          break;
        default:
          break;
      }
    });
});
back.addEventListener("click", () => {
  let times = Number(localStorage.time);
  localStorage.time = times -= 10;
  player
    .setCurrentTime(localStorage.getItem("time"))
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case "RangeError":
          break;

        default:
          break;
      }
    });
});
donateButton.addEventListener("click", () => {
  clearInterval(inter);
  modal.hide();
});
closeButton.addEventListener("click", () => {
  modal.hide();
  if (counter < 3) {
    modal.show();
    counter += 1;
  }
    modalOpened = false;
});
