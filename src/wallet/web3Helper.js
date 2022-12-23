
export const assert = (condition, msg) => {
  if (!condition) {
    throw msg || "assertion fail!";
  }
};


