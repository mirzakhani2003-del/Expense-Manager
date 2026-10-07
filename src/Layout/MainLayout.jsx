import { Box } from "@mui/material";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar open={mobileOpen} onClose={handleToggleDrawer} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: "100%",
            md: "calc(100% - 240px)",
          },
          minWidth: 0,
        }}
      >
        <Header onMenuClick={handleToggleDrawer} />

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
