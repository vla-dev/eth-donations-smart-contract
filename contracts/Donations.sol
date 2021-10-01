pragma solidity 0.8.9;

contract Donations {
    uint public donationsCount = 0;

    struct Donation {
        uint id;
        address from;
        string name;
        uint ammount;
    }

    mapping(uint => Donation) public donations;

    function newDonation(string memory _name, uint _value) public payable {
        donations[donationsCount] = Donation(
            donationsCount,
            msg.sender,
            _name,
            _value
        );

        donationsCount++;
    }

    function getDonations() public view returns (Donation[] memory) {
        Donation[] memory lDonations = new Donation[](donationsCount);
        for (uint i = 0; i < donationsCount; i++) {
            Donation storage lDonation = donations[i];
            lDonations[i] = lDonation;
        }
        return lDonations;
    }

    function getBalance() public view returns (uint){
        return address(this).balance;
    }
}
