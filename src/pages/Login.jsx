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
import { Link, useNavigate } from "react-router-dom";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 character"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    try {
      console.log(users);
      const existingUser = users.find(
        (user) =>
          user.email.toLowerCase() === data.email.toLowerCase() &&
          user.password === data.password,
      );

      console.log(existingUser);

      if (!existingUser) {
        throw new Error("Invalid email or password !");
      }

      dispatch(authAction.login(existingUser));
      navigate("/dashboard");
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
          Welcome back
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 3, textAlign: "center" }}
        >
          Login to manage your finances
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <Button type="submit" variant="contained" size="large">
            Login
          </Button>
        </Box>

        {errors.root && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errors.root.message}
          </Alert>
        )}

        <Typography variant="body2" sx={{mt: 3, textAlign: "center"}}>
          Dont have an account? <Link to="/register">Create Account</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
