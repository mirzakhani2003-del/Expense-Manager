import { Box, Paper, Typography } from "@mui/material";

const SummaryCard = ({ title, amount, icon }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "Center",
          justifyContent: "space-between",
        }}
      >
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>
        {icon}
      </Box>

      <Typography variant="h4" fontWeigth="bold" sx={{ mt: 2 }}>
        {amount}
      </Typography>
    </Paper>
  );
};

export default SummaryCard;