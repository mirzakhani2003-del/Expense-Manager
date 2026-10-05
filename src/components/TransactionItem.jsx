import { Box, Typography, Chip, IconButton, Modal } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { transactionAction } from "../redux/slices/transactionSlice";
import TransactionForm from "./TransactionForm";
import { useState } from "react";

const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const isIncome = transaction.type === "income";

  const [openModal, setOpenModal] = useState(false);

  const handleDelete = (transaction) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${transaction.title} transaction?`,
    );

    if (!confirm) {
      return null;
    }

    dispatch(transactionAction.deleteTransaction(transaction.id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid",
        borderRadius: 3,
        borderColor: "divider",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isIncome ? "success.light" : "error.light",
          }}
        >
          {isIncome ? (
            <ArrowUpwardIcon color="success" />
          ) : (
            <ArrowDownwardIcon color="error" />
          )}
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "bold" }}>
            {transaction.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {transaction.date}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip label={transaction.wallet} size="small" />
        <Chip label={transaction.category} size="small" />
        <Typography
          sx={{ fontWeight: "bold" }}
          color={isIncome ? "success.main" : "error.main"}
        >
          {isIncome ? "+" : "-"}${transaction.amount}
        </Typography>

        <IconButton color="primary">
          <EditIcon
            onClick={() => {
              setOpenModal(true);
            }}
          />
        </IconButton>

        <IconButton color="error">
          <DeleteIcon onClick={() => handleDelete(transaction)} />
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
            <TransactionForm
              openModal={() => setOpenModal(false)}
              initialData={transaction}
              transactionId={transaction.id}
            />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default TransactionItem;
