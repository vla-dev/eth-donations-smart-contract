import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import withWeb3 from "./HOCs/withWeb3";
import withSmartContractHandlers from "./HOCs/withSmartContractHandlers";
import DonationCard from "./components/donation/Donation";
import DonationsList from "./components/donationsList/DonationsList";

const App = ({ web3, api, contract }) => {
  const [donations, setDonations] = useState(null);
  const [balance, setBalance] = useState(0);

  const handleSubmitDonation = async (name, ammount) => {
    const wei = web3.utils.toWei(ammount.toString(), "ether");
    await api.submitDonation(name, wei);

    window.location.reload();
  }

  const getDonations = async () => {
    const _donations = await api.getDonations();
    setDonations(_donations);
  }

  const getBalance = async () => {
    const _balance = await api.getBalance();
    setBalance(web3.utils.fromWei(_balance, "ether") + " ETH");
  }

  useEffect(() => {
    if (api) {
      api.getNetworkInfo()
      api.getAccounts();
    }
  }, [web3])

  useEffect(() => {
    if (contract) {
      getDonations();
      getBalance();
    }
  }, [contract])

  return !web3 ? null : <div className="app">
    <Header web3={web3} />
    <DonationCard onSubmitDonation={handleSubmitDonation} />
    <span className="balance">Contract balance: {balance}</span>
    {donations && <DonationsList donations={donations} />}
  </div>
}

export default withWeb3(withSmartContractHandlers(App));