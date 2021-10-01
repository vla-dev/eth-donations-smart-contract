import React, { useEffect, useState } from 'react';

const Header = ({ web3 }) => {
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState("");

    const getAccountsInfo = async () => {
        const accounts = await web3.eth.getAccounts();
        const rawBalance = await web3.eth.getBalance(accounts[0])
        const balance = web3.utils.fromWei(rawBalance, "ether") + " ETH";

        setAccounts(accounts)
        setBalance(balance);
    }

    useEffect(() => { getAccountsInfo() }, [])

    return <div className="header-container">
        <div className="left-section">Blockchain</div>
        <div className="right-section">
            <span>{balance}</span>
            <span className="vertical-divider" />
            <span>{accounts[0]}</span>
        </div>
    </div>
}

export default Header;