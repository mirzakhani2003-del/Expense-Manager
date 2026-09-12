import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { transactionActions } from "../../redux/transactionSlice";

const TransferForm = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const wallets = useSelector((state) => state.wallets.wallets);
  const transactions = useSelector((state) => state.transactions.transactions);

  const userWallets = wallets.filter(
    (wallet) => wallet.userId === currentUser.id,
  );

  const [formData, setFormData] = useState({
    fromWallet: "",
    toWallet: "",
    amount: "",
  });

  const [error, setError] = useState("");

  const getWalletBalance = (walletId) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.userId === currentUser.id &&
          transaction.walletId === walletId,
      )
      .reduce((balance, transaction) => {
        if (transaction.type === "income") {
          return balance + transaction.amount;
        }

        return balance - transaction.amount;
      }, 0);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const amount = Number(formData.amount);

    if (amount <= 0) {
      setError("Transfer amount must be greater than zero.");
      return;
    }

    if (formData.fromWallet === formData.toWallet) {
      setError("Source and destination wallets cannot be the same.");
      return;
    }

    const balance = getWalletBalance(formData.fromWallet);

    if (balance < amount) {
      setError(`Not enough balance. Available: $${balance.toLocaleString()}`);

      return;
    }

    const fromWallet = userWallets.find(
      (wallet) => wallet.id === formData.fromWallet,
    );

    const toWallet = userWallets.find(
      (wallet) => wallet.id === formData.toWallet,
    );

    if (!fromWallet || !toWallet) {
      setError("Please select both wallets.");
      return;
    }

    dispatch(
      transactionActions.addTransaction({
        title: `Transfer to ${toWallet.name}`,
        amount,
        type: "expense",
        category: "Transfer",
        walletId: fromWallet.id,
        userId: currentUser.id,
        date: new Date().toISOString().split("T")[0],
      }),
    );

    dispatch(
      transactionActions.addTransaction({
        title: `Transfer from ${fromWallet.name}`,
        amount,
        type: "income",
        category: "Transfer",
        walletId: toWallet.id,
        userId: currentUser.id,
        date: new Date().toISOString().split("T")[0],
      }),
    );

    setFormData({
      fromWallet: "",
      toWallet: "",
      amount: "",
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        mt: 3,
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
        Transfer Money
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gap: 2,
        }}
      >
        <TextField
          select
          label="From Wallet"
          name="fromWallet"
          value={formData.fromWallet}
          onChange={handleChange}
          required
        >
          {userWallets.map((wallet) => (
            <MenuItem key={wallet.id} value={wallet.id}>
              {wallet.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="To Wallet"
          name="toWallet"
          value={formData.toWallet}
          onChange={handleChange}
          required
        >
          {userWallets.map((wallet) => (
            <MenuItem key={wallet.id} value={wallet.id}>
              {wallet.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="contained">
          Transfer
        </Button>
      </Box>
    </Paper>
  );
};

export default TransferForm;