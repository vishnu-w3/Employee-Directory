import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const EmployeeDialog = ({ open, handleClose, handleSubmit, formData, setFormData, editMode, inputFields,}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          margin: "auto",
        }}
      >
        <DialogTitle>{editMode ? "Edit Employee" : "Add Employee"}</DialogTitle>
        <DialogContent>
          {inputFields?.map((input) => {
            if (input.type === "text"||input.type === "number") {
              return (
                <TextField
                  margin="dense"
                  label={input?.label}
                  name={input?.key}
                  id={input?.key}
                  fullWidth
                  required={input?.required}
                  value={formData[input?.key]}
                  type={input?.type}
                  onChange={handleInputChange}
                >
                </TextField>
              );
            } else if (input.type === "select") {
              return (
                <TextField
                  margin="dense"
                  select
                  label={input?.label}
                  name={input?.key}
                  id={input?.key}
                  fullWidth
                  required={input?.required}
                  value={formData[input?.key]}
                  onChange={handleInputChange}
                >
                  {input?.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            } else if (input?.type === "date") {
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={input?.label}
                    format="YYYY-MM-DD"
                    value={dayjs(formData[input?.key])}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "dense",
                        required: input?.required,
                      },
                    }}
                    onChange={(newValue) => {
                      handleInputChange({
                        target: {
                          name: input?.key,
                          value: newValue.format("YYYY-MM-DD"),
                        },
                      });
                    }}
                  />
                </LocalizationProvider>
              );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {editMode ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EmployeeDialog;
