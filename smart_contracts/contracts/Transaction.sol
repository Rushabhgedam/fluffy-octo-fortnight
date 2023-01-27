// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Transaction {
    constructor() {}


    uint256 transactionCount;
    event Transfer (address from, address receiver, uint amount, string message, uint timestamp, string keyword);
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint timestamp;
        string keyword;
    }

    TransferStruct[] transactionList;

    function addToBlockChain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactionList.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));
        emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);
    }
    
    function getAllTransactions() public view returns (TransferStruct[] memory){
        // returning list of all transactions
        return transactionList;
    }
    
     function getAllTransactionsCount() public view returns (uint256) {
        // returning count of all transactions
        return transactionCount;
    }
    


}