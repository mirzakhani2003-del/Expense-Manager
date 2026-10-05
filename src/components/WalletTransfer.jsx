import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { transactionAction } from "../redux/slices/transactionSlice";

const transferFormSchema = yup.object({
  from: yup.string().required("Please selcet your source wallet"),
  to: yup.string().required("Please select your destination wallet"),
  amount: yup.number().required("Please enter the amount"),
});

const WalletTransfer = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const wallets = useSelector((state) => state.wallets.wallets);
  const transactions = useSelector((state) => state.transactions.transactions);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transferFormSchema),
  });

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

  const onSubmit = (data) => {
    try {
      if (data.from === data.to) {
        throw new Error("Source and destination wallets cannot be the same.");
      }

      const fromWallet = wallets.find((wallet) => wallet.name === data.from);
      const balance = getWalletBalance(fromWallet);

      console.log(fromWallet);

      if (data.amount > balance) {
        throw new Error(
          `Not enough balance. Available: $${balance.toLocaleString()}`,
        );
      }

      const expenseTransaction = {
        id: crypto.randomUUID(),
        title: `Transfer to wallet ${data.to}`,
        amount: data.amount,
        type: "expense",
        category: "Transfer",
        wallet: data.from,
        userId: currentUser.id,
        date: new Date().toISOString().split("T")[0],
      };

      dispatch(transactionAction.addTransaction(expenseTransaction));

      const incomeTransaction = {
        id: crypto.randomUUID(),
        title: `Transfer from wallet ${data.from}`,
        amount: data.amount,
        type: "income",
        category: "Transfer",
        wallet: data.to,
        userId: currentUser.id,
        date: new Date().toISOString().split("T")[0],
      };

      dispatch(transactionAction.addTransaction(incomeTransaction));

      reset();
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        my: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        Transfer Money
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField select label="From" fullWidth {...register("from")}>
          {userWallets.map((wallet) => (
            <MenuItem key={wallet.id} value={wallet.name}>
              {wallet.name}
            </MenuItem>
          ))}
        </TextField>
        {errors.from && <Alert severity="error">{errors.from.message}</Alert>}

        <TextField select label="To" fullWidth {...register("to")}>
          {userWallets.map((wallet) => (
            <MenuItem key={wallet.id} value={wallet.name}>
              {wallet.name}
            </MenuItem>
          ))}
        </TextField>
        {errors.to && <Alert severity="error">{errors.to.message}</Alert>}

        <TextField label="Amount" fullWidth {...register("amount")} />
        {errors.amount && (
          <Alert severity="error">{errors.amount.message}</Alert>
        )}

        {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

        <Button type="submit" variant="contained">
          Confirm Transfer
        </Button>
      </Box>
    </Paper>
  );
};

export default WalletTransfer;
