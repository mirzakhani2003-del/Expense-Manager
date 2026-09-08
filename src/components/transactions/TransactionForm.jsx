import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionActions } from "../../redux/transactionSlice";

const TransactionForm = ({ editingTransaction, onFinishEdit }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: "",
    });
  };

  useEffect(() => {
    if (editingTransaction) {
      console.log(editingTransaction);
      setFormData({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        category: editingTransaction.category,
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

    const transactionData = {
      ...formData,
      amount: Number(formData.amount),
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
            <MenuItem key={category} value={category}>
              {category}
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
