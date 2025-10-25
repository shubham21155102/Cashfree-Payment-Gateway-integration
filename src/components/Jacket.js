import React, { useEffect, useState } from 'react';
import { cashfree } from './utils';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import "./css.css";
import Contact from './Contact';

const Jacket = () => {
    const params = useParams();
    const isSessionId = params.sessionid;
    const [sessionId, setSessionId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [customer_name, setCustomerName] = useState('');
    const [customer_phone, setCustomerPhone] = useState('');
    const [customer_email, setCustomerEmail] = useState('');
    const [order_amount, setOrderAmount] = useState('');
    const [order_note, setOrderNote] = useState('');
    const [allset, setAllSet] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [redirected, setRedirected] = useState(false);

    const order = {
        "customer_id": "006d7609-5007-4323-95a9-e8210fc489e7",
        "customer_name": "Shubham Kumar",
        "customer_phone": "6201060889",
        "customer_email": "resoshubham2002@gmail.com",
        "order_amount": "1",
        "order_note": "Hello This is test"
    };

    const handleSubmitDetails = async (e) => {
        e.preventDefault();
        setAllSet(true);

        try {
            const requestBody = {
                customer_id: order.customer_id,
                customer_name: customer_name,
                customer_phone: customer_phone,
                customer_email: customer_email,
                order_amount: order_amount,
                order_note: order_note
            };
            const response = await fetch("https://api.shubhamiitbhu.in/payment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('Failed to submit payment details');
            }
            const responseData = await response.json();
            console.log(responseData);
            const paymentSessionId = responseData.payment_details.payment_session_id;
            const orderId = responseData.payment_details.order_id;
            setSessionId(paymentSessionId);
            setOrderId(orderId);
            const checkoutOptions = {
                paymentSessionId: paymentSessionId,
                returnUrl: `https://api.shubhamiitbhu.in/payment?order_id=${orderId}`
            };
            cashfree.checkout(checkoutOptions).then(function(result) {
                if (result.error) {
                    alert(result.error.message);
                }
                if (result.redirect) {
                    console.log("Redirection");
                    console.log(result);
                }
            });
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setAllSet(false);
        }
    };

    useEffect(() => {
        setSessionId(isSessionId);
    }, [isSessionId]);

    useEffect(() => {
        if (paymentSuccess && !redirected) {
            setRedirected(true);
            window.location.href = "/";
        }
    }, [paymentSuccess, redirected]);

    return (
        <>
            <div className='main'>
                <div className='center'>
                    {!allset ?
                        <>
                            <img className="product-image" src="https://rukminim2.flixcart.com/image/832/832/xif0q/washing-machine-new/b/c/g/-original-imagvrbhcwuwz7j7.jpeg?q=70&crop=false" alt="Product" />
                            <form onSubmit={handleSubmitDetails}>
                                <input type="text" value={customer_name} onChange={(e) => { setCustomerName(e.target.value) }} placeholder="Customer Name" required />
                                <br />
                                <input type="text" value={customer_phone} onChange={(e) => { setCustomerPhone(e.target.value) }} placeholder="Customer Phone" required />
                                <br />
                                <input type="text" value={customer_email} onChange={(e) => { setCustomerEmail(e.target.value) }} placeholder="Customer Email" required />
                                <br />
                                <input type="text" value={order_amount} onChange={(e) => { setOrderAmount(e.target.value) }} placeholder="Order Amount" required />
                                <br />
                                <input type="text" value={order_note} onChange={(e) => { setOrderNote(e.target.value) }} placeholder="Order Note" required />
                                <br />
                                <button type="submit">Pay Now</button>
                            </form>
                        </>
                        :
                        <>
                            <div className="loading-message">Please wait while we are processing your request</div>
                        </>}
                </div>
            </div>
        </>
    );
};

export default Jacket;