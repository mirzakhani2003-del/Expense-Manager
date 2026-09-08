import { Box, Button, Container, Paper, Typography } from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";

import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}

        <Box
          sx={{
            textAlign: "center",
            mb: 8,
          }}
        >
          <AccountBalanceWalletIcon
            color="primary"
            sx={{
              fontSize: 70,
              mb: 2,
            }}
          />

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "2.5rem",
                md: "4rem",
              },
            }}
          >
            Expense Manager
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mt: 2,
              maxWidth: 650,
              mx: "auto",
            }}
          >
            Take control of your finances and manage your income, expenses, and
            financial goals in one place.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 4,
              flexWrap: "wrap",
            }}
          >
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
            >
              Get Started
            </Button>

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
            >
              Login
            </Button>
          </Box>
        </Box>

        {/* Features */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              textAlign: "center",
            }}
          >
            <TrendingUpIcon color="success" sx={{ fontSize: 40, mb: 1 }} />

            <Typography variant="h6" fontWeight="bold">
              Track Finances
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Track your income and expenses easily.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              textAlign: "center",
            }}
          >
            <CategoryIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />

            <Typography variant="h6" fontWeight="bold">
              Categories
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Organize your transactions with categories.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              textAlign: "center",
            }}
          >
            <BarChartIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />

            <Typography variant="h6" fontWeight="bold">
              Reports
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Understand your spending with useful reports.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              textAlign: "center",
            }}
          >
            <AccountBalanceWalletIcon
              color="warning"
              sx={{ fontSize: 40, mb: 1 }}
            />

            <Typography variant="h6" fontWeight="bold">
              Wallets
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Manage your accounts and wallets in one place.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Landing;
