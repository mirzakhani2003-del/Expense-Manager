import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { reminderAction } from "../redux/slices/reminderSlice";
import { useState } from "react";
import ReminderForm from "./ReminderForm";

const ReminderCard = ({ reminder, onMarkAsPaid }) => {
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.wallets.wallets);
  const wallet = wallets.find((wallet) => wallet.name === reminder.wallet);

  const [openModal, setOpenModal] = useState(false);

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

    if (paymentDate.getDate() === today.getDate()) {
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

  const handleDelete = (reminder) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${reminder.name} reminder?`,
    );

    if (!confirm) {
      return null;
    }

    dispatch(reminderAction.deleteReminder(reminder.id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {reminder.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {reminder.category}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Chip label={reminder.frequency} size="small" variant="outlined" />
          <Chip
            label={status.label}
            color={status.color}
            size="small"
            variant="outlined"
          />
          <IconButton size="small" onClick={() => setOpenModal(true)}>
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(reminder)}
          >
            <DeleteIcon />
          </IconButton>

          <Modal
            open={openModal}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClose={() => setOpenModal(false)}
          >
            <Box
              sx={{
                width: 480,
                maxWidth: "100%",
              }}
            >
              <ReminderForm
                initialData={reminder}
                reminderId={reminder.id}
                onClose={() => setOpenModal(false)}
              />
            </Box>
          </Modal>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        ${Number(reminder.amount).toLocaleString()}
      </Typography>

      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Wallet: {wallet ? wallet.name : "Unknow wallet"}
      </Typography>

      <Typography variant="body2" color="text.secondary2">
        Next Payment: {reminder.nextPaymentDate}
      </Typography>

      <Button
        variant="contained"
        startIcon={<CheckCircleIcon />}
        onClick={onMarkAsPaid}
      >
        Mark as Paid
      </Button>
    </Box>
  );
};

export default ReminderCard;
