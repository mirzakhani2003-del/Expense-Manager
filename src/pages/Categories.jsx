import { Box, Typography } from "@mui/material";
import CategoryManager from "../components/CategoryManager";

const Categories = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Categories
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Manage your transaction categories
      </Typography>

      <CategoryManager />
    </Box>
  );
};

export default Categories;
