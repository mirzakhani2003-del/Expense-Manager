import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const WalletCard = ({ wallet, balance, onDelete, onEdit }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        mb: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {wallet.name}
          </Typography>

          <Box>
            <IconButton onClick={() => onEdit(wallet)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => onDelete(wallet.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h5" sx={{ mt: 2 }} fontWeight="bold">
          ${balance.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
