import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CategoryIcon from "@mui/icons-material/Category";
import { NavLink } from "react-router-dom";
import { NotificationsActive, Wallet } from "@mui/icons-material";

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Expense Manager
        </Typography>
      </Box>

      <List>
        <ListItemButton
          component={NavLink}
          to="/dashboard"
          sx={{
            mx: 1,
            mb: 0.5,
            borderRadius: 2,
            "&.active": {
              backgroundColor: "primary.main",
              color: "white",

              "& .MuiListItemIcon-root": {
                color: "white",
              },
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/transactions"
          sx={{
            mx: 1,
            mb: 0.5,
            borderRadius: 2,
            "&.active": {
              backgroundColor: "primary.main",
              color: "white",

              "& .MuiListItemIcon-root": {
                color: "white",
              },
            },
          }}
        >
          <ListItemIcon>
            <ReceiptLongIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/wallets"
          sx={{
            mx: 1,
            mb: 0.5,
            borderRadius: 2,
            "&.active": {
              backgroundColor: "primary.main",
              color: "white",

              "& .MuiListItemIcon-root": {
                color: "white",
              },
            },
          }}
        >
          <ListItemIcon>
            <Wallet />
          </ListItemIcon>
          <ListItemText primary="Wallets" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/categories"
          sx={{
            mx: 1,
            mb: 0.5,
            borderRadius: 2,
            "&.active": {
              backgroundColor: "primary.main",
              color: "white",

              "& .MuiListItemIcon-root": {
                color: "white",
              },
            },
          }}
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>

        <ListItemButton
          component={NavLink}
          to="/reminders"
          sx={{
            mx: 1,
            mb: 0.5,
            borderRadius: 2,
            "&.active": {
              backgroundColor: "primary.main",
              color: "white",

              "& .MuiListItemIcon-root": {
                color: "white",
              },
            },
          }}
        >
          <ListItemIcon>
            <NotificationsActive />
          </ListItemIcon>
          <ListItemText primary="Reminders" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
