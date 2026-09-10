import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../redux/categorySlice";

const CategoryManager = () => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories.categories);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const categories = allCategories.filter(
    (category) => category.userId === currentUser.id,
  );

  const handleAdd = () => {
    if (!categoryName.trim()) return;

    dispatch(
      categoryActions.addCategory({
        name: categoryName,
        userId: currentUser.id,
      }),
    );

    setCategoryName("");
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Categories
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your transaction categories
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {categories.length} categories
              </Typography>
            </Box>
            <AddIcon />
          </Box>

          <Divider sx={{ my: 2 }} />

          <List disablePadding>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                disableGutters
                sx={{
                  px: 1,
                  py: 0.5,
                  mb: 0.5,
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "action.hover" },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() =>
                      dispatch(categoryActions.deleteCategory(category.id))
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>

          <Box display="flex" gap={1} mt={2}>
            <TextField
              fullWidth
              size="small"
              label="New Category"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{ mt: 1 }}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryManager;
