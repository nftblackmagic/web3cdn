/**
 * Contract Access Object(CAO)
 */

import { fetchContractObjByAddr } from "../wallet/wallet";
import { assert } from "../wallet/web3Helper";
import { ethers } from "ethers";

export const GAS_INCREASE = 116;

export const callViewFunction = async (contractAddr, methodName, args) => {
  const contractObj = fetchContractObjAt(contractAddr);
  console.log("callViewFunction", contractObj, methodName);
  return getFunctionSignature(contractObj, methodName, args);
};

const increaseGasLimit = (estimatedGasLimit) => {
  return estimatedGasLimit.mul(GAS_INCREASE).div(100)
}

/**
 * This is for non-view function call only. For view function call, use callViewFunction() instead.
 */
export const callFunction = async (
  contractAddr,
  methodName,
  args,
  value = 0,
  requireGasOptimize = true
) => {
  const contractObj = await fetchContractObjAt(contractAddr);

  assert(contractObj, `contract obj is not defined: ${contractObj}`);
  const options = { value: ethers.utils.parseUnits(value.toString(), "wei") };

  if (requireGasOptimize) {
    const estimation = (await contractObj.estimateGas[methodName](...args, options));
    const optionsWithGas = {
      ...options,
      gasLimit: increaseGasLimit(estimation),
    }
    return await contractObj[methodName](...args, optionsWithGas);
  } else {
    return await contractObj[methodName](...args, options);
  }
};

const getFunctionSignature = async (contractObj, functionName, args) => {
  if (args === undefined) {
    args = [];
  }
  const res = await contractObj[functionName](...args);
  return res;
};

const fetchContractObjAt = (contractAddr) => {
  return fetchContractObjByAddr(contractAddr);
};
