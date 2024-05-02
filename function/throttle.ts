const throttle = (func: Function, delay = 1000) => {
  let lastCall = 0
  return (...args: any) => {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    func(...args)
  }
}
