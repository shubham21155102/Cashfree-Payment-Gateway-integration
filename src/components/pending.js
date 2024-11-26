import React from 'react';

const Pending = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff3cd', // Light yellow background
    };

    const boxStyle = {
        textAlign: 'center',
        padding: '2rem',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        color: '#856404', // Dark yellow text
    };

    const linkStyle = {
        display: 'inline-block',
        marginTop: '1rem',
        textDecoration: 'none',
        color: '#856404',
        fontWeight: 'bold',
        border: '1px solid #856404',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h4 style={headingStyle}>⏳ Payment Pending</h4>
                <p>Your payment is being processed. Please wait a moment.</p>
                <a href="/" style={linkStyle}>Back to Home</a>
            </div>
        </div>
    );
};

export default Pending;