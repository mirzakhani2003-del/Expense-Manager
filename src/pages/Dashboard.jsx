import { Box, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import SummaryCard from "../components/dashboard/SummaryCard";

const Dashboard = () => {
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
        <SummaryCard title="Total Balance" amount="$4,250" icon={<AccountBalanceWalletIcon color="primary" />} />
        <SummaryCard title="Total Income" amount="$6,800" icon={<TrendingUpIcon color="succes" />} />
        <SummaryCard title="Total Expenses" amount="$2,550" icon={<TrendingDownIcon color="error" />} />
        <SummaryCard title="Savings" amount="$4,250" icon={<SavingsIcon color="secondary" />} />
      </Box>
    </Box>
  );
};

export default Dashboard;
