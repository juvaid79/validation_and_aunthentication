import React from 'react';
import { Button, Container } from 'react-bootstrap';

const NotFound = () => {
    const buttonStyle = {
        marginTop:'3vh',
        backgroundColor: 'red', 
        color: 'white', 
        border: '2px solid black',
        borderRadius: '5px',
        padding: '10px 20px',
      };
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh', 
        marginTop: '5vh', 
      }}
    >
      <h1>404 Page Not Found</h1>
      <h5>We Are Working on this Page</h5>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTyOctPtNOE-kYvBlAg3pVvQhJA2dj43nsOX_abbnA6e4wEZy-jajTA-u7nvB0124ws1M&usqp=CAU"
        alt="404 Error"
        style={{
          maxWidth: '100%', 
          maxHeight: '70vh',
        }}
      />
      
     <Button variant="primary" href="/userhome" style={buttonStyle}>
      Go to Home
    </Button>
    </Container>
  );
};

export default NotFound;
