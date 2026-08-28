import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { useTransaction } from "../context/TransactionContext";

const Dashboard = () => {
  const { transactions } = useTransaction();

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const savings = totalIncome - totalExpenses;

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
          amount={`${savings.toLocaleString()}`}
          icon={<SavingsIcon color="secondary" />}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
