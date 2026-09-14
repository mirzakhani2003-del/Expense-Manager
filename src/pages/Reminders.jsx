import { Box, Typography } from "@mui/material";
import ReminderForm from "../components/reminders/ReminderForm";
import ReminderList from "../components/reminders/ReminderList";
import { useDispatch, useSelector } from "react-redux";
import { reminderActions } from "../redux/reminderSlice";
import { transactionActions } from "../redux/transactionSlice";
import { useState } from "react";

const Reminders = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const transactions = useSelector((state) => state.transactions.transactions);

  const [editingReminder, setEditingReminder] = useState(null);

  const handleDeleteReminder = (reminderId) => {
    dispatch(reminderActions.deleteReminder(reminderId));
  };

  const handleSubmitReminder = (reminderDate) => {
    if (editingReminder) {
      dispatch(
        reminderActions.updateReminder({
          id: editingReminder.id,
          updatedReminder: reminderDate,
        }),
      );

      setEditingReminder(null);
    } else {
      dispatch(
        reminderActions.addReminder({
          ...reminderDate,
          userId: currentUser.id,
        }),
      );
    }
  };

  const handleEditReminder = (reminder) => {
    setEditingReminder(reminder);
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

  const getNextPaymentDate = (date, frequency) => {
    const nextDate = new Date(date);

    if (frequency === "weekly") {
      nextDate.setDate(nextDate.getDate() + 7);
    }

    if (frequency === "monthly") {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }

    return nextDate.toISOString().split("T")[0];
  };

  const handleMarkAsPaid = (reminder) => {
    const walletBalance = getWalletBalance(reminder.walletId);

    if (walletBalance < reminder.amount) {
      alert(
        `Not enough balance in your wallet. Available: $${walletBalance.toLocaleString()}`,
      );

      return;
    }

    dispatch(
      transactionActions.addTransaction({
        title: reminder.title,
        amount: Number(reminder.amount),
        type: "expense",
        category: reminder.category,
        walletId: reminder.walletId,
        userId: currentUser.id,
        date: new Date().toISOString().split("T")[0],
      }),
    );

    const nextPaymentDate = getNextPaymentDate(
      reminder.nextPaymentDate,
      reminder.frequency,
    );

    dispatch(
      reminderActions.updateReminder({
        id: reminder.id,
        updatedReminder: {
          nextPaymentDate,
        },
      }),
    );
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Reminders
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Manage your recurring and payment reminders
      </Typography>

      <Box sx={{ mt: 3 }}>
        <ReminderForm
          editingReminder={editingReminder}
          onSubmit={handleSubmitReminder}
          onCancel={() => setEditingReminder(null)}
        />
      </Box>

      <ReminderList
        onDelete={handleDeleteReminder}
        onEdit={handleEditReminder}
        onMarkAsPaid={handleMarkAsPaid}
      />
    </Box>
  );
};

export default Reminders;
