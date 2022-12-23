import { store } from "../app/store";
import { openUserModal } from "../components/UserModal/UserModalSlice";
import { setButtonText } from "../utils";

const connectSymbol = "connect-button"


export const updateConnectButton = async () => {
    console.log("updateConnectButton");
    const connectButtons = [
        ...document.querySelectorAll(`[${connectSymbol}]`)
    ]
    if (connectButtons) {
        console.log(connectButtons);
        connectButtons.forEach((connectButton) => {
            // get information from div attribute
            connectButton.href = "#"
            connectButton.onclick = async () => {
                console.log("CLICK the button")
                const initialBtnText = connectButton.textContent;
                setButtonText(connectButton, "Loading...")
                store.dispatch(openUserModal());
                setButtonText(connectButton, initialBtnText)
            }
        })
    }
}

export const updateConnectButtonText = (text) => {
    const connectButtons = [
        ...document.querySelectorAll(`[${connectSymbol}]`)
    ]
    if (connectButtons) {
        // console.log(connectButtons);
        connectButtons.forEach((connectButton) => {
            // get information from div attribute
            setButtonText(connectButton, text)
        })
    }
}