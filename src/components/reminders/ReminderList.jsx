import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ReminderCard from "./ReminderCard";

const ReminderList = ({ onDelete, onEdit, onMarkAsPaid }) => {
  const allReminders = useSelector((state) => state.reminders.reminders);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const userReminders = allReminders.filter(
    (reminder) => reminder.userId === currentUser.id,
  );

  if (userReminders.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h6" color="text.secondary">
          No reminders found
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Add a recurring expense to get started;
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
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
            onDelete={onDelete}
            onEdit={onEdit}
            onMarkAsPaid={onMarkAsPaid}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ReminderList;
