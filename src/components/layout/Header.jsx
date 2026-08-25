import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "transparent", color: "text.primary" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Dashboard
        </Typography>

        <Box>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;