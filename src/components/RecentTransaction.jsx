import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TransactionItem from "./TransactionItem";

const RecentTransaction = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === currentUser.id,
  );

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
        </Box>

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
            {userTransactions.length} transactions found
          </Typography>

          <Divider sx={{ my: 2 }} />

          {userTransactions.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 5 }}>
              <Typography variant="h6" color="text.secondary">
                No transactions found
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                Try changing your search or filters.
              </Typography>
            </Box>
          ) : (
            userTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
              />
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
