import { Box, Typography, Card, CardContent } from "@mui/material";
import ExpensePieChart from "../components/ExpensePieChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart";

function Reports() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Reports
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Analyze your financial activity
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: 3,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Expenses by Category
            </Typography>

            <ExpensePieChart />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Income & Expense
            </Typography>

            <IncomeExpenseChart />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Reports;
