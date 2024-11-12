import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, updateUser } from '../api/userApi';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
  });
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching users.');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setUpdatedUser({
      name: user.name,
      email: user.email,
    });
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setUpdatedUser({
      name: '',
      email: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await updateUser(id, updatedUser);
      setUsers(users.map((user) => (user._id === id ? { ...user, ...updatedUser } : user)));
      setEditUserId(null);
    } catch (error) {
      setError('Error updating user.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
      setConfirmDelete(null);
    } catch (error) {
      setError('Error deleting user.');
    }
  };

  const openDeleteDialog = (userId) => {
    setConfirmDelete(userId);
  };

  const closeDeleteDialog = () => {
    setConfirmDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (confirmDelete) {
      handleDelete(confirmDelete);
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '20px' }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-blue-500 p-8">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Management System
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Link to="/login">
              <Button variant="contained" sx={{ marginRight: 1, backgroundColor: 'blue' }}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="contained" sx={{ backgroundColor: 'green' }}>
                Register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#fff' }} gutterBottom>
            Student List
          </Typography>
          {error && (
            <Typography variant="h6" color="error" align="center">
              {error}
            </Typography>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Name
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Email
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell component="th" scope="row">
                      {editUserId === user._id ? (
                        <TextField
                          variant="outlined"
                          name="name"
                          value={updatedUser.name}
                          onChange={handleChange}
                          fullWidth
                        />
                      ) : (
                        user.name
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {editUserId === user._id ? (
                        <TextField
                          variant="outlined"
                          name="email"
                          value={updatedUser.email}
                          onChange={handleChange}
                          fullWidth
                        />
                      ) : (
                        user.email
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editUserId === user._id ? (
                        <>
                          <Button
                            onClick={() => handleUpdate(user._id)}
                            variant="contained"
                            color="primary"
                            sx={{
                              marginRight: 1,
                              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                              '&:hover': {
                                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
                              },
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="outlined"
                            color="default"
                            sx={{
                              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                              '&:hover': {
                                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
                              },
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <Button
                            onClick={() => handleEdit(user)}
                            variant="contained"
                            color="secondary"
                            sx={{
                              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                              '&:hover': {
                                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
                              },
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => openDeleteDialog(user._id)}
                            variant="contained"
                            color="error"
                            sx={{
                              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                              '&:hover': {
                                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
                              },
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>

      <Dialog open={!!confirmDelete} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
