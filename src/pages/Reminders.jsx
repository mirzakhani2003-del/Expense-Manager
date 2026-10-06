import { Box, Button, Modal, Typography } from "@mui/material";
import ReminderForm from "../components/ReminderForm";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ReminderList from "../components/ReminderList";

const Reminders = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Reminders
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Manage your recurring and payment reminders
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            size="medium"
            onClick={() => setOpenModal(true)}
            startIcon={<AddIcon />}
          >
            Add Reminder
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
              <ReminderForm />
            </Box>
          </Modal>
        </Box>
      </Box>

      <ReminderList />
    </>
  );
};

export default Reminders;
