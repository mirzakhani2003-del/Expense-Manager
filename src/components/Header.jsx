import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { authAction } from "../redux/slices/authSlice";

const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/transactions": "Transactions",
    "/wallets": "Wallets",
    "/categories": "Categories",
    "/reminders": "Reminders",
    "/reports": "Reports",
  };

  const pageTitle = pageTitles[location.pathname] || "Expense Manager";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authAction.logout());
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        background: "transparent",
        color: "text.secondary",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={onMenuClick}
            sx={{ display: { xs: "inline-flex", md: "none" }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, fontWeight: "bold" }}
          >
            {pageTitle}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton>
            <Badge color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMenuOpen}>
            <Avatar>{currentUser.name.charAt(0).toUpperCase()}</Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {currentUser.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {currentUser.email}
              </Typography>
            </Box>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
