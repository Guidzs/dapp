//SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

struct Bet {
    uint amount;
    uint candidate;
    uint timestamp;
    uint claimed;
}

struct Dispute {
    string candidate1;
    string candidate2;
    string image1;
    string image2;
    uint total1;
    uint total2;
    uint winner;
}

contract BetCandidate {

    Dispute public  dispute;
    mapping(address => Bet) public allBets;
    
    address owner;
    uint fee = 1000; // taxa de comição (contas monetarias na blockchain são feitas com inteiros escala de 4 zeros)
    uint public netPrize;

    constructor() {
        owner = msg.sender;
        dispute = Dispute({
            candidate1: 'Groudon',
            candidate2: 'Lucario',
            image1: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/383.png',
            image2: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/448.png',
            total1: 0,
            total2: 0,
            winner: 0
        });
    }

    function bet(uint candidate) external payable  {
        require(candidate == 1 || candidate == 2, 'Invalid Candidate');
        require(msg.value > 0, 'Invalid bet');
        require(dispute.winner == 0, 'Dispute closed');
        require(allBets[msg.sender].candidate == 0, 'User placed the bet');

        Bet memory newBet;
        newBet.amount = msg.value;
        newBet.candidate = candidate;
        newBet.timestamp = block.timestamp;

        allBets[msg.sender] = newBet;

        if(candidate == 1)
            dispute.total1 += msg.value;
        else
            dispute.total2 += msg.value;
    }

    function withdraw_comission(Dispute memory d_) private  {
        uint grossPrize = d_.total1 + d_.total2;
        uint comission = (grossPrize * fee) / 1e4;
        netPrize = grossPrize - comission;

        payable(owner).transfer(comission);
    }

    function finish(uint winner) external {
        require(msg.sender == owner, 'Invalid account');
        require(winner == 1 || winner == 2, 'Invalid candidate');
        require(dispute.winner == 0, 'Dispute closed');

        dispute.winner = winner;

        withdraw_comission(dispute);
    }

    function claim() external  {
        Bet memory userBet = allBets[msg.sender];
        require(dispute.winner > 0 && dispute.winner == userBet.candidate && userBet.claimed == 0, 'Invalid claimed');
    
        uint winnerAmount = dispute.winner == 1 ? dispute.total1 : dispute.total2;
        uint ratio = (userBet.amount * 1e4) / winnerAmount;
        uint individualPrize = (netPrize * ratio) / 1e4;
        allBets[msg.sender].claimed = individualPrize;
        payable(msg.sender).transfer(individualPrize);
    }
}
