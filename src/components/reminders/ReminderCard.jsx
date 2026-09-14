import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Button
} from "@mui/material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ReminderCard = ({ reminder, onDelete, onEdit, onMarkAsPaid }) => {
  const allWallets = useSelector((state) => state.wallets.wallets);
  const wallet = allWallets.find((wallet) => wallet.id === reminder.walletId);

  const getReminderStatus = () => {
    const today = new Date();
    const paymentDate = new Date(reminder.nextPaymentDate);

    today.setHours(0, 0, 0, 0);
    paymentDate.setHours(0, 0, 0, 0);

    if (paymentDate < today) {
      return {
        label: "Overdue",
        color: "error",
      };
    }

    if (paymentDate.getTime() === today.getTime()) {
      return {
        label: "Due Today",
        color: "warning",
      };
    }

    return {
      label: "Upcoming",
      color: "success",
    };
  };

  const status = getReminderStatus();

  return (
    <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {reminder.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {reminder.category}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip label={reminder.frequency} size="small" variant="outlined" />
            <Chip label={status.label} color={status.color} size="small" />
            <IconButton size="small" onClick={() => onEdit(reminder)}>
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(reminder.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
          ${Number(reminder.amount).toLocaleString()}
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
          Wallet: {wallet ? wallet.name : "Unknow wallet"}
        </Typography>

        <Typography variant="body2" color="text.secondary2" sx={{ mt: 2 }}>
          Next Payment: {reminder.nextPaymentDate}
        </Typography>

        <Button
          variant="contained"
          startIcon={<CheckCircleIcon />}
          onClick={() => onMarkAsPaid(reminder)}
        >
          Mark as Paid
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReminderCard;
