import { Box, Card, CardContent, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { walletActions } from "../../redux/walletSlice";
import WalletCard from "./WalletCard";
import WalletForm from "./WalletForm";
import TransferForm from "./TransferForm";

const WalletManager = () => {
  const dispatch = useDispatch();

  const wallets = useSelector((state) => state.wallets.wallets);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const transactions = useSelector((state) => state.transactions.transactions);

  const userWallets = wallets.filter(
    (wallet) => wallet.userId === currentUser.id,
  );

  const [editingWallet, setEditingWallet] = useState(null);

  const handleDelete = (walletId) => {
    const walletTransactions = transactions.filter(
      (transaction) => transaction.walletId === walletId,
    );

    if (walletTransactions.length > 0) {
      alert("This wallet has transactions and cannot be deleted.");

      return;
    }

    dispatch(walletActions.deleteWallet(walletId));
  };

  const handleSubmitWallet = (walletData) => {
    if (editingWallet) {
      dispatch(
        walletActions.updateWallet({
          id: editingWallet.id,
          updatedWallet: walletData,
        }),
      );

      setEditingWallet(null);
    } else {
      dispatch(
        walletActions.addWallet({
          ...walletData,
          userId: currentUser.id,
        }),
      );
    }
  };

  const getWallateBalance = (walletId) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.userId === currentUser.id &&
          transaction.walletId === walletId,
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
        <Typography variant="h6" fontWeigth="bold">
          Wallets
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Manage your wallets
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              lg: "repeat(3,1fr)",
            },
            gap: 2,
          }}
        >
          {userWallets.length === 0 ? (
            <Typography color="text.secondary">No wallets found.</Typography>
          ) : (
            userWallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                balance={getWallateBalance(wallet.id)}
                onDelete={handleDelete}
                onEdit={setEditingWallet}
              />
            ))
          )}
        </Box>

        <WalletForm
          editingWallet={editingWallet}
          onSubmit={handleSubmitWallet}
          onCancel={() => setEditingWallet(null)}
        />

        <TransferForm />
      </CardContent>
    </Card>
  );
};

export default WalletManager;
