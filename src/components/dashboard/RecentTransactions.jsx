import { Box, Paper, Typography } from "@mui/material";
import TransactionItem from "./TransactionItem";
import { useTransaction } from "../../context/TransactionContext";

const RecentTransactions = ({ onEdit }) => {
  const { transactions } = useTransaction();

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
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        Recent Transactions
      </Typography>

      <Box>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} onEdit={onEdit} />
        ))}
      </Box>
    </Paper>
  );
};

export default RecentTransactions;
