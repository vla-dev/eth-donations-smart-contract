import React, { useState } from 'react';

const DonationCard = ({onSubmitDonation}) => {
    const [name, setName] = useState('');
    const [ammount, setAmmount] = useState(0);

    const onSubmit = () => {
        onSubmitDonation(name, ammount);
    }

    return <div className="donation-card">
        <h3>New Donation</h3>
        <div className="donation-info">
            
            <div className="input-field">
                <span>Name</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="input-field">
                <span>Ammount</span>
                <input type="number" value={ammount} onChange={(e) => setAmmount(e.target.value)}/>
            </div>

            <button className="submit-donation" onClick={onSubmit}>Donate</button>
        </div>
    </div>
}

export default DonationCard;