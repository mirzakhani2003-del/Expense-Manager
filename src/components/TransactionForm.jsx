import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../redux/slices/transactionSlice";
import * as yup from "yup";
import { useEffect, useState } from "react";

const transactionSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters"),
  amount: yup.number().required("Amount is required"),
  type: yup.string().required("Please select transaction type"),
  category: yup.string().required("Please select a category for transaction"),
  date: yup.string().required("Please select a date"),
  wallet: yup.string().required("Please selecet a wallet"),
});

const TransactionForm = ({ initialData, transactionId, openModal }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const transactions = useSelector((state) => state.transactions.transactions);
  const wallets = useSelector((state) => state.wallets.wallets);

  const [editingMode, setEditingMode] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setEditingMode(true);
    }
  }, [initialData, reset]);

  const userCategories = categories.filter(
    (category) => category.userId === currentUser.id,
  );

  const userWallets = wallets.filter(
    (wallet) => wallet.userId === currentUser.id,
  );

  const getWalletBalance = (wallet) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.userId === currentUser.id &&
          transaction.wallet === wallet.name,
      )
      .reduce((balance, transaction) => {
        if (transaction.type === "income") {
          return balance + transaction.amount;
        } else {
          return balance - transaction.amount;
        }
      }, 0);
  };

  const onSubmit = (data) => {
    try {
      if (data.type === "expense") {
        const wallet = wallets.find((wallet) => wallet.name === data.wallet);
        const walletBalance = getWalletBalance(wallet);

        if (data.amount > walletBalance) {
          throw new Error(`Not enough balance in selected wallet.
          Available: $${walletBalance.toLocaleString()}, Required: $${data.amount.toLocaleString()}`);
        }
      }

      if (editingMode && transactionId) {
        const transaction = transactions.find(
          (item) => item.id === transactionId,
        );

        const updatedTransaction = {
          ...transaction,
          title: data.title,
          amount: Number(data.amount),
          data: data.date,
          category: data.category,
          wallet: data.wallet,
          type: data.type,
        };

        dispatch(transactionAction.updateTransaction(updatedTransaction));
        alert("Chages saved !");
      } else {
        const newTransaction = {
          id: crypto.randomUUID(),
          title: data.title,
          amount: Number(data.amount),
          date: data.date,
          category: data.category,
          wallet: data.wallet,
          type: data.type,
          userId: currentUser.id,
        };

        dispatch(transactionAction.addTransaction(newTransaction));
        reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("wallet", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        {editingMode ? "Edit Transaction" : "Add Transaction"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField label="Title" fullWidth {...register("title")} />
        {errors.title && <Alert severity="error">{errors.title.message}</Alert>}

        <TextField
          type="number"
          label="Amount"
          fullWidth
          {...register("amount")}
        />
        {errors.amount && (
          <Alert severity="error">{errors.amount.message}</Alert>
        )}

        <TextField select label="Type" fullWidth {...register("type")}>
          <MenuItem value="expense">Expense</MenuItem>
          <MenuItem value="income">Income</MenuItem>
        </TextField>
        {errors.type && <Alert severity="error">{errors.type.message}</Alert>}

        <TextField select label="Category" fullWidth {...register("category")}>
          {userCategories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        {errors.category && (
          <Alert severity="error">{errors.category.message}</Alert>
        )}

        <TextField select label="Wallet" fullWidth {...register("wallet")}>
          {userWallets.map((wallet) => (
            <MenuItem key={wallet.id} value={wallet.name}>
              {wallet.name}
            </MenuItem>
          ))}
        </TextField>
        {errors.wallet && (
          <Alert severity="error">{errors.wallet.message}</Alert>
        )}

        <TextField type="date" label="Date" fullWidth {...register("date")} />
        {errors.date && <Alert severity="error">{errors.date.message}</Alert>}

        <Button type="submit" variant="contained" size="large">
          {editingMode ? "Edit Transaction" : "Add Transaction"}
        </Button>

        {editingMode && (
          <Button type="button" variant="outlined" onClick={openModal}>
            Cancel
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default TransactionForm;
