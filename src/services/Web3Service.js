import Web3 from "web3";
import ABI from "./ABI.json"

const CONTRACT_ADRESS = '0x7b96aF9Bd211cBf6BA5b0dd53aa61Dc5806b6AcE' // EX

export async function doLogin() {
    if(!window.ethereum) throw new Error("MetaMask não está instalada!");
    
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("MetaMask não foi autorizada!");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
}

function getContract() {
    if(!window.ethereum) throw new Error("MetaMask não está instalada!");
    
    const from = localStorage.getItem("wallet");
    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(ABI, CONTRACT_ADRESS, { from })
}

export async function getDispute() {
    const contract = getContract();
    return contract.methods.dispute().call();
}

export async function palceBet(candidate, amountInEth) {
    const contract = getContract();
    return contract.methods.bet(candidate).send({
        value: Web3.utils.toWei(amountInEth, "ether"),
        gas: 999999,
        gasPrice: "99999999999"
    });
}

export async function finishDispute(winner) {
    const contract = getContract();
    return contract.methods.finish(winner).send();
}

export async function claimPrize() {
    const contract = getContract();
    return contract.methods.claim().send();
}