import { Box, IconButton, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "../../redux/slices/walletSlice";
import { useState } from "react";
import WalletForm from "./WalletForm";

const WalletCard = ({ wallet, balance }) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);

  const [openModal, setOpenModal] = useState(false);

  const onDelete = (wallet) => {
    const walletTransactions = transactions.filter(
      (transaction) => transaction.wallet === wallet.name,
    );

    if (walletTransactions.length > 0) {
      alert("This wallet has transactions and cannot be deleted.");
      return;
    }

    const confirm = window.confirm(
      `Are you sure you want to delete ${wallet.name} wallet?`,
    );

    if (!confirm) {
      return null;
    }

    dispatch(walletActions.deleteWallet(wallet.id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {wallet.name}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton color="primary" onClick={() => setOpenModal(true)}>
          <EditIcon />
        </IconButton>

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 480,
              maxWidth: "100%",
            }}
          >
            <WalletForm
              initialData={wallet}
              walletId={wallet.id}
              openModal={() => setOpenModal(false)}
            />
          </Box>
        </Modal>

        <IconButton color="error" onClick={() => onDelete(wallet)}>
          <DeleteIcon />
        </IconButton>

        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          ${balance}
        </Typography>
      </Box>
    </Box>
  );
};

export default WalletCard;
