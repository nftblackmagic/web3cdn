import { store } from "../app/store";
import { updateIsInitializedContract } from "../components/UserModal/UserModalSlice";
import { ENABLE_MOCK, SELF_WALLET_SYMBOL } from "../constants";
import { callViewFunction } from "../contract_access_object/cao";
import { updateDivText } from "../divCheck/functionCheck";
import {
  fetchAbiOfContractAt,
} from "./abiHelper";

import {
  assert,
} from "./web3Helper";

import { ethers } from "ethers";

let initializedContracts = {}; // initialized Contract objects

export const fetchContractObjByAddr = (addr) => {
  assert(
    initializedContracts[addr],
    `No contract object initialized for address ${addr}!`
  );
  return initializedContracts[addr];
};

export const initProxyContract = async (
  proxyAddr,
  logicAddr,
  signer,
) => {
  console.log("Initializing proxy contract...", proxyAddr);
  await initContract(proxyAddr, logicAddr, signer);
};

export const connectWalletInit = async (signer) => {
  console.log("Connecting to wallet...");
  if (window.CONTRACT_ADDRESS && window.LOGIC_ADDRESS) {
    await initProxyContract(window.CONTRACT_ADDRESS, window.LOGIC_ADDRESS, signer);
    store.dispatch(updateIsInitializedContract(true));
  }
};

const convertOutput = (result, outputType) => {
  if (outputType === "time") {
    return new Date(result * 1000).toLocaleString();
  }
  else {
    return result;
  }
}

export const readViewCall = async (signer, readFunction) => {
  if (readFunction.length > 0) {
    console.log("Read function for CDN", readFunction);
    readFunction.forEach(async (func) => {
      try {
        const args = func.inputs.map((input) => {
          const nameOfInput = input.name;
          if (nameOfInput in func.args) {
            if (func.args[nameOfInput] === SELF_WALLET_SYMBOL) {
              return signer.getAddress();
            }
            else {
              return func.args[nameOfInput];
            }
          }
          else {
            throw new Error(`Input ${nameOfInput} not found in args`);
          }
        });
        const res = await callViewFunction(window.CONTRACT_ADDRESS, func.name, args);
        var result = ""

        if (typeof res === "object") {
          if (res._isBigNumber) {
            result = res.toNumber();
          }
          else {
            result = JSON.stringify(res);
          }
        }
        else {
          result = res;
        }
        if (func.outputs && (func.outputs.length > 0)) {
          result = "";
          func.outputs.map((output) => {
            if (output.name in res) {
              result += res[output.name];
            }
          })
        }

        result = convertOutput(result, func.outputType);
        updateDivText(func.name, result);
      } catch (e) {
        console.log("Error in reading function", e.message);
      }
    })
  }
}

const initContract = async (
  contractAddr,
  abiAddr,
  signer,
) => {
  if (ENABLE_MOCK) {
    return;
  }
  if (!signer) {
    throw new Error("signer is undefined");
  }

  if (contractAddr in initializedContracts) {
    return;
  }
  const contract = await initContractGlobalObject(contractAddr, abiAddr);
  initializedContracts[contractAddr] = await initEthers(contract, signer);
  // console.log(`Initialized contract ${contractAddr}`);
};

const initEthers = async (contract, signer) => {
  const address = contract.address[contract.allowedNetworks[0]];
  const abi = contract.abi;
  return new ethers.Contract(address, abi, signer);
};

const initContractGlobalObject = async (addr, abiAddr) => {
  const chainID = getChainIdFromWindow();
  return {
    address: {
      [chainID]: addr,
    },
    abi: await fetchAbiOfContractAt(abiAddr, chainID),
    allowedNetworks: [chainID],
  };
};

export const getChainIdFromWindow = () => {
  return window.IS_TEST ? 5 : window.CHAINID ? window.CHAINID : 5;
}
