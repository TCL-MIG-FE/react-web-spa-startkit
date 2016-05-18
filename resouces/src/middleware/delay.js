// delay middleware
export default (store) => (next) => (action) => {
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }
  let intervalId = setTimeout(() => next(action), action.meta.delay);
  return function cancel() {
    clearInterval(intervalId);
  };
};
