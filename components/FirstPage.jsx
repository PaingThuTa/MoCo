"use client";
import * as React from "react";
import { useState } from "react";
import styles from "./FirstPage.module.css";

function FirstPage() {
  const [friendCount, setFriendCount] = useState(2);
  const [friends, setFriends] = useState(
    Array(10).fill(null).map((_, index) => ({
      id: index + 1,
      name: "",
      amount: ""
    }))
  );
  const [mode, setMode] = useState("minimal"); // "minimal" | "perPayer"
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
    setFriends(prev => prev.map(f => f.id === id ? { ...f, name: value } : f));
    setCalculationResult(null);
  };
  const handleAmountChange = (id, value) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFriends(prev => prev.map(f => f.id === id ? { ...f, amount: value } : f));
      setCalculationResult(null);
    }
  };

  const calculateSplit = () => {
    const activeFriends = friends.slice(0, friendCount);
    if (activeFriends.length < 2) {
      alert("Please enter at least 2 friends to split the bill");
      return;
    }
    const invalid = activeFriends.some(
      f => !f.name || f.amount === "" || isNaN(Number(f.amount))
    );
    if (invalid) {
      alert("Please enter valid names and amounts for all friends");
      return;
    }

    const round2 = x => Math.round((x + Number.EPSILON) * 100) / 100;
    const n = activeFriends.length;
    const total = activeFriends.reduce((s, f) => s + Number(f.amount), 0);
    const averagePerPerson = total / n;

    const settlements = activeFriends.map(f => ({
      id: f.id,
      name: f.name,
      paid: Number(f.amount),
      balance: round2(Number(f.amount) - averagePerPerson) // + receive, - pay
    }));

    let paymentInstructions = [];

    if (mode === "minimal") {
      // netting
      let creditors = settlements.filter(s => s.balance > 0)
        .map(s => ({ name: s.name, remaining: round2(s.balance) }));
      let debtors = settlements.filter(s => s.balance < 0)
        .map(s => ({ name: s.name, remaining: round2(-s.balance) }));

      creditors.sort((a, b) => b.remaining - a.remaining);
      debtors.sort((a, b) => b.remaining - a.remaining);

      let i = 0, j = 0;
      while (i < debtors.length && j < creditors.length) {
        const pay = round2(Math.min(debtors[i].remaining, creditors[j].remaining));
        if (pay > 0) {
          paymentInstructions.push({ from: debtors[i].name, to: creditors[j].name, amount: pay });
          debtors[i].remaining = round2(debtors[i].remaining - pay);
          creditors[j].remaining = round2(creditors[j].remaining - pay);
        }
        if (debtors[i].remaining === 0) i++;
        if (creditors[j].remaining === 0) j++;
      }
    } else {
      // per-payer
      const round2 = x => Math.round((x + Number.EPSILON) * 100) / 100;
      const payers = settlements.filter(s => s.paid > 0);
      payers.forEach(payer => {
        const share = round2(payer.paid / n);
        settlements.forEach(person => {
          if (person.name !== payer.name) {
            paymentInstructions.push({ from: person.name, to: payer.name, amount: share });
          }
        });
      });
      // merge same from->to
      const merged = {};
      for (const t of paymentInstructions) {
        const key = `${t.from}__${t.to}`;
        merged[key] = round2((merged[key] || 0) + t.amount);
      }
      paymentInstructions = Object.entries(merged).map(([key, amount]) => {
        const [from, to] = key.split("__");
        return { from, to, amount };
      }).sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
    }

    setCalculationResult({
      total: Math.round((total + Number.EPSILON) * 100) / 100,
      averagePerPerson: Math.round((averagePerPerson + Number.EPSILON) * 100) / 100,
      settlements,
      paymentInstructions,
      mode
    });
  };

  const money = n => `฿${Number(n).toFixed(2)}`;

  // group helpers (for per-payer UI)
  const groupByFrom = (instructions) => {
    const map = new Map();
    for (const t of instructions) {
      if (!map.has(t.from)) map.set(t.from, []);
      map.get(t.from).push(t);
    }
    return map;
  };

  return (
    <div className={styles.firstPageContainer}>
      <div className={styles.appHeader}>MoCo Money Splitter for Friends</div>

      <div className={styles.questionText}>how many friends do you want to split?</div>

      <div className={styles.counterContainer}>
        <button className={styles.counterButton} onClick={handleDecreaseFriends} disabled={friendCount <= 2}>-</button>
        <div className={styles.counterDisplay}>{friendCount}</div>
        <button className={styles.counterButton} onClick={handleIncreaseFriends} disabled={friendCount >= 10}>+</button>
      </div>

      <div className={styles.tableHeader}>
        <div>No.</div>
        <div>Name</div>
        <div className={styles.amountHeader}>Amount</div>
      </div>

      {friends.slice(0, friendCount).map(friend => (
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

      {/* Segmented toggle */}
      <div className={styles.segmented}>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "minimal"}
          className={`${styles.segmentedOption} ${mode === "minimal" ? styles.segmentedActive : ""}`}
          onClick={() => setMode("minimal")}
        >
          Simple
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "perPayer"}
          className={`${styles.segmentedOption} ${mode === "perPayer" ? styles.segmentedActive : ""}`}
          onClick={() => setMode("perPayer")}
        >
          Per-payer
        </button>
      </div>

      <button className={styles.calculateButton} onClick={calculateSplit}>Calculate Split</button>

      {calculationResult && (
        <div className={styles.resultContainer}>
          <div className={styles.resultHeader}>
            Total Amount: {money(calculationResult.total)}<br />
            Each Person Pays: {money(calculationResult.averagePerPerson)}
          </div>

          <div className={styles.settlements}>
            {calculationResult.settlements.map(person => (
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

              {calculationResult.mode === "perPayer" ? (
                // GROUPED CARDS by "from"
                [...groupByFrom(calculationResult.paymentInstructions)].map(([from, items]) => (
                  <div key={from} className={styles.groupCard}>
                    <div className={styles.groupHeader}>{from}</div>
                    <div className={styles.groupBody}>
                      {items.map((t, i) => (
                        <div key={i} className={styles.instructionRow}>
                          {from} → {t.to}: {money(t.amount)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Minimal mode: flat list
                calculationResult.paymentInstructions.map((t, i) => (
                  <div key={i} className={styles.instructionRow}>
                    {t.from} → {t.to}: {money(t.amount)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FirstPage;
