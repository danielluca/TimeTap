let currentTime = 0;
let interval: number | undefined = undefined;

self.onmessage = (event) => {
  currentTime = event.data;
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    currentTime -= 1000;
    if (currentTime <= 0) {
      currentTime = 0;
      clearInterval(interval);
    }
    postMessage(currentTime);
  }, 1000);
};