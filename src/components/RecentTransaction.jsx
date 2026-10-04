import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TransactionItem from "./TransactionItem";
import FilterTransaction from "./FilterTransaction";
import { useState } from "react";

const defaultTransactionFilter = {
  search: "",
  type: "all",
  category: "all",
  from: "",
  to: "",
};

const RecentTransaction = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const categories = useSelector((state) => state.categories.categories);

  const [filterTransaction, setFilterTransaction] = useState(
    defaultTransactionFilter,
  );

  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === currentUser.id,
  );

  const userCategories = categories.filter(
    (category) => category.userId === currentUser.id,
  );

  const filteredTransaction = userTransactions.filter((transaction) => {
    const search = filterTransaction.search.toLowerCase();
    const matchesSearch =
      transaction.title.toLowerCase().includes(search) ||
      transaction.amount.toString().includes(search);

    const matchesType =
      filterTransaction.type === "all" ||
      transaction.type === filterTransaction.type;

    const matchesCategory =
      filterTransaction.category === "all" ||
      transaction.category === filterTransaction.category;

    const matchesStartDate =
      !filterTransaction.from || transaction.date >= filterTransaction.from;
    const matchesEndDate =
      !filterTransaction.to || transaction.date <= filterTransaction.to;

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  return (
    <Card
      elevation={1}
      sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
    >
      <CardContent>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Your recent transaction.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Search and filter your transactions
          </Typography>
        </Box>

        <FilterTransaction
          categories={userCategories}
          filters={filterTransaction}
          onChange={setFilterTransaction}
          onClear={() => setFilterTransaction(defaultTransactionFilter)}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {filteredTransaction.length} transactions found
          </Typography>

          <Divider sx={{ my: 2 }} />

          {filteredTransaction.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 5 }}>
              <Typography variant="h6" color="text.secondary">
                No transactions found
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                Try changing your search or filters.
              </Typography>
            </Box>
          ) : (
            filteredTransaction.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
