import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/authSlice";
import { useState } from "react";

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/transactions": "Transactions",
    "/categories": "Categories",
    "/reports": "Reports",
  };

  const pageTitle = pageTitles[location.pathname] || "Expense Manager";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
              mr: 1,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
              },
            }}
          >
            {pageTitle}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {currentUser ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar>{currentUser.name.charAt(0).toUpperCase()}</Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography fontWeight="bold">
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
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/login")}>Login</Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
