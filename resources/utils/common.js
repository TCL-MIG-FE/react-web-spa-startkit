export const delay = (timeout = 50) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timeout);
  });
};
