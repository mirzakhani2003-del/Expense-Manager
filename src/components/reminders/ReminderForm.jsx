import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ReminderForm = ({ editingReminder, onSubmit, onCancel }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allCategory = useSelector((state) => state.categories.categories);
  const allWallets = useSelector((state) => state.wallets.wallets);

  const userCategories = allCategory.filter(
    (category) => category.userId === currentUser.id,
  );

  const userWallets = allWallets.filter(
    (wallet) => wallet.userId === currentUser.id,
  );

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    walletId: "",
    frequency: "monthly",
    nextPaymentDate: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      category: "",
      walletId: "",
      frequency: "monthly",
      nextPaymentDate: "",
    });
  };

  useEffect(() => {
    if (editingReminder) {
      setFormData({
        title: editingReminder.title,
        amount: editingReminder.amount,
        category: editingReminder.category,
        walletId: editingReminder.walletId,
        frequency: editingReminder.frequency,
        nextPaymentDate: editingReminder.nextPaymentDate,
      });
    } else {
      resetForm();
    }
  }, [editingReminder]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
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
        {editingReminder ? "Edit Recurring Expense" : "Add Recurring Expense"}
      </Typography>

      <Box
        component="form"
        onSubmit={() => onSubmit(formData)}
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
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          required
        >
          {userCategories.map((category) => (
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
          select
          label="Frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </TextField>
        <TextField
          label="Next Payment Date"
          name="nextPaymentDate"
          type="date"
          value={formData.nextPaymentDate}
          onChange={handleChange}
          fullWidth
          required
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Button type="submit" variant="contained" size="large">
          {editingReminder ? "Save Changer" : "Add Reminder"}
        </Button>

        {editingReminder && (<Button type="button" variant="outlined" onClick={onCancel}>Cancel</Button>)}
      </Box>
    </Paper>
  );
};

export default ReminderForm;
