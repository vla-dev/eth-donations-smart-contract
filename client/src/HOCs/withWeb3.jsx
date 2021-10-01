import React, { useEffect, useState } from 'react'
import getWeb3 from '../getWeb3';

const withWeb3 = (Component) => (props) => {
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const web3 = await getWeb3();
            setWeb3(web3);
        }

        fetch();
    }, [])

    return <Component {...props} web3={web3}/>
}

export default withWeb3;