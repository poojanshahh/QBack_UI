import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Container, Typography } from '@mui/material';

const roles = ['admin', 'user'];

const UpdateUser = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { userId } = router.query; // Replace 'userId' with your identifier
        if (userId) {
          const response = await fetch(`http://localhost:3001/api/users/${userId}`);
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            throw new Error('Failed to fetch user data');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [router.query]);

  const formik = useFormik({
    initialValues: user || { role: '', username: '', name: '', password: '' },
    onSubmit: async (values) => {
      try {
        const url = `http://localhost:3001/api/users/${values.username}`;
        const response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const updatedUser = await response.json();
        console.log(updatedUser);
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
      const errors: Partial<any> = {};
      // Your validation logic here
      return errors;
    },
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" className="w-full p-8">
      <Typography variant="h4" align="center" gutterBottom>
        Update User
      </Typography>
      {successMessage && (
        <div style={{ textAlign: 'center', color: 'green', marginBottom: '10px' }}>{successMessage}</div>
      )}
      <form onSubmit={formik.handleSubmit}>
        {/* Form fields */}
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
        {/* Rest of the form fields (username, name, password) */}
        <Button type="submit" fullWidth>
          Update
        </Button>
      </form>
    </Container>
  );
};

export default UpdateUser;
