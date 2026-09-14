import { Box, Divider, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const UpcomingPayments = () => {
  const reminders = useSelector((state) => state.reminders.reminders);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const userReminders = reminders.filter(
    (reminder) => reminder.userId === currentUser.id,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingReminders = userReminders
    .filter((reminder) => {
      const paymentDate = new Date(reminder.nextPaymentDate);
      paymentDate.setHours(0, 0, 0, 0);

      return paymentDate > today;
    })
    .sort((a, b) => new Date(a.nextPaymentDate) - new Date(b.nextPaymentDate))
    .slice(0, 3);

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
      <Typography variant="h6" fontWeight="bold">
        Upcoming Payments
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Your next scheduled payments
      </Typography>

      {upcomingReminders.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
          No upcoming payments.
        </Typography>
      ) : (
        upcomingReminders.map((reminder) => (
          <>
            <Box
              key={reminder.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
              }}
            >
              <Box>
                <Typography fontWeight="medium">{reminder.title}</Typography>

                <Typography variant="body2" color="text.secondary">
                  Due: {reminder.nextPaymentDate}
                </Typography>
              </Box>

              <Typography fontWeight="bold">
                ${Number(reminder.amount).toLocaleString()}
              </Typography>
            </Box>

            <Divider />
          </>
        ))
      )}
    </Paper>
  );
};

export default UpcomingPayments;
