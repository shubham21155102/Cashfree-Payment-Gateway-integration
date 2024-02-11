import React, { useEffect, useState } from 'react';
import { cashfree } from './utils';
import { useParams } from 'react-router-dom';
import "./css.css"
const App = () => {
    const params = useParams()
    const isSessionId = params.sessionid
    const [sessionId, setSessionId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [customer_name, setCustomerName] = useState('');
    const [customer_phone, setCustomerPhone] = useState('');
    const [customer_email, setCustomerEmail] = useState('')
    const [order_amount, setOrderAmount] = useState('');
    const [order_note, setOrderNote] = useState('');
    const [allset, setAllSet] = useState(false);
    const order={
        "customer_id": "006d7609-5007-4323-95a9-e8210fc489e7",
        "customer_name": "Shubham Kumar",
        "customer_phone": "6201060889",
        "customer_email": "resoshubham2002@gmail.com",
        "order_amount": "1",
        "order_note": "Hello This is test"
    }
    const handleSubmitDetails=async (e)=>{
        e.preventDefault();
       

        await setAllSet(true);
        console.log(order.customer_id, customer_name, customer_phone, customer_email, order_amount, order_note);
        var raw = JSON.stringify({
          "customer_id": order.customer_id,
          "customer_name": customer_name,
          "customer_phone": customer_phone,
          "customer_email": customer_email,
          "order_amount": order_amount,
          "order_note": order_note
        });
        var requestOptions = {
          method: 'POST',
          headers:{
            "Content-Type": "application/json",
          },
          body: raw,
          redirect: 'follow'
        };
        
        const data=await fetch("http://dev.ostello.co.in/merchant-app/newpayment",requestOptions)
        const datas=await data.json()
        console.log(datas)
        const paymentSessionId = datas.payment_details.payment_session_id;
        setSessionId(paymentSessionId)
        const orderIdd = datas.payment_details.order_id;
        setOrderId(orderIdd)
    }
    const handlePayment = ()=>{
        let checkoutOptions = {
            paymentSessionId: sessionId,
            returnUrl: `http://dev.ostello.co.in/merchant-app/checkstatus?orderId=${orderId}`,
            
        }   
        cashfree.checkout(checkoutOptions).then(function(result){
            if(result.error){
                alert(result.error.message);
            }
            if(result.redirect){
                console.log("Redirection")
                console.log(result);
            }
        });
    }

    useEffect(()=>{
        setSessionId(isSessionId)
    }, [isSessionId])

  return (
    <>
    <div className='main'>
        <div className='center'>
        {!allset?<> <form onSubmit={handleSubmitDetails}>
          <input type="text" value={customer_name} onChange={(e)=>{setCustomerName(e.target.value)}} placeholder="Customer Name" required/>
          <br/>
          <input type="text" value={customer_phone} onChange={(e)=>{setCustomerPhone(e.target.value)}} placeholder="Customer Phone" required/>
          <br/>
          <input type="text" value={customer_email} onChange={(e)=>{setCustomerEmail(e.target.value)}} placeholder="Customer Email" required/>
          <br/>
          <input type="text" value={order_amount} onChange={(e)=>{setOrderAmount(e.target.value)}} placeholder="Order Amount" required/>
          <br/>
          <input type="text" value={order_note} onChange={(e)=>{setOrderNote(e.target.value)}} placeholder="Order Note" required/>
          <br/>
          <button type="submit">Pay Now</button>
        </form></>:<><div className='card px-5 py-4 mt-5'>
            <div className='col-12 center'>
                <button className='w-100 ' type="submit" onClick={handlePayment}>Pay Now</button>
            </div>
        </div></>}
       
            <img width={300} src={""} alt="" />
        </div>
        
    </div>
    </>
  )
}
export default App