function notifyUser() {
  Notification.requestPermission().then((perm) => {
    console.log(perm);
    if (perm === "granted") {
      const notification = new Notification("VidCam - Recording Stopped", {
        body:
          "Recording stopped at " +
          new Date().getHours() +
          ":" +
          new Date().getMinutes(),
        data: { hello: "world" },
        icon: "assets/VidCam Logo.png",
        tag: "Recording Stopped Message",
      });

      // console.log(notification.data);
      notification.addEventListener("click", (e) => {
        window.open(window.location.host)
        console.log("Notification clicked");
      });
      // notification.addEventListener("show", (e) => {
      //   console.log("Notification shown");
      // });
      // notification.addEventListener("close", (e) => {
      //   console.log("Notification closed");
      // });
      // notification.addEventListener("error", (e) => {
      //   console.log("Notification error because permission denied");
      // });
    }
  });
}
let notification;
let interval;

document.addEventListener("visibilitychange", (e) => {
  if (document.visibilityState === "hidden" && isCameraOn) {
    const leaveDate = new Date();
    interval = setInterval(() => {
      notification = new Notification("Recording camera is on", {
        body: `The recording is on, please come back and see or stop it. You've gone for ${Math.round(
          (new Date() - leaveDate) / 1000
        )} seconds`,
        tag: "Come Back",
        icon: "assets/VidCam Logo.png",
      });
      notification.addEventListener('click',(e)=>{
        window.open(window.location.host)
    })
    }, 100);
  } else {
    if (interval) clearInterval(interval);
    if (notification) notification.close();
  }
});
