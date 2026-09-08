import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { authActions } from "../redux/authSlice";
import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const user = users.find(
      (user) =>
        user.email.toLowerCase() === formData.email.toLowerCase() &&
        user.password === formData.password,
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    dispatch(authActions.login(user));
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Welcome Back
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 1, mb: 3 }}
        >
          Login to manage your finances
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />

          <Button type="submit" variant="contained" size="large">
            Login
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
          Don't have an account? <Link to="/register">Create Account</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
