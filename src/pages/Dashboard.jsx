import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Welcome Back
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Here's your financial overview
      </Typography>
    </Box>
  );
};

export default Dashboard;