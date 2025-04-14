import { createWalletClient, encodeFunctionData, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celoAlfajores } from "viem/chains";
import { SargoEscrowAbi } from "./abis/SargoEscrow";

/* initialize the contract and the Token to use */
const SARGO_ESCROW_ADDRESS = "0x7bDF32f21C4670ac05b32edde9857006C2bbfc3E"; //sargo escrow contract address - testnet
const SARGO_ESCROW_ABI = SargoEscrowAbi; //sargoEscrowAbi - escrow ABI
const CUSD_TOKEN_ADDRESS = "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"; //Token to use - cUSD in this case
const targetChain = celoAlfajores; //the targeted chain - in this case CELO testnet

/* 
  This sample code is just for testing purposes and is target the CELO testnet environment 
  don't use private keys with real value or you risk losing / exposing you private key  
*/

//add counter-party testing private keys
const buyerPrivateKey = ""; //buyers private key
const sellerPrivateKey = ""; //sellers private key

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

//initiate buy parameter data
const weiAmountBuy = parseEther("0.5");
const currencyCodeBuy = "KES";
const weiConversionRateBuy = parseEther("129");
const paymentMethodBuy = "M-Pesa";
const businessNumberBuy = "100001";
const clientNameBuy = "James Smart";
const clientPhoneNumberBuy = "+254722000001";
const agentAccountBuy = "0x765AC191CC0aFF2B319afA10bC9DF1dfEDdB887B";
const agentNameBuy = "John Doe";
const agentPhoneNumberBuy = "+254733000001";
const tokenNameBuy = "cUSD";

/* 
  data setup to send to the sign signature

  change the parameters depending on the transaction you want to sign as provided in the documentation 
*/
const data = {
  abi: SARGO_ESCROW_ABI,
  functionName: "initiateDeposit",
  args: [
    weiAmountBuy,
    currencyCodeBuy,
    weiConversionRateBuy,
    paymentMethodBuy,
    businessNumberBuy,
    clientNameBuy,
    clientPhoneNumberBuy,
    agentAccountBuy,
    agentNameBuy,
    agentPhoneNumberBuy,
    tokenNameBuy,
    CUSD_TOKEN_ADDRESS,
  ],
};

/* function to sign transaction - this should be done on the front end to avoid passing the private key when calling the API */
async function _signTransaction() {
  try {
    //prepare tx request
    const prepareTx = await buyerWallet.prepareTransactionRequest({
      chain: targetChain,
      to: SARGO_ESCROW_ADDRESS,
      data: encodeFunctionData(data),
    });

    //sign tx and log the serialized transaction
    const signature = await buyerWallet.signTransaction(prepareTx);

    console.log("--START SERIALIZED TRANSACTION SIGNATURE-- \n");
    console.log(signature);
    console.log("\n --END SERIALIZED TRANSACTION SIGNATURE--");
  } catch (error) {
    console.log("_signTransaction", error);
  }
}

_signTransaction();
