import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";
import { NotificationsActive } from "@mui/icons-material";
import { Wallet } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Expense Manager
        </Typography>
      </Box>

      <List>
        <ListItemButton
          component={NavLink}
          to="/dashboard"
          onClick={onClose}
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
          onClick={onClose}
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
          onClick={onClose}
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
          onClick={onClose}
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
          onClick={onClose}
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

        <ListItemButton
          component={NavLink}
          to="/reports"
          onClick={onClose}
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
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
