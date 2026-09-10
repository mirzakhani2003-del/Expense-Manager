import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import TransactionItem from "./TransactionItem";
import { useSelector } from "react-redux";
import { useState } from "react";

const RecentTransactions = ({ onEdit }) => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const allCategories = useSelector((state) => state.categories.categories);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const categories = allCategories.filter(
    (category) => category.userId === currentUser.id,
  );

  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === currentUser.id,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTransactions = userTransactions.filter((transaction) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      transaction.title.toLowerCase().includes(search) ||
      transaction.amount.toString().includes(search);

    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    const matchesCategory =
      categoryFilter === "all" || transaction.category === categoryFilter;

    const matchesStartDate = !startDate || transaction.date >= startDate;
    const matchesEndDate = !endDate || transaction.date <= endDate;

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  const resetFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Card>
      <CardContent
        sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Recent Transactions
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Search and filter your transactions
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Search transactions"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>

              <Select
                value={typeFilter}
                label="Type"
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>

              <Select
                value={categoryFilter}
                label="Category"
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>

                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              label="From"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              label="To"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {filteredTransactions.length} transactions found
          </Typography>

          <Button variant="outlined" onClick={() => resetFilters()}>
            Reset Filters
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {filteredTransactions.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No transactions found
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
              Try changing your search or filters.
            </Typography>
          </Box>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
