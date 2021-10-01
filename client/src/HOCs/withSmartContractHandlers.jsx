import React, { useState } from 'react'
import DonationsContract from "../contracts/Donations.json";

const withSmartContractHandlers = (Component) => (props) => {
    const { web3 } = props;

    const [networkId, setNetworkId] = useState(null);
    const [deployedNetwork, setDeployedNetwork] = useState(null);
    const [contract, setContract] = useState(null);
    const [accounts, setAccounts] = useState(null);

    const apiHandlers = {
        getAccounts: async function () {
            if (!web3)
                return null;

            const accounts = await web3.eth.getAccounts();

            setAccounts(accounts);
        },

        getNetworkInfo: async function () {
            if (!web3)
                return null;

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = DonationsContract.networks[networkId];

            const instance = new web3.eth.Contract(
                DonationsContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            setNetworkId(networkId);
            setDeployedNetwork(deployedNetwork);
            setContract(instance);
        },

        submitDonation: async function (name, ammount) {
            if (!contract)
                return null;

            await contract.methods.newDonation(name, ammount).send({ from: accounts[0], value: ammount });
        },

        getDonations: async function () {
            if (!contract)
                return null;

            const response = await contract.methods.getDonations().call();

            const _donnationMapping = item => ({
                id: item[0],
                from: item[1],
                name: item[2],
                ammount: web3.utils.fromWei(item[3], "ether") + " ETH"
            });

            if (response && Array.isArray(response)) {
                const _donations = response
                    .map(_donnationMapping)
                    .filter(item => item)

                return _donations;
            }

            return null;
        },

        getBalance: async function () {
            if (!contract)
                return null;

            return await contract.methods.getBalance().call();
        }
    }

    return <Component
        {...props}
        networkId={networkId}
        deployedNetwork={deployedNetwork}
        contract={contract}
        accounts={accounts}
        api={apiHandlers} />
}

export default withSmartContractHandlers;