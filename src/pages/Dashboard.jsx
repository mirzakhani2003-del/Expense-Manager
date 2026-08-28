import { Box, Typography, Grid } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import TransactionForm from "../components/transactions/TransactionForm";
import { useState } from "react";
import { useTransaction } from "../context/TransactionContext";
import CategoryManager from "../components/CategoryManager";

const Dashboard = () => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { transactions } = useTransaction();

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Welcome Back
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Here's your financial overview
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          mt: 2,
        }}
      >
        <SummaryCard
          title="Total Balance"
          amount={`${balance}`}
          icon={<AccountBalanceWalletIcon color="primary" />}
        />
        <SummaryCard
          title="Total Income"
          amount={`${totalIncome}`}
          icon={<TrendingUpIcon color="succes" />}
        />
        <SummaryCard
          title="Total Expenses"
          amount={`${totalExpenses}`}
          icon={<TrendingDownIcon color="error" />}
        />
        <SummaryCard
          title="Savings"
          amount="$4,250"
          icon={<SavingsIcon color="secondary" />}
        />
      </Box>

      <Box
        sx={{
          mt: 4,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <TransactionForm
              editingTransaction={editingTransaction}
              onFinishEdit={() => {
                setEditingTransaction(null);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <CategoryManager />
          </Grid>
        </Grid>

        <RecentTransactions onEdit={setEditingTransaction} />
      </Box>
    </Box>
  );
};

export default Dashboard;
