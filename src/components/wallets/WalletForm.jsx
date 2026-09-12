import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const WalletForm = ({ editingWallet, onSubmit, onCancel }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingWallet) {
      setName(editingWallet.name);
    } else {
      setName("");
    }
  }, [editingWallet]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
    });

    setName("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 1,
        mt: 3,
      }}
    >
      <TextField
        fullWidth
        size="small"
        label="Wallet name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button type="submit" variant="contained">
        {editingWallet ? "Update" : "Add"}
      </Button>

      {editingWallet && (
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      )}
    </Box>
  );
};

export default WalletForm;
