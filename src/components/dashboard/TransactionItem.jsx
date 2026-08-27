import { Box, Typography, Chip, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTransaction } from "../../context/TransactionContext";

const TransactionItem = ({ transaction, onEdit }) => {
  const isIncome = transaction.type === "income";
  const { deleteTransaction } = useTransaction();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
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
          <Typography fontWeight="bold">{transaction.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {transaction.date}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip label={transaction.category} size="small" />
        <Typography fontWeight="bold" color={isIncome ? "success.main" : "error.main"}>{isIncome ? "+" : "-"}${transaction.amount}</Typography>
        
        <IconButton color="primary" onClick={() => onEdit(transaction)}>
          <EditIcon />
        </IconButton>
        
        <IconButton color="error" onClick={() => deleteTransaction(transaction.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TransactionItem;