const video = document.getElementById("video");
const vendorURL = window.URL || window.webkitURL;
let video_outer = document.querySelector(".video-outer");
let durationSpan = document.querySelector(".duration");
const div = document.querySelector(".recording-status");

let isCameraOn = false;


const start = () => {
  if (isCameraOn) return;
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        div.style.display = "flex";
        video.srcObject = stream;
        isCameraOn = true;
        timeCounter();
      })
      .catch(function (error) {
        console.log(error);
        video_outer.innerHTML =
          "<p class='wrong'> Something went wrong! Camera access denied</p>";
      });
  }
};

const stopCam = () => {
  if (!isCameraOn) return;
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }
  isCameraOn = false;
  video.srcObject = null;
  video_outer.innerHTML =
    "<p class='done'> Camera stopped</p><button onclick='location.reload();' class='btn-reload'>Record again</button>";
  div.style.display = "none";
  notifyUser();
};

function openFullscreen() {
  if (!isCameraOn) return;
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    /* IE11 */
    video.msRequestFullscreen();
  }
}

function timeCounter() {
  let interval;
  if (isCameraOn) {
    let sec = 0;
    let min = 0;
    interval = setInterval(() => {
      durationSpan.innerHTML = `${min < 10 ? "0" + min : min}:${
        sec < 10 ? "0" + sec : sec
      }`;
      sec++;
      if (sec > 59) {
        min++;
        sec = 0;
      }
      if (min === 10) {
        stopCam();
      }
    }, 1000);
  } else {
    if (interval) {
      durationSpan.innerHTML = "00:00";
      clearInterval(interval);
    }
  }
}
