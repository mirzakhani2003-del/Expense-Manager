import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { reminderAction } from "../redux/slices/reminderSlice";
import * as yup from "yup";
import { useEffect, useState } from "react";

const reminderFormSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 character"),
  amount: yup.number().required("Amount is required"),
  category: yup.string().required("Please select a category"),
  wallet: yup.string().required("Please select a wallet"),
  frequency: yup.string().required("Please selecet your frequency payment"),
  nextPaymentDate: yup
    .string()
    .required("Please select your next payment date"),
});

const ReminderForm = ({ initialData, reminderId, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const categories = useSelector((state) => state.categories.categories);
  const wallets = useSelector((state) => state.wallets.wallets);
  const reminders = useSelector((state) => state.reminders.reminders);

  const [editingMode, setEditingMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reminderFormSchema),
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

  const onSubmit = (data) => {
    if (editingMode && reminderId) {
      const reminder = reminders.find((reminder) => reminder.id === reminderId);

      const updatedRemider = {
        ...reminder,
        title: data.title,
        amount: data.amount,
        category: data.category,
        wallet: data.wallet,
        frequency: data.frequency,
        nextPaymentDate: data.nextPaymentDate,
      };

      dispatch(reminderAction.updateReminder(updatedRemider));
      window.alert("Chages saved");
      onClose();
    } else {
      const newReminder = {
        id: crypto.randomUUID(),
        title: data.title,
        amount: data.amount,
        category: data.category,
        wallet: data.wallet,
        frequency: data.frequency,
        nextPaymentDate: data.nextPaymentDate,
        userId: currentUser.id,
      };

      dispatch(reminderAction.addReminder(newReminder));
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
        {editingMode ? "Edit Reminder" : "Add Reccuring Expense"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          fullWidth
          name="title"
          {...register("title")}
        />
        {errors.title && <Alert severity="error">{errors.title.message}</Alert>}

        <TextField
          label="Amount"
          fullWidth
          name="amount"
          {...register("amount")}
        />
        {errors.amount && (
          <Alert severity="error">{errors.amount.message}</Alert>
        )}

        <TextField
          select
          label="Category"
          name="category"
          fullWidth
          {...register("category")}
        >
          {userCategories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        {errors.category && (
          <Alert severity="error">{errors.category.message}</Alert>
        )}

        <TextField
          select
          label="Wallet"
          name="wallet"
          fullWidth
          {...register("wallet")}
        >
          {userWallets.map((wallet) => (
            <MenuItem key={wallet.id} value={wallet.name}>
              {wallet.name}
            </MenuItem>
          ))}
        </TextField>
        {errors.wallet && (
          <Alert severity="error">{errors.wallet.message}</Alert>
        )}

        <TextField
          select
          label="Frequency"
          fullWidth
          name="frequency"
          {...register("frequency")}
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </TextField>
        {errors.frequency && (
          <Alert severity="error">{errors.frequency.message}</Alert>
        )}

        <TextField
          name="nextPaymentDate"
          label="Next Payment Date"
          type="date"
          fullWidth
          {...register("nextPaymentDate")}
        />
        {errors.nextPaymentDate && (
          <Alert severity="error">{errors.nextPaymentDate.message}</Alert>
        )}

        <Button type="submit" variant="contained" size="large">
          {editingMode ? "Edit Reminder" : "Add Reminder"}
        </Button>

        {editingMode && (
          <Button variant="outlined" onClick={onClose} size="large">
            Cancel
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ReminderForm;
