/**
 * This is a collection of functions to read from contract, i.e. Contract Access Object
 */

import { callViewFunction } from "./cao";

/**
 * A testing function to make sure we are able to call function on proxy
 * @param {*} proxyAddr
 */
export const getProxySymbol = async (proxyAddr) => {
  const res = await callViewFunction(proxyAddr, "symbol", []);
  return res;
};

export const getProxyMintInfoOfRound = async (proxyAddr, round) => {
  const res = await callViewFunction(proxyAddr, "mintInfo", [round]);
  return res;
};

export const getProxyIsMintOn = async (proxyAddr, round) => {
  const res = await callViewFunction(proxyAddr, "isMintOn", [round]);
  return res;
};

// export const getProxyCurrentRoundByTokenID = async (proxyAddr, tokenId) => {
//   const res = await callViewFunction(proxyAddr, "currentRound", [tokenId]);
//   return res;
// };

export const getProxyIsMintOnByTokenID = async (proxyAddr, tokenId) => {
  const res = await callViewFunction(proxyAddr, "isMintOn", [tokenId]);
  console.log("MINT", tokenId, res);
  return res;
};

export const getProxyPriceByTokenID = async (proxyAddr, tokenId) => {
  const res = await callViewFunction(proxyAddr, "mintPrice", [tokenId]);
  return res;
};

export const getProxyMintedByTokenID = async (proxyAddr, tokenId) => {
  const res = await callViewFunction(proxyAddr, "tokenMinted", [tokenId]);
  return res;
};

export const getProxySupplyByTokenID = async (proxyAddr, tokenId) => {
  const res = await callViewFunction(proxyAddr, "supplyLimit", [tokenId]);
  return res;
};

export const getProxyBalanceByTokenID = async (proxyAddr, user, tokenId) => {
  const res = await callViewFunction(proxyAddr, "balanceOf", [user, tokenId]);
  return res;
};

export const getProxyName = async (proxyAddr) => {
  const res = await callViewFunction(proxyAddr, "name", []);
  return res;
}

export const getProxyMinted = async (proxyAddr) => {
  const res = await callViewFunction(proxyAddr, "totalSupply", []);
  return res;
}

/**
 * Returns proxy specific data.
 * TODO: fill XX with meaningful wording, e.g. getProxyPublicMintTime
 */
export const getProxyXX = async (proxyAddr) => { };
