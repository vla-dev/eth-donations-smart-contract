# eth-donations-smart-contract

### A simple smart contract that accepts transactions and store the donations with form
```
struct Donation {
        uint id;
        address from;
        string name;
        uint ammount;
    }
```

* Send new transactions from UI
* Read all the transactions
* Read the smart contract balance (ETH)

## Built with
* Truffle v5.4.12 (core: 5.4.12)
* Solidity - 0.8.9 (solc-js)
* Node v12.21.0
* Web3.js v1.5.3