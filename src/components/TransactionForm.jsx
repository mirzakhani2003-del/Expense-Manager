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
});

const TransactionForm = ({ initialData, transactionId, openModal }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const transactions = useSelector((state) => state.transactions.transactions);

  const [editingMode, setEditingMode] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
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

  const onSubmit = (data) => {
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
        type: data.type,
        userId: currentUser.id,
      };

      dispatch(transactionAction.addTransaction(newTransaction));
      reset();
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
