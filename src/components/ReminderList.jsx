import { Box, Card, CardContent, Typography } from "@mui/material";
import ReminderCard from "./ReminderCard";
import { useDispatch, useSelector } from "react-redux";
import { transactionAction } from "../redux/slices/transactionSlice";
import { reminderAction } from "../redux/slices/reminderSlice";

const ReminderList = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const reminders = useSelector((state) => state.reminders.reminders);
  const transactions = useSelector((state) => state.transactions.transactions);
  const wallets = useSelector((state) => state.wallets.wallets);

  const userReminders = reminders.filter(
    (reminder) => reminder.userId === currentUser.id,
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

  const onMarkAsPaid = (reminder) => {
    const wallet = wallets.find((wallet) => wallet.name === reminder.wallet);
    const balance = getWalletBalance(wallet);

    if (balance < reminder.amount) {
      alert(
        `Not enough balance in your wallet. Available: $${balance.toLocaleString()}`,
      );

      return;
    }

    const newTransaction = {
      id: crypto.randomUUID(),
      title: reminder.title,
      amount: Number(reminder.amount),
      date: new Date().toISOString().split("T")[0],
      category: reminder.category,
      wallet: reminder.wallet,
      type: "expense",
      userId: currentUser.id,
    };

    dispatch(transactionAction.addTransaction(newTransaction));

    dispatch(reminderAction.markAsPaid(reminder.id));
  };

  return (
    <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Your Reminders
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {userReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onMarkAsPaid={() => onMarkAsPaid(reminder)}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReminderList;
