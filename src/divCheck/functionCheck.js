import { store } from "../app/store";
import { openFunctionCallModal } from "../components/FunctionCallModal/FunctionCallSlice";
import { appendReadFunction } from "../components/UserModal/UserModalSlice";
import { setButtonText } from "../utils";
import { fetchAbiOfContractAt } from "../wallet/abiHelper";

const functionSymbol = "function-name"

const getDivAttrInfo = (div, symbol) => {
    const name = div.getAttribute(symbol);
    var args = {};
    try {
        args = JSON.parse(div.getAttribute(`${symbol}-args`));
    } catch (e) {
        console.log("Error in parsing args", e.message);
        if (typeof div.getAttribute(`${symbol}-args`) === "object") {
            args = div.getAttribute(`${symbol}-args`);
        }
    }
    var price = div.getAttribute(`${symbol}-value-in-eth`);
    console.log("args name ", name, args, typeof args);
    if (!(args && Object.keys(args).length)) {
        args = {};
    }
    if (price) {
        return {
            name: name.trim(),
            args,
            price: price.trim()
        }
    }
    else {
        return {
            name: name.trim(),
            args,
        }
    }
}

const getFunctionArgsFromAttr = (div, symbol) => {
    const argName = div.getAttribute(symbol);
    const argValue = div.textContent;
    if (argName && argValue) {
        return [
            argName.trim(),
            argValue.trim()
        ]
    }
    else {
        return [null, null]
    }
}

const getDivInfoFromLoader = async (info) => {
    const abi = await fetchAbiOfContractAt(window.LOGIC_ADDRESS, window.CHAINID);
    const event = abi.find(e => {
        return e.type === 'function' && e.name === info.name
    });
    if (event) {
        info.contractAddress = window.CONTRACT_ADDRESS;
        info.type = event.stateMutability;
        info.outputs = event.outputs.type;
        info.event = event;
        info.inputs = event.inputs;
    }
    else {
        alert(`Function not found in ABI ${info.name}`);
    }
    return info;
}

const getInputInfoFromDiv = (info) => {
    const querySymbol = `${functionSymbol}-${info.name}`;
    const functionArgDivs = [
        ...document.querySelectorAll(`[${querySymbol}]`)
    ]
    var inputArgs = info.args;
    if (functionArgDivs && functionArgDivs.length) {
        functionArgDivs.forEach((functionArgDiv) => {
            const [name, value] = getFunctionArgsFromAttr(functionArgDiv, querySymbol);
            if (name && value) {
                if (name === "value-in-eth") {
                    info = {
                        ...info,
                        price: value
                    }
                }
                else {
                    inputArgs = {
                        ...inputArgs,
                        [name]: value
                    }
                }
            }
        })
    }
    info = {
        ...info,
        inputArgs
    }
    return info;
}

export const checkDivs = async () => {
    console.log("checkDivs");
    const functionDivs = [
        ...document.querySelectorAll(`[${functionSymbol}]`)
    ]
    if (functionDivs) {
        console.log(functionDivs);
        functionDivs.forEach(async (functionDiv) => {
            // get information from div attribute
            functionDiv.href = "#"
            // get information from div attribute
            const infoFromAttr = getDivAttrInfo(functionDiv, functionSymbol);
            const divInfo = await getDivInfoFromLoader(infoFromAttr);
            if (divInfo.type === "view") {
                store.dispatch(appendReadFunction(divInfo));
            }
            else {
                functionDiv.onclick = async () => {
                    console.log("CLICK the button")
                    const initialBtnText = functionDiv.textContent;
                    setButtonText(functionDiv, "Loading...")
                    const finalInfo = getInputInfoFromDiv(divInfo);
                    console.log("finalInfo before open write modal", finalInfo);
                    store.dispatch(openFunctionCallModal(finalInfo));
                    setButtonText(functionDiv, initialBtnText)
                }
            }
        })
    }
}

export const updateDivText = (functionName, text) => {
    const functionDivs = [
        ...document.querySelectorAll(`[${functionSymbol}=${functionName}]`)
    ]
    if (functionDivs) {
        // console.log(connectButtons);
        functionDivs.forEach((functionDiv) => {
            // get information from div attribute
            setButtonText(functionDiv, text)
        })
    }
}