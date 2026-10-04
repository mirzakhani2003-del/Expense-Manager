import { Box, Button, Modal, Typography } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";
import RecentTransaction from "../components/RecentTransaction";

const Transactions = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Transactions
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Manage your income and expense transactions
      </Typography>

      <Box sx={{ display: "flex", my: 2 }}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => setOpenModal(true)}
        >
          Add Transaction
        </Button>

        <Modal
          open={openModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClose={() => setOpenModal(false)}
        >
          <Box
            sx={{
              width: 480,
              maxWidth: "100%",
            }}
          >
            <TransactionForm openModal={() => setOpenModal(false)} />
          </Box>
        </Modal>
      </Box>

      <Box sx={{ my: 2 }}>
        <RecentTransaction />
      </Box>
    </Box>
  );
};

export default Transactions;
