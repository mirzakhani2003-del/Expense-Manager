import { createContext, useContext, useEffect, useState } from "react";
import { transactions as initialTransactions } from "../data/transactions";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : initialTransactions;
  });

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      {
        ...transaction,
        id: Date.now(),
      },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export function useTransaction() {
  return useContext(TransactionContext);
}
