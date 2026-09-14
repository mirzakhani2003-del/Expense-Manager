import { Box, Paper, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Fragment } from "react";

const WalletOverview = () => {
  const allWallets = useSelector((state) => state.wallets.wallets);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const transactions = useSelector((state) => state.transactions.transactions);

  const userWallets = allWallets.filter(
    (wallet) => wallet.userId === currentUser.id,
  );

  const getWalletBalance = (walletId) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.userId === currentUser.id &&
          transaction.walletId === walletId,
      )
      .reduce((balance, transaction) => {
        if (transaction.type === "income") {
          return balance + Number(transaction.amount);
        }

        return balance - Number(transaction.amount);
      }, 0);
  };
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Wallet Overview
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {userWallets.length} {userWallets.length === 1 ? "Wallet" : "Wallets"}
      </Typography>

      {userWallets.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3, textAlign: "center" }}>
          No wallets found.
        </Typography>
      ) : (
        userWallets.map((wallet, index) => (
          <Fragment key={wallet.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccountBalanceWalletIcon color="primary" />

                <Typography fontWeight="medium">{wallet.name}</Typography>
              </Box>

              <Typography fontWeight="bold">
                ${getWalletBalance(wallet.id).toLocaleString()}
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
