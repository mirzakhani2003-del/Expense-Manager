import { Box, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import { useSelector } from "react-redux";
import SummaryCard from "../components/Dashboard/SummaryCard";
import ExpensePieChart from "../components/Dashboard/ExpensePieChart";
import IncomeExpenseChart from "../components/Dashboard/IncomeExpenseChart";
import WalletOverview from "../components/Dashboard/WalletOverview";
import UpcomingPayment from "../components/Dashboard/UpcomingPayment";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const transactions = useSelector((state) => state.transactions.transactions);

  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === currentUser.id,
  );

  const totalIncome = userTransactions
    .filter(
      (transaction) =>
        transaction.type === "income" && transaction.category !== "Transfer",
    )
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = userTransactions
    .filter(
      (transaction) =>
        transaction.type === "expense" && transaction.category !== "Transfer",
    )
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  const savingsRate =
    totalIncome === 0 ? 0 : ((balance / totalIncome) * 100).toFixed(1);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Welcome Back
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
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
          gap: 1,
        }}
      >
        <SummaryCard
          title="Total Balance"
          amount={balance}
          icon={<AccountBalanceWalletIcon />}
        />
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          icon={<TrendingUpIcon />}
        />
        <SummaryCard
          title="Total Expense"
          amount={totalExpense}
          icon={<TrendingDownIcon />}
        />
        <SummaryCard
          title="Savings Rate"
          amount={savingsRate}
          icon={<SavingsIcon />}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Financial Analytics
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              sm: "1fr",
              lg: "repeat(2, 1fr)",
            },
            gap: 2,
          }}
        >
          <Box
            sx={{
              border: "1px Solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Expense by category
            </Typography>

            <ExpensePieChart />
          </Box>

          <Box
            sx={{
              border: "1px Solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Income vs Expenses
            </Typography>

            <IncomeExpenseChart />
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <WalletOverview />
      </Box>

      <Box sx={{ mt: 2 }}>
        <UpcomingPayment />
      </Box>
    </Box>
  );
};

export default Dashboard;
