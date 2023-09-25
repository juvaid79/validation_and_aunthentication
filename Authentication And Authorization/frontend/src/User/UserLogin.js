import './User.css';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Card, Button, Form as BootstrapForm } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';

function UserLogin() {
  const navigate = useNavigate();
  const initialValues = {
    Email: '',
    Password: '',
  };

  const validationSchema = Yup.object({
    Email: Yup.string().email('Invalid Email address').required('Email is required'),
    Password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post('http://localhost:4500/userlogin', {
        Email: values.Email,
        Password: values.Password,
      });

      if (res.data.success === true) {
        localStorage.setItem('loggedin', true);
        localStorage.setItem('token', res.data.token);
        navigate('/userhome');
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log('Error during login:', error);
      toast.error('An error occurred during login.', error);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <h4 className="text-center">User Please Login</h4>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                  <Form>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label></BootstrapForm.Label>
                      <Field type="text" name="Email" id="Email" placeholder="Email" as={BootstrapForm.Control} />
                      <ErrorMessage name="Email" component="div" className="error" />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group>
                      <BootstrapForm.Label></BootstrapForm.Label>
                      <Field type="password" name="Password" id="Password" placeholder="Password" as={BootstrapForm.Control} />
                      <ErrorMessage name="Password" component="div" className="error" />
                    </BootstrapForm.Group>
                    <Nav.Link href="userforget" className="nav-link">Forget Password ?</Nav.Link>
                    <Button type="submit" variant="primary" className="mt-3">Login</Button>
                    <Nav.Link href="/usersingup" className="nav-link">New User? Please Register</Nav.Link>
                  </Form>
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserLogin;
