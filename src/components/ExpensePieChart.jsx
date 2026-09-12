import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const ExpensePieCharts = () => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A855F7",
    "#EF4444",
  ];

  const transactions = useSelector((state) => state.transactions.transactions);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === currentUser.id,
  );

  const chartData = useMemo(() => {
    const realExpenses = userTransactions.filter(
      (transaction) =>
        transaction.type === "expense" && transaction.category !== "Transfer",
    );

    const categoryTotals = {};

    realExpenses.forEach((transaction) => {
      if (categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] += Number(transaction.amount);
      } else {
        categoryTotals[transaction.category] = Number(transaction.amount);
      }
    });

    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
    }));
  }, [userTransactions]);

  if (chartData.length === 0) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">
          No expense data available
        </Typography>
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieCharts;
