"use client";
import * as React from "react";
import { useState } from "react";
import styles from "./FirstPage.module.css";

function FirstPage() {
  const [friendCount, setFriendCount] = useState(2); 
  const [friends, setFriends] = useState(
    Array(10)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        name: "",
        amount: ""
      }))
  );
  const [mode, setMode] = useState("minimal"); // "minimal" | "perPayer"
  const [calculationResult, setCalculationResult] = useState(null);

  const handleDecreaseFriends = () => {
    if (friendCount > 2) {
      setFriendCount((prev) => prev - 1);
      setCalculationResult(null);
    }
  };

  const handleIncreaseFriends = () => {
    if (friendCount < 10) {
      setFriendCount((prev) => prev + 1);
      setCalculationResult(null);
    }
  };

  const handleNameChange = (id, value) => {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === id ? { ...friend, name: value } : friend
      )
    );
    setCalculationResult(null);
  };

  const handleAmountChange = (id, value) => {
    // Allow empty, integers, and decimals
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFriends((prev) =>
        prev.map((friend) =>
          friend.id === id ? { ...friend, amount: value } : friend
        )
      );
      setCalculationResult(null);
    }
  };

  const calculateSplit = () => {
    const activeFriends = friends.slice(0, friendCount);

    if (activeFriends.length < 2) {
      alert("Please enter at least 2 friends to split the bill");
      return;
    }

    const invalidInputs = activeFriends.some(
      (friend) =>
        !friend.name || friend.amount === "" || isNaN(Number(friend.amount))
    );
    if (invalidInputs) {
      alert("Please enter valid names and amounts for all friends");
      return;
    }

    const round2 = (x) => Math.round((x + Number.EPSILON) * 100) / 100;
    const fmtMoney = (x) => `฿${round2(x).toFixed(2)}`;

    const n = activeFriends.length;
    const total = activeFriends.reduce(
      (sum, f) => sum + Number(f.amount),
      0
    );
    const averagePerPerson = total / n;

    // Immutable settlements for display
    const settlements = activeFriends.map((f) => ({
      id: f.id,
      name: f.name,
      paid: Number(f.amount),
      balance: round2(Number(f.amount) - averagePerPerson) // + receive, - pay
    }));

    let paymentInstructions = [];

    if (mode === "minimal") {
      // === Minimal transfers (netting) ===
      let creditors = settlements
        .filter((s) => s.balance > 0)
        .map((s) => ({ name: s.name, remaining: round2(s.balance) }));

      let debtors = settlements
        .filter((s) => s.balance < 0)
        .map((s) => ({ name: s.name, remaining: round2(-s.balance) })); // positive

      // Stable order
      creditors.sort((a, b) => b.remaining - a.remaining);
      debtors.sort((a, b) => b.remaining - a.remaining);

      let i = 0, j = 0;
      while (i < debtors.length && j < creditors.length) {
        const pay = round2(Math.min(debtors[i].remaining, creditors[j].remaining));
        if (pay > 0) {
          paymentInstructions.push({
            from: debtors[i].name,
            to: creditors[j].name,
            amount: pay
          });
          debtors[i].remaining = round2(debtors[i].remaining - pay);
          creditors[j].remaining = round2(creditors[j].remaining - pay);
        }
        if (debtors[i].remaining === 0) i++;
        if (creditors[j].remaining === 0) j++;
      }
    } else {
      // === Per-payer (itemized) ===
      // For each payer, every other person owes payer.paid / n
      const payers = settlements.filter((s) => s.paid > 0);
      const people = settlements.map((s) => s.name);

      payers.forEach((payer) => {
        const share = round2(payer.paid / n);
        settlements.forEach((person) => {
          if (person.name !== payer.name) {
            paymentInstructions.push({
              from: person.name,
              to: payer.name,
              amount: share
            });
          }
        });
      });

      // Optional: combine identical pairs (from->to) if multiple payers existed
      const merged = {};
      for (const t of paymentInstructions) {
        const key = `${t.from}__${t.to}`;
        merged[key] = round2((merged[key] || 0) + t.amount);
      }
      paymentInstructions = Object.entries(merged).map(([key, amount]) => {
        const [from, to] = key.split("__");
        return { from, to, amount };
      });

      // Sort for readability: by 'from', then 'to'
      paymentInstructions.sort((a, b) =>
        a.from.localeCompare(b.from) || a.to.localeCompare(b.to)
      );
    }

    setCalculationResult({
      total: round2(total),
      averagePerPerson: round2(averagePerPerson),
      settlements,
      paymentInstructions,
      mode
    });
  };

  const money = (n) => `฿${Number(n).toFixed(2)}`;



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
            placeholder="฿"
          />
        </div>
      ))}

      {/* Mode toggle */}
      <div className={styles.modeToggle}>
        <label>
          <input
            type="radio"
            name="mode"
            value="minimal"
            checked={mode === "minimal"}
            onChange={() => setMode("minimal")}
          />
          Simple (minimal transfers)
        </label>
        <label style={{ marginLeft: 16 }}>
          <input
            type="radio"
            name="mode"
            value="perPayer"
            checked={mode === "perPayer"}
            onChange={() => setMode("perPayer")}
          />
          Per-payer (itemized)
        </label>
      </div>

      <button className={styles.calculateButton} onClick={calculateSplit}>
        Calculate Split
      </button>

      {calculationResult && (
        <div className={styles.resultContainer}>
          <div className={styles.resultHeader}>
            Total Amount: {money(calculationResult.total)}
            <br />
            Each Person Pays: {money(calculationResult.averagePerPerson)}
          </div>

          <div className={styles.settlements}>
            {calculationResult.settlements.map((person) => (
              <div key={person.id} className={styles.settlementRow}>
                <strong>{person.name}</strong>:{" "}
                {person.balance > 0
                  ? `will receive ${money(person.balance)}`
                  : person.balance < 0
                  ? `owes ${money(Math.abs(person.balance))}`
                  : "is settled"}
              </div>
            ))}
          </div>

          {calculationResult.paymentInstructions.length > 0 && (
            <div className={styles.paymentInstructions}>
              <div className={styles.instructionsHeader}>
                {calculationResult.mode === "perPayer"
                  ? "Payment Instructions (Per-payer):"
                  : "Payment Instructions (Minimal Transfers):"}
              </div>
              {calculationResult.paymentInstructions.map(
                (instruction, index) => (
                  <div key={index} className={styles.instructionRow}>
                    {instruction.from} → {instruction.to}:{" "}
                    {money(instruction.amount)}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FirstPage;
