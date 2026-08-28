import { AppBar, Typography, IconButton, Toolbar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/categories": "Categories",
    "/reports": "Reports",
  };

  const pageTitle = pageTitles[location.pathname] || "Expense Manager";

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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
