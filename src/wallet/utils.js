
export const normalizeURL = (u) => new URL(u).host.replace("www.", "");

export const isMobile = () =>
  /Mobi/i.test(window.navigator.userAgent) ||
  /iPhone|iPod|iPad/i.test(navigator.userAgent);

export const objectMap = (object, mapFn) => {
  return Object.keys(object).reduce((result, key) => {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
};


export const getChainID = () => {
  if (window.IS_TEST) {
    return 5;
  }
  else if (window.CHAINID) {
    return window.CHAINID;
  }
}

export const isValidAddress = (address) => {
  return /^(0x)?[0-9a-f]{40}$/i.test(address);
}