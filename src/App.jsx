import { Box } from "@mui/material";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header />
        <Box sx={{ p: 3 }}>
          <Dashboard />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
