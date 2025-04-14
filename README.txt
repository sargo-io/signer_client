
#To run this app

You need to have nodejs installed on you computer

1. Make sure you are inside the sample app root directory
2. Open a terminal and run the node command "npm install" to install the required packages

Once the install is completed

3. Add the testing private keys for the buyer and seller

const buyerPrivateKey = "replace with buyer private key";
const sellerPrivateKey = "replace with seller private key";

4. Ensure that the transaction data you want to sign is valid as per the documentation/the functionName you want to execute

5. On the terminal run the command "npm run dev"

- After the function executes successfully the signature will be logged on the terminal, otherwise an error will be logged instead

6. Using the generated signature, you can now pass this the broadcasting API endpoint below to write the transaction on chain


https://testapi.sargo.io/transactions/send/signed