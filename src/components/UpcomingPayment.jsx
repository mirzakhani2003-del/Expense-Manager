import { Box, Divider, Paper, Typography } from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const UpcomingPayment = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const reminders = useSelector((state) => state.reminders.reminders);

  const userReminders = reminders.filter(
    (reminder) => reminder.userId === currentUser.id,
  );

  const today = new Date().setHours(0, 0, 0, 0);

  const upcomingReminder = userReminders
    .filter((reminder) => {
      const paymentDate = new Date(reminder.nextPaymentDate);
      paymentDate.setHours(0, 0, 0, 0);
      return paymentDate > today;
    })
    .sort(
      (a, b) =>
        new Date(a.nextPaymentDate).getTime() -
        new Date(b.nextPaymentDate).getTime(),
    )
    .slice(0, 3);

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
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Upcoming Payment
      </Typography>

      <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
        Your next scheduled payments
      </Typography>

      {upcomingReminder.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
          No upcoming payment
        </Typography>
      ) : (
        upcomingReminder.map((reminder) => (
          <Fragment key={reminder.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: "medium" }}>
                  {reminder.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Due: {reminder.nextPaymentDate}
                </Typography>
              </Box>

              <Typography sx={{ fontWeight: "bold" }}>
                ${Number(reminder.amount).toLocaleString()}
              </Typography>
            </Box>

            <Divider />
          </Fragment>
        ))
      )}
    </Paper>
  );
};

export default UpcomingPayment;
