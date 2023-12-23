"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Typography,
} from '@mui/material';

const roles = ['admin', 'user'];

const UpdateUser = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState<any>({
    role: '',
    username: '',
    name: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        if (userId) {
          const response = await fetch(`http://localhost:3001/api/users/${userId}`);
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            formik.setValues({
              role: userData.role || '',
              username: userData.username || '',
              name: userData.name || '',
              password: '',
            });
          } else {
            throw new Error('Failed to fetch user data');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
  
    fetchUserData();
  }, []);

  const formik = useFormik({
    initialValues: {
      role: user.role || '',
      username: user.username || '',
      name: user.name || '',
      password: '',
    },
    
    onSubmit: async (values) => {
      try {
        const url = `http://localhost:3001/api/users/update/${user.username}`;
        const response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(user.name);

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        setSuccessMessage('User Updated Successfully');
        setTimeout(() => {
          setSuccessMessage('');
          router.push('/users');
        }, 2000);
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.role) {
        errors.role = 'Role is required';
      }
      if (!values.username) {
        errors.username = 'Username is required';
      }
      if (!values.name) {
        errors.name = 'Name is required';
      } else if (/\d/.test(values.name)) {
        errors.name = 'Name must not contain numbers';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/.test(values.password)) {
        errors.password =
          'Password must contain at least 8 characters with at least one uppercase letter, one lowercase letter, and one number.';
      }
      return errors;
    },
  });

  useEffect(() => {
    formik.setValues({
      role: user.role || '',
      username: user.username || '',
      name: user.name || '',
      password: '',
    });
  }, [user]);

  return (
    <Container maxWidth="sm" className="w-full p-8">
      <Typography variant="h4" align="center" gutterBottom>
        Update User
      </Typography>
      {successMessage && (
        <div style={{ textAlign: 'center', color: 'green', marginBottom: '10px' }}>
          {successMessage}
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className="mt-4"
          fullWidth
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <TextField
          className="mt-4"
          fullWidth
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <Button type="submit" fullWidth>
          Update
        </Button>
      </form>
    </Container>
  );
};

export default UpdateUser;
