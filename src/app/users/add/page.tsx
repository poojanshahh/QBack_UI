"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Container, Typography } from '@mui/material';
import { UserModel } from './UserModel';

const roles = ['admin', 'user'];

export default function AddUser() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  
  const formik = useFormik({
    initialValues: {
      role: '',
      username: '',
      name: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3001/api/users', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json',
        },
          
        });
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const user = await response.json();
        console.log(user);
        formik.resetForm();
        setSuccessMessage('User Added Successfully');
        setTimeout(() => {
          setSuccessMessage('');
          router.push('/users'); // Redirect to the UserList page
        }, 2000);
        // Redirect or perform other actions as needed
      } catch (error) {
        console.error('There was an error!', error);
        // Handle error state or display an error message
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


      // Validation logic remains unchanged
  });


  return (
    <Container maxWidth="sm" className="w-full p-8">
      <Typography variant="h4" align="center" gutterBottom >
        Add User
      </Typography>
      {successMessage && (
        <div style={{ textAlign: 'center', color: 'green', marginBottom: '10px' }}>{successMessage}</div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth error={!!formik.errors.role}>
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
          {formik.errors.role ? <div>{formik.errors.role}</div> : null}
        </FormControl>
        <TextField
          className="mt-4"
          fullWidth
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          className="mt-4"
          fullWidth
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          className="mt-4"
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit" fullWidth className="mt-4">
          Submit
        </Button>
        <link rel="icon" href="src\app\favicon.ico" />
      </form>
    </Container>
  );
}