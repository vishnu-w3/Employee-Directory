import React, { useState, useEffect } from "react";
import {
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import EmployeeDialog from "../components/EmployeeDialog";
import ConfirmationDialog from "../components/ConfirmationDialog";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeApi";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const Input = [
    {
      label: "Name",
      key: "name",
      required: true,
      type: "text",
    },
    {
      label: "Age",
      key: "age",
      required: true,
      type: "number",
    },
    {
      label: "DOB",
      key: "dob",
      required: true,
      type: "date",
    },
    {
      label: "Gender",
      key: "gender",
      required: true,
      type: "select",
      options: [
        {
          value: "Male",
          label: "Male",
        },
        {
          value: "Female",
          label: "Female",
        },
        {
          value: "Others",
          label: "Others",
        },
      ],
    },
    {
      label: "Department",
      key: "department",
      required: true,
      type: "text",
    },
  ];
  const fetchData = async () => {
    const response = await fetchEmployees();
    setEmployees(response);

    setColumns(
      Object.keys(response[0]).map((key) => {
        if (key !== "id") {
          return key;
        }
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    setFormData({
      name: "",
      age: "",
      dob: "2022-04-17",
      gender: "",
      department: "",
    });
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleEditClick = (employee) => {
    setFormData(employee);
    setSelectedEmployeeId(employee.id);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedEmployeeId(id);
    setConfirmOpen(true);
  };

  const handleDialogSubmit = async (event) => {
    event.preventDefault();
    if (editMode) {
      await updateEmployee(selectedEmployeeId, formData);
      setAlert({ open: true, message: 'Employee Updated Successfully', severity: 'info' });
    } else {
      await addEmployee(formData);
      setAlert({ open: true, message: 'Employee Added Successfully', severity: 'success' });
    }
    fetchData();
    setDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    await deleteEmployee(selectedEmployeeId);
    setAlert({ open: true, message: 'Employee Deleted Successfully', severity: 'error' });
    fetchData();
    setConfirmOpen(false);
  };

  const handleCloseAlert = () => {
    setAlert({ open: false, message: '', severity: '' });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          margin:5 
        }}
      >
        <Typography variant="h4">Employee Directory</Typography>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add Employee +
        </Button>
      </Box>
      {employees.length === 0 ? (
        <Box mt={2} textAlign="center">
          <Typography>No employees found</Typography>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            mt: 5,
            width: "80%",
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {columns?.map((key, index) => (
                  <TableCell key={index}>{key?.toUpperCase()}</TableCell>
                ))}
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.map((employee, mainIndex) => (
                <TableRow key={mainIndex}>
                  {columns?.map((key, index) => (
                    <TableCell key={index}>{employee[key]}</TableCell>
                  ))}
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditClick(employee)}>
                      <Edit color="primary" />
                    </IconButton></Tooltip>
                    <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteClick(employee.id)}>
                      <Delete color="error" />
                    </IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <EmployeeDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleSubmit={handleDialogSubmit}
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}
        inputFields={Input}
      />
      <ConfirmationDialog
        open={confirmOpen}
        handleClose={() => setConfirmOpen(false)}
        handleConfirm={handleConfirmDelete}
      />
       <Snackbar
        open={alert.open}
        autoHideDuration={3000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeTable;
