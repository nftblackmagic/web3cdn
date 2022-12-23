/**
 * This is a collection of functions to write to contract via constructing and  submitting a transaction
 */


import { callFunction } from "./cao";

/**
 * Create an ECOMERCE proxy owned by ownerAddr
 * @param {*} ownerAddr
 */

export const setProxyCurrentRound = async (proxyAddr, curRound) => {
  return await callFunction(proxyAddr, "setCurrentRound", [curRound], 0, true);
};

export const setProxySetSupply = async (proxyAddr, tokenId, newSupply) => {
  return await callFunction(proxyAddr, "setSupply", [tokenId, newSupply], 0, true);
};

export const setProxySetMintOn = async (proxyAddr, tokenId, status) => {
  return await callFunction(proxyAddr, "setMintOn", [tokenId, status], 0, true);
};

export const setProxySetSaleInfo = async (proxyAddr, tokenId, price, maxSupply, isAllowlist, merkleTree) => {
  return await callFunction(proxyAddr, "setSaleInfo", [tokenId, price, maxSupply, isAllowlist, merkleTree], 0, true);
};

export const setProxyMint = async (proxyAddr, tokenId, amount, price) => {
  // console.log("MINT", tokenId, amount);
  return await callFunction(proxyAddr, "mint", [tokenId, amount], price, true);
};

export const setProxyBurn = async (proxyAddr, tokenId, amount) => {
  return await callFunction(proxyAddr, "forgeToken", [tokenId, amount], 0, true);
};