import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "../redux/slices/walletSlice";
import * as yup from "yup";
import { useEffect, useState } from "react";

const walletFormSchema = yup.object({
  name: yup
    .string()
    .required("Wallet name is required")
    .min(2, "Wallet name must be at least 2 characters"),
});

const WalletForm = ({ initialData, walletId, openModal }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const wallets = useSelector((state) => state.wallets.wallets);

  const [editingMode, setEditingMode] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(walletFormSchema),
  });

  useEffect(() => {
    if (initialData) {
      (reset(initialData), setEditingMode(true));
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    if (editingMode && walletId) {
      const wallet = wallets.find((wallet) => wallet.id === walletId);

      const updatedWallet = {
        ...wallet,
        name: data.name,
      };

      dispatch(walletActions.updateWallet(updatedWallet));
      alert("Changes Saved");
    } else {
      const newWallet = {
        id: crypto.randomUUID(),
        name: data.name,
        userId: currentUser.id,
      };

      dispatch(walletActions.addWallet(newWallet));
      reset();
    }
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
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        {editingMode ? "Edit Wallet" : "Add Wallet"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField label="Wallet name" fullWidth {...register("name")} />
        {errors.name && <Alert severity="error">{errors.name.message}</Alert>}

        <Button type="submit" variant="contained">
          {editingMode ? "Edit" : "Add"}
        </Button>

        {editingMode && (
          <Button variant="outlined" onClick={openModal}>
            Cancel
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default WalletForm;
