import { Box, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import WalletCard from "./WalletCard";

const WalletManager = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const wallets = useSelector((state) => state.wallets.wallets);
  const transactions = useSelector((state) => state.transactions.transactions);

  const userWallets = wallets.filter(
    (wallet) => wallet.userId === currentUser.id,
  );

  const getWalletBalance = (wallet) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.userId === currentUser.id &&
          transaction.wallet === wallet.name,
      )
      .reduce((balance, transaction) => {
        if (transaction.type === "income") {
          return balance + transaction.amount;
        } else {
          return balance - transaction.amount;
        }
      }, 0);
  };

  return (
    <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Wallets
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Manage your wallets
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {userWallets.length === 0 ? (
            <Typography color="text.secondary">No wallets found.</Typography>
          ) : (
            userWallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                balance={getWalletBalance(wallet)}
              />
            ))
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WalletManager;
