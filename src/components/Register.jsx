import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { authAction } from "../redux/slices/authSlice";

const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 character"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 character"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Password does not match"),
});

const Register = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    try {
      const existingUser = users.find(
        (user) => user.email.toLowerCase() === data.email.toLowerCase(),
      );

      if (existingUser) {
        throw new Error("An account with this email already exists !");
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        password: data.password,
      };

      dispatch(authAction.register(newUser));
      dispatch(authAction.login(newUser));
    } catch (error) {
      if (error instanceof Error) {
        setError("email", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Create Account
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 3, textAlign: "center" }}
        >
          Create an account to manage your finances
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField label="Name" fullWidth {...register("name")} />
          {errors.name && <Alert severity="error">{errors.name.message}</Alert>}

          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
          />
          {errors.email && (
            <Alert severity="error">{errors.email.message}</Alert>
          )}

          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password")}
          />
          {errors.password && (
            <Alert severity="error">{errors.password.message}</Alert>
          )}

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <Alert severity="error">{errors.confirmPassword.message}</Alert>
          )}

          <Button type="submit" variant="contained" size="large">
            Create Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
