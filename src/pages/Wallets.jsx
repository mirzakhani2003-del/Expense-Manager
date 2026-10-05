import { Box, Button, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PaymentIcon from "@mui/icons-material/Payment";
import { useState } from "react";
import WalletForm from "../components/WalletForm";
import WalletManager from "../components/WalletManager";
import WalletTransfer from "../components/WalletTransfer";

const Wallets = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openTransferModal, setOpenTranseferModal] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Wallets
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Manage your wallets
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <Button
            variant="contained"
            size="medium"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
          >
            Add Wallet
          </Button>

          <Button
            variant="outlined"
            size="medium"
            startIcon={<PaymentIcon />}
            onClick={() => setOpenTranseferModal(true)}
          >
            Transfer
          </Button>

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
              <WalletForm />
            </Box>
          </Modal>

          <Modal
            open={openTransferModal}
            onClose={() => setOpenTranseferModal(false)}
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
              <WalletTransfer />
            </Box>
          </Modal>
        </Box>
      </Box>

      <WalletManager />
    </>
  );
};

export default Wallets;
