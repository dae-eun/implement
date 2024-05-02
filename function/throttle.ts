const throttle = <T extends any[]>(func: (...args: T) => void, delay = 1000) => {
  let lastCall = 0;
  return (...args: T) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    func(...args);
  };
};