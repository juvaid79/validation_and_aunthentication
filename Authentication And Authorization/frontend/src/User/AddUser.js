import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './User.css';
import axios from 'axios';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  FirstName: Yup.string().required('First Name is required'),
  LastName: Yup.string().required('Last Name is required'),
  Email: Yup.string().email('Invalid email address').required('Email is required'),
  Password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
  PhoneNumber: Yup.string().min(10, 'Phone Number must be at least 10 digits').required('Phone Number is required'),
});

const AddUser = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:4500/usersingup', values); // Change the API endpoint to adduser
      console.log("response from add user", response)
      if (response.data.success) {
        navigate('/userhome');
        toast.success("Add User Successfully ");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error('Internal Server Error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className='user-container'>
      <Formik
        initialValues={{
          FirstName: '',
          LastName: '',
          Email: '',
          Password: '',
          PhoneNumber: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <FormikForm onSubmit={formik.handleSubmit} className="user-form">
            <h2>Add User</h2> 
            <Form.Group controlId="FirstName">
              <Field
                type="text"
                name="FirstName"
                placeholder="First Name"
                className="form-control-user "
              />
              <ErrorMessage name="FirstName" component="div" className="text-danger" />
            </Form.Group>
            <Form.Group controlId="LastName">
              <Field
                type="text"
                name="LastName"
                placeholder="Last Name"
                className="form-control-user "
              />
              <ErrorMessage name="LastName" component="div" className="text-danger" />
            </Form.Group>
            <Form.Group controlId="Email">
              <Field
                type="email"
                name="Email"
                placeholder="Email"
                className="form-control-user "
              />
              <ErrorMessage name="Email" component="div" className="text-danger" />
            </Form.Group>
            <Form.Group controlId="Password">
              <Field
                type="password"
                name="Password"
                placeholder="Password"
                className="form-control-user "
              />
              <ErrorMessage name="Password" component="div" className="text-danger" />
            </Form.Group>
            <Form.Group controlId="PhoneNumber">
              <Field
                type="text"
                name="PhoneNumber"
                placeholder="Phone Number"
                className="form-control-user "
              />
              <ErrorMessage name="PhoneNumber" component="div" className="text-danger" />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Add User 
            </Button>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
};

export default AddUser;
