import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  TextField,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { categoryAction } from "../../redux/slices/categorySlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const categorySchema = yup.object({
  name: yup
    .string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 character"),
});

const CategoryManager = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const currentUserCategories = categories.filter(
    (category) => category.userId === currentUser.id,
  );

  const onSubmit = (data) => {
    const newCategory = {
      id: crypto.randomUUID(),
      name: data.name,
      userId: currentUser.id,
    };

    dispatch(categoryAction.addCategory(newCategory));
    reset();
  };

  const handleDelete = (category) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${category.name} category?`,
    );

    if (!confirm) {
      return null;
    }

    dispatch(categoryAction.deleteCategory(category.id));
  };

  return (
    <Card
      elevation={1}
      sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
    >
      <CardContent>
        <List disablePadding>
          {currentUserCategories.length === 0 ? (
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              No category found
            </Typography>
          ) : (
            currentUserCategories.map((category) => (
              <ListItem
                key={category.id}
                disableGutters
                sx={{
                  px: 1,
                  py: 0.5,
                  mb: 0.5,
                  "&:hover": { backgroundColor: "action.hover" },
                }}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDelete(category)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItem>
            ))
          )}
        </List>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
        >
          <TextField
            fullWidth
            size="small"
            label="New Category"
            {...register("name")}
          />

          <Button type="submit" variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </Box>

        {errors.name && (
          <Alert sx={{ mt: 2 }} severity="error">
            {errors.name.message}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryManager;
