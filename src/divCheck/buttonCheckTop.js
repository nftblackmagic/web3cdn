// import { updateConnectButton, updateWalletStatus } from "./wallet.js";
import { updateConnectButton } from "./connectButtonCheck";
import { checkDivs } from "./functionCheck";
// import { blacklist } from "./blacklist";

export const initButtonCheck = async () => {
    checkDivs();
    updateConnectButton();
}

// init();
