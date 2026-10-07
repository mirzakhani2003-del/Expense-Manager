import { Box, Divider, Paper, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const WalletOverview = () => {
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
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Wallet Overview
      </Typography>

      <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
        {userWallets.length} {userWallets.length === 0 ? "Wallet" : "Wallets"}
      </Typography>

      {userWallets.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
          No wallet found
        </Typography>
      ) : (
        userWallets.map((wallet, index) => (
          <Fragment key={wallet.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccountBalanceWalletIcon color="primary" />

                <Typography sx={{ fontWeight: "bold" }}>
                  {wallet.name}
                </Typography>
              </Box>

              <Typography sx={{ fontWeight: "bold" }}>
                ${getWalletBalance(wallet).toLocaleString()}
              </Typography>
            </Box>

            {index < userWallets.length - 1 && <Divider />}
          </Fragment>
        ))
      )}
    </Paper>
  );
};

export default WalletOverview;
