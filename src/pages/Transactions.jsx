import { useState } from "react";
import { Box, Typography } from "@mui/material";
import TransactionForm from "../components/transactions/TransactionForm";
import RecentTransactions from "../components/dashboard/RecentTransactions";

function Transactions() {
  const [editingTransaction, setEditingTransaction] = useState(null);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Transactions
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Manage your income and expenses
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        <TransactionForm
          editingTransaction={editingTransaction}
          onFinishEdit={() => {
            setEditingTransaction(null);
          }}
        />

        <RecentTransactions onEdit={setEditingTransaction} />
      </Box>
    </Box>
  );
}

export default Transactions;
