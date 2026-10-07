import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const IncomeExpenseChart = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const transactions = useSelector((state) => state.transactions.transactions);

  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === currentUser.id,
  );

  const chartData = useMemo(() => {
    const groupedData = {};

    userTransactions
      .filter((transaction) => transaction.category !== "Transfer")
      .forEach((transaction) => {
        const { date, amount, type } = transaction;

        if (!groupedData[date]) {
          groupedData[date] = {
            date,
            income: 0,
            expense: 0,
          };
        }

        if (type === "income") {
          groupedData[date].income += Number(amount);
        }

        if (type === "expense") {
          groupedData[date].expense += Number(amount);
        }
      });

    return Object.values(groupedData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [userTransactions]);

  return chartData.length === 0 ? (
    <Box
      sx={{
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography color="text.secondary">
        No transaction data available
      </Typography>
    </Box>
  ) : (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Line type="monotone" dataKey="income" name="Income" strokeWidth={2} />

        <Line
          type="monotone"
          dataKey="expense"
          name="Expense"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;
