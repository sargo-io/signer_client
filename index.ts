import { createWalletClient, encodeFunctionData, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celoAlfajores } from "viem/chains";
import { SargoEscrowAbi } from "./abis/SargoEscrow";

/* initialize the contract and the Token to use */
const SARGO_ESCROW_ADDRESS = "0x8D1e56c8d3fAa3d49B83B4A0691BA8b0c2dB1C05"; //sargo escrow contract address - testnet

const SARGO_ESCROW_ABI = SargoEscrowAbi; //sargoEscrowAbi - escrow ABI
const CUSD_TOKEN_ADDRESS = "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"; //Token to use - cUSD in this case
const targetChain = celoAlfajores; //the targeted chain - in this case CELO testnet

/* 
  This sample code is just for testing purposes and is target the CELO testnet environment 
  don't use private keys with real value or you risk losing / exposing you private key  
*/

//add counter-party testing private keys
const buyerPrivateKey = "0x0"; //buyers private key
const sellerPrivateKey = "0x0"; //sellers private key

export const buyerWallet = createWalletClient({
  account: privateKeyToAccount(buyerPrivateKey),
  chain: targetChain,
  transport: http(),
});

export const sellerWallet = createWalletClient({
  account: privateKeyToAccount(sellerPrivateKey),
  chain: targetChain,
  transport: http(),
});

//transactions dummy parameter data
const weiAmount = parseEther("0.5");
const currencyCode = "KES";
const weiConversionRate = parseEther("129");
const paymentMethod = "M-Pesa"; //supported payment method
const businessNumber = "100001";
const clientAccount = "0x0"; //buyer address
const clientName = "James Smart";
const clientPhoneNumber = "+254722000001";
const agentAccount = "0x0"; // seller address
const agentName = "John Doe";
const agentPhoneNumber = "+254733000001";
const tokenName = "cUSD";

/* 
  data setup to send to the sign signature

  change the parameters depending on the transaction you want to sign as provided in the documentation 
*/
const data = {
  abi: SARGO_ESCROW_ABI,
  functionName: "buy",
  args: [
    weiAmount,
    currencyCode,
    weiConversionRate,
    paymentMethod,
    agentAccount,
    tokenName,
    CUSD_TOKEN_ADDRESS,
    false,
  ],
};

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "approve",
//   args: [1240],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "sell",
//   args: [
//     weiAmount,
//     currencyCode,
//     weiConversionRate,
//     paymentMethod,
//     clientAccount,
//     tokenName,
//     CUSD_TOKEN_ADDRESS,
//     false,
//   ],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "acceptBuy",
//   args: [1241],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "clientApprove",
//   args: [1240],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "agentApprove",
//   args: [1240],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "initiateCancelTx",
//   args: [1241, "Slow"],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "clientApproveCancel",
//   args: [1241, "Slow"],
// };

/// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "agentApproveCancel",
//   args: [1241, "Slow"],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "cancelTx",
//   args: [1241, "Slow"],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "disputeTx",
//   args: [1241, "reason"],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "claimTx",
//   args: [1241, "resolution"],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "send",
//   args: [
//     clientAccount,
//     weiAmount,
//     currencyCode,
//     weiConversionRate,
//     tokenName,
//     CUSD_TOKEN_ADDRESS,
//   ],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "credit",
//   args: [
//     clientAccount,
//     weiAmount,
//     currencyCode,
//     weiConversionRate,
//     tokenName,
//     CUSD_TOKEN_ADDRESS,
//   ],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "txStatus",
//   args: [1241, 8],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "refundTx",
//   args: [1241, weiAmount, weiAmount, "resolution"],
// };

// const data = {
//   abi: SARGO_ESCROW_ABI,
//   functionName: "voidTx",
//   args: [1241, "resolution"],
// };

/* function to sign transaction - this should be done on the front end to avoid passing the private key when calling the API */
async function _signTransaction() {
  try {
    //CLIENT prepare tx request
    const prepareTx = await buyerWallet.prepareTransactionRequest({
      chain: targetChain,
      to: SARGO_ESCROW_ADDRESS,
      data: encodeFunctionData(data),
    });

    //CLIENT sign tx and log the serialized transaction
    const signature = await buyerWallet.signTransaction(prepareTx);

    //AGENT prepare tx request
    // const prepareTx = await sellerWallet.prepareTransactionRequest({
    //   chain: targetChain,
    //   to: SARGO_ESCROW_ADDRESS,
    //   data: encodeFunctionData(data),
    // });

    //AGENT sign tx and log the serialized transaction
    // const signature = await sellerWallet.signTransaction(prepareTx);

    console.log("--START SERIALIZED TRANSACTION SIGNATURE-- \n");
    console.log(signature);
    console.log("\n --END SERIALIZED TRANSACTION SIGNATURE--");
  } catch (error) {
    console.log("_signTransaction", error);
  }
}

_signTransaction();
