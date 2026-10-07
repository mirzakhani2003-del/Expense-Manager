import { Box, Paper, Typography } from "@mui/material";

const SummaryCard = ({ title, amount, icon }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        borderRadius: 3,
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
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        {icon}
      </Box>

      <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
        {amount}
      </Typography>
    </Paper>
  );
};

export default SummaryCard;
