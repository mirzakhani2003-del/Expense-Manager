import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { useTransaction } from "../context/TransactionContext";

const IncomeExpenseChart = () => {
  const { transactions } = useTransaction();

  const chartData = useMemo(() => {
    const groupedData = {};

    transactions.forEach((transaction) => {
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
      (a, b) => new Date(a.date) - new Date(b.date),
    );
  }, [transactions]);

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
          No transaction data available
        </Typography>
      </Box>
    );
  }

  return (
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
