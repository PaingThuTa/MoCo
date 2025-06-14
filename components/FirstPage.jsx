"use client";
import * as React from "react";
import { useState } from "react";
import styles from "./FirstPage.module.css";

function FirstPage() {
  const [friendCount, setFriendCount] = useState(2);
  const [friends, setFriends] = useState(Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    name: "",
    amount: ""
  })));
  const [calculationResult, setCalculationResult] = useState(null);

  const handleDecreaseFriends = () => {
    if (friendCount > 2) {
      setFriendCount(prev => prev - 1);
      setCalculationResult(null);
    }
  };

  const handleIncreaseFriends = () => {
    if (friendCount < 10) {
      setFriendCount(prev => prev + 1);
      setCalculationResult(null);
    }
  };

  const handleNameChange = (id, value) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, name: value } : friend
    ));
    setCalculationResult(null);
  };

  const handleAmountChange = (id, value) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFriends(friends.map(friend => 
        friend.id === id ? { ...friend, amount: value } : friend
      ));
      setCalculationResult(null);
    }
  };

  const calculateSplit = () => {
    const activeFriends = friends.slice(0, friendCount);
    
    if (activeFriends.length < 2) {
      alert("Please enter at least 2 friends to split the bill");
      return;
    }

    const invalidInputs = activeFriends.some(friend => 
      !friend.name || !friend.amount || isNaN(Number(friend.amount))
    );

    if (invalidInputs) {
      alert("Please enter valid names and amounts for all friends");
      return;
    }

    // Calculate total and average
    const total = activeFriends.reduce((sum, friend) => sum + Number(friend.amount), 0);
    const averagePerPerson = total / activeFriends.length;

    // Calculate who owes what
    const settlements = activeFriends.map(friend => ({
      ...friend,
      balance: Number(friend.amount) - averagePerPerson
    }));

    // Sort by balance (highest to lowest)
    settlements.sort((a, b) => b.balance - a.balance);

    // Generate payment instructions
    const paymentInstructions = [];
    const receivers = settlements.filter(s => s.balance > 0);
    const payers = settlements.filter(s => s.balance < 0).sort((a, b) => a.balance - b.balance);

    payers.forEach(payer => {
      let remainingToPay = Math.abs(payer.balance);
      receivers.forEach(receiver => {
        if (remainingToPay > 0 && receiver.balance > 0) {
          const payment = Math.min(remainingToPay, receiver.balance);
          if (payment > 0) {
            paymentInstructions.push({
              from: payer.name,
              to: receiver.name,
              amount: payment.toFixed(2)
            });
            remainingToPay -= payment;
            receiver.balance -= payment;
          }
        }
      });
    });

    setCalculationResult({
      total,
      averagePerPerson,
      settlements,
      paymentInstructions
    });
  };

  return (
    <div className={styles.firstPageContainer}>
      <div className={styles.appHeader}>MoCo Money Splitter for Friends</div>
      <div className={styles.questionText}>
        how many friends do you want to split?
      </div>
      <div className={styles.counterContainer}>
        <button 
          className={styles.counterButton} 
          onClick={handleDecreaseFriends}
          disabled={friendCount <= 2}
        >
          -
        </button>
        <div className={styles.counterDisplay}>{friendCount}</div>
        <button 
          className={styles.counterButton}
          onClick={handleIncreaseFriends}
          disabled={friendCount >= 10}
        >
          +
        </button>
      </div>
      <div className={styles.tableHeader}>
        <div>No.</div>
        <div>Name</div>
        <div className={styles.amountHeader}>Amount</div>
      </div>
      {friends.slice(0, friendCount).map((friend) => (
        <div key={friend.id} className={styles.friendRow}>
          <div className={styles.friendNumber}>{friend.id}</div>
          <input
            type="text"
            className={styles.nameInput}
            value={friend.name}
            onChange={(e) => handleNameChange(friend.id, e.target.value)}
            placeholder="Enter name"
          />
          <input
            type="text"
            className={styles.amountInput}
            value={friend.amount}
            onChange={(e) => handleAmountChange(friend.id, e.target.value)}
            placeholder="$"
          />
        </div>
      ))}

      <button 
        className={styles.calculateButton}
        onClick={calculateSplit}
      >
        Calculate Split
      </button>

      {calculationResult && (
        <div className={styles.resultContainer}>
          <div className={styles.resultHeader}>
            Total Amount: ฿{calculationResult.total.toFixed(2)}
            <br />
            Each Person Pays: ฿{calculationResult.averagePerPerson.toFixed(2)}
          </div>
          <div className={styles.settlements}>
            {calculationResult.settlements.map((person) => (
              <div key={person.id} className={styles.settlementRow}>
                <strong>{person.name}</strong>: 
                {person.balance > 0 
                  ? ` will receive ฿${person.balance.toFixed(2)}`
                  : ` needs to pay ฿${Math.abs(person.balance).toFixed(2)}`}
              </div>
            ))}
          </div>
          {calculationResult.paymentInstructions.length > 0 && (
            <div className={styles.paymentInstructions}>
              <div className={styles.instructionsHeader}>Payment Instructions:</div>
              {calculationResult.paymentInstructions.map((instruction, index) => (
                <div key={index} className={styles.instructionRow}>
                  {instruction.from} needs to pay ฿{instruction.amount} to {instruction.to}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FirstPage;
