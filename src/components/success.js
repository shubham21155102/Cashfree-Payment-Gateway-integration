import React from 'react';

const Success = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#d4edda', // Light green background
    };

    const boxStyle = {
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        color: '#155724', // Dark green text
    };

    const linkStyle = {
        display: 'inline-block',
        marginTop: '1rem',
        textDecoration: 'none',
        color: '#155724',
        fontWeight: 'bold',
        border: '1px solid #155724',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h4 style={headingStyle}>🎉 Payment Successful</h4>
                <p>Your payment has been processed successfully!</p>
                <a href="/" style={linkStyle}>Back to Home</a>
            </div>
        </div>
    );
};

export default Success;