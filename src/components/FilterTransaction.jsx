import { Box, Button, MenuItem, TextField } from "@mui/material";

const FilterTransaction = ({ categories, filters, onChange, onClear }) => {
  const handelChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        fullWidth
        label="Search transaction ..."
        onChange={(event) => handelChange("search", event.target.value)}
        value={filters.search}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          my: 2,
        }}
      >
        <TextField
          select
          label="Type"
          onChange={(event) => handelChange("type", event.target.value)}
          value={filters.type}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </TextField>

        <TextField
          select
          label="Category"
          onChange={(event) => handelChange("category", event.target.value)}
          value={filters.category}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories?.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="From"
          type="date"
          onChange={(event) => handelChange("from", event.target.value)}
          value={filters.from}
        />

        <TextField
          label="To"
          type="date"
          onChange={(event) => handelChange("to", event.target.value)}
          value={filters.to}
        />
      </Box>

      <Button variant="contained" size="large" onClick={onClear}>
        Reset Filter
      </Button>
    </Box>
  );
};

export default FilterTransaction;
