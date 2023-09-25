import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './User.css';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  FirstName: Yup.string().required('First Name is required'),
  LastName: Yup.string().required('Last Name is required'),
  Email: Yup.string().email('Invalid email address').required('Email is required'),
  Password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
  PhoneNumber: Yup.string().min(10, 'PhoneNumber Must be at least 10 digit').required('Phone Number is required'),
});

const UserSignup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:4500/usersingup', values);
      console.log("response from signup", response)
      if (response.data.success) {
        navigate('/userlogin');
        toast.success(response.data.msg);
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
    <Container className='usercontainer'>
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
          <FormikForm onSubmit={formik.handleSubmit} className="form-container">
            <h2>User Signup</h2>
            <Form.Group controlId="FirstName" className="form-group">
              <Form.Label className="form-label"></Form.Label>
              <Field
                type="text"
                name="FirstName"
                placeholder="First Name"
                className="form-control"
              />
              <ErrorMessage name="FirstName" component="div" className="text-danger" />
            </Form.Group>
            <Form.Group controlId="LastName" className="form-group">
              <Form.Label className="form-label"></Form.Label>
              <Field
                type="text"
                name="LastName"
                placeholder="LastName"
                className="form-control "
               

              />
              <ErrorMessage name="LastName" component="div" className="text-danger" />
            </Form.Group>
            <Form.Group controlId="Email" className="form-group">
              <Form.Label className="form-label"></Form.Label>
              <Field
                type="email"
                name="Email"
                placeholder="Email"
                className="form-control"
               

              />
              <ErrorMessage name="Email" component="div" className="text-danger" />
            </Form.Group>
            <Form.Group controlId="Password" className="form-group">
              <Form.Label className="form-label"></Form.Label>
              <Field
                type="password"
                name="Password"
                placeholder="Password"
                className="form-control"
              />
              <ErrorMessage name="Password" component="div" className="text-danger" />
            </Form.Group>
            <Form.Group controlId="PhoneNumber" className="form-group">
              <Form.Label className="form-label"></Form.Label>
              <Field
                type="text"
                name="PhoneNumber"
                placeholder="PhoneNumber"
                className="form-control"
              />
              <ErrorMessage name="PhoneNumber" component="div" className="text-danger" />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Signup
            </Button>
            <Nav.Link href="userlogin" className="nav-link">
              Already Registered? Please Login!
            </Nav.Link>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
};

export default UserSignup;
