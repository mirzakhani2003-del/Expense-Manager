import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionActions } from "../../redux/transactionSlice";

const TransactionForm = ({ editingTransaction, onFinishEdit }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allCategories = useSelector((state) => state.categories.categories);
  const wallets = useSelector((state) => state.wallets.wallets);
  const transactions = useSelector((state) => state.transactions.transactions);

  const categories = allCategories.filter(
    (category) => category.userId === currentUser.id,
  );

  const userWallets = wallets.filter(
    (wallet) => wallet.userId === currentUser.id,
  );

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    walletId: "",
    date: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      walletId: "",
      date: "",
    });

    setError("");
  };

  useEffect(() => {
    if (editingTransaction) {
      console.log(editingTransaction);
      setFormData({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        category: editingTransaction.category,
        walletId: editingTransaction.walletId || "",
        date: editingTransaction.date,
      });
    } else {
      resetForm();
    }
  }, [editingTransaction]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const amount = Number(formData.amount);

    if (formData.type === "expense") {
      const walletBalance = getWalletBalance(formData.walletId);

      if (walletBalance < amount) {
        setError(
          `Not enough balance in selected wallet.
          Available: $${walletBalance.toLocaleString()}, Required: $${amount.toLocaleString()}`,
        );

        return;
      }
    }

    const transactionData = {
      ...formData,
      amount,
      userId: currentUser.id,
    };

    if (editingTransaction) {
      dispatch(
        transactionActions.updateTransaction({
          id: editingTransaction.id,
          updatedTransaction: transactionData,
        }),
      );
      onFinishEdit();
    } else {
      dispatch(transactionActions.addTransaction(transactionData));
    }

    resetForm();
  };

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

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          select
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="expense">Expense</MenuItem>
          <MenuItem value="income">Income</MenuItem>
        </TextField>

        <TextField
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Wallet"
          name="walletId"
          value={formData.walletId}
          onChange={handleChange}
          fullWidth
          required
        >
          {userWallets.map((wallet) => (
            <MenuItem key={wallet.id} value={wallet.id}>
              {wallet.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          required
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <Button type="submit" variant="contained" size="large">
          {editingTransaction ? "Edit Transaction" : "Add Transaction"}
        </Button>

        {editingTransaction && (
          <Button type="button" variant="outlined" onClick={onFinishEdit}>
            Cancel
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default TransactionForm;
