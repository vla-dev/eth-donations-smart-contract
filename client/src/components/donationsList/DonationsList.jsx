import React from 'react';

const DonationsList = ({ donations }) => {
    const entries = donations
        .map((item, index) => {
            const { id, from, name, ammount } = item;

            return <tr key={index}>
                <td>{id}</td>
                <td>{from}</td>
                <td>{name}</td>
                <td>{ammount}</td>
            </tr>
        })

    return donations && donations.length > 0
        ? <table className="donations-table">
            <thead>
                <tr>
                    <td>#</td>
                    <td>Address</td>
                    <td>Name</td>
                    <td>Ammount</td>
                </tr>
            </thead>
            <tbody>
                {entries}
            </tbody>
        </table>
        : null;
}

export default DonationsList;