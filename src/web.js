
   const video = document.getElementById("video");
   const vendorURL = window.URL || window.webkitURL;
   let video_outer = document.querySelector(".video-outer")
   let downloadBtn = document.createElement('a')

  const stop =  ()=> {
    var stream = video.srcObject;
    var tracks = stream.getTracks();
   
    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }
  
    video.srcObject = null;
    video_outer.innerHTML = "<p class='done'> Camera stopped</p><button onclick='location.reload();' class='btn-reload'>Record again</button>";
}

const start =  ()=> {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            }).catch(function (error) {
                video_outer.innerHTML = "<p class='wrong'> Something went wrong! Camera access denied</p>";
            });
    }
}


function openFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
      video.msRequestFullscreen();
    }
  }