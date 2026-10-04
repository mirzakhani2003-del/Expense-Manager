import { Box, Button, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";
import RecentTransaction from "../components/RecentTransaction";

const Transactions = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Transactions
          </Typography>

          <Typography color="text.secondary">
            Manage your income and expense transactions
          </Typography>
        </Box>

        <Box sx={{ display: "flex", my: 2 }}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => setOpenModal(true)}
            startIcon={<AddIcon />}
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
      </Box>

      <RecentTransaction />
    </>
  );
};

export default Transactions;
