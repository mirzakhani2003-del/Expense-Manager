import React, { useState } from "react";
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
import { useCategory } from "../context/CategoryContext";

const CategoryManager = () => {
  const [categoryName, setCategoryName] = useState("");
  const { categories, addCategory, deleteCategory } = useCategory();

  const handleAdd = () => {
    if (!categoryName.trim()) return;

    addCategory(categoryName);
    setCategoryName("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
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
                key={category}
                disableGutters
                sx={{
                  px: 1,
                  py: 0.5,
                  mb: 0.5,
                  borderRadius: 1,
                  "&.hover": { backgroundColor: "action.hover" },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => deleteCategory(category)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={category} />
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
              onKeyDown={handleKeyDown}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
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
