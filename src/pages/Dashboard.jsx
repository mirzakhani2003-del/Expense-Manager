import { Box, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import SummaryCard from "../components/dashboard/SummaryCard";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === currentUser.id,
  );

  const totalIncome = userTransactions
    .filter(
      (transaction) =>
        transaction.type === "income" && transaction.category !== "Transfer",
    )
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = userTransactions
    .filter(
      (transaction) =>
        transaction.type === "expense" && transaction.category !== "Transfer",
    )
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  const savings = balance;

  const savingsRate =
    totalIncome === 0 ? 0 : ((savings / totalIncome) * 100).toFixed(1);

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
          mt: 3,
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
          title="Savings Rate"
          amount={`${savingsRate}%`}
          icon={<SavingsIcon color="secondary" />}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
