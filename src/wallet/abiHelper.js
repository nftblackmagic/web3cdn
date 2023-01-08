import fetch from "node-fetch";
import { API_DB } from "../constants";
import * as _ from "lodash";
/**
 * This file will be untimately replaced by Database calls.
 */

var abi = {};

// TODO: when converting this to db calls, remember to add "async" here and "await" at callers
export const fetchAbiOfContractAt = async (contractAddr, chainId) => {
  if (contractAddr in abi) {
    console.log("ABI CACHE", contractAddr);
    return abi[contractAddr];
  }
  else if (window.ABI) {
    return window.ABI;
  }
  else {
    return await fetch(API_DB + "abi/" + chainId + "/" + contractAddr, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(async (response) => {
        const dataFromDb = _.get(response, ["Item", "Abi"]);
        if (dataFromDb) {
          console.log("ABI from data base");
          // console.log("ABI", dataFromDb);
          abi[contractAddr] = JSON.parse(dataFromDb);
          return JSON.parse(dataFromDb);
        }
        else {
          alert("Cannot find correct abi!");
          throw new Error("Cannot find abi");
        }

      })
      .catch((error) => {
        console.error(error);
      });
  }
};