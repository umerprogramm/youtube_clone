import React, { useEffect,useState } from 'react'
import Siderbar from './siderbar/Siderbar'
import './main.css'
import PaymentForm from './../stripe/PaymentForm'
import * as Realm from "realm-web";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { storageRef } from '../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Main({Dark}) {
  const navigate = useNavigate();

  const input_value = useSelector((state)=>state.change_search.input_value)

  const [data , setdata ]  = useState([])

        
        useEffect(() => {
          async function fetchData() {
            let posts = await fetch('http://localhost:5000/getData')
            let json_post = await posts.json()
           setdata(json_post);
          }
          fetchData();
        }, []);
     



const stripe = useStripe();
const elements = useElements();
const [error, setError] = useState(null);
const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
  setIsOpen(!isOpen);
};




const perineum_video = async (params_data) => {
  
 const filtered_data = data.filter((elements)=>{
     return params_data === elements._id
  })
console.log(filtered_data)
if(filtered_data[0].perineum_status === true){
  togglePopup()
if (!stripe || !elements) {
    return;
  }

  const cardElement = elements.getElement(CardElement);

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    setError(error.message);
  } else {
    let res = await fetch('http://localhost:5000/charge',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount :  7000,
        currency : 'usd',
        source : paymentMethod.id,
      })
    })
   let  res_json = await  res.json()
    console.log(res_json);
    console.log(paymentMethod);
  }
}else {
  navigate(`/video?v=${filtered_data[0].video_id}`)
  
  }
  
};


return (
  <>
  <form onSubmit={perineum_video}>
      <div className='stripe_parent'>

      </div>
      <div>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <h2>Pay Now</h2>
            {error && <div className="error">{error}</div>}

            <CardElement   autoComplete="off" 
 options={{ style: { base: { fontSize: '16px', } } }} className="stripe_card"   />
              <button type="submit" disabled={!stripe}>
        Pay
      </button>
          </div>
          
        </div>
      )}
    </div>
    </form>   
  
  <div style={{display : 'flex'}}>
      <Siderbar/>
    <div className="main_content">
   { data.filter((item)=> {
      return item.title.toLowerCase() == '' ? item : item.title.toLowerCase().includes(input_value)
   }).map(value => {
    return(
<>
{
  
 

  <div onClick={()=> perineum_video(value._id)} className='content'>
              <img style={{width : '100%',borderRadius : "15px",height : "100%",cursor:'pointer'}} src={value.tumbnail}/>
              
             <div className='channel'>
            <img src={value.url}/>

            <div className='channel_sub_div'>
             <p style={{fontWeight : '500',color : Dark ? 'white' : 'black', fontFamily :'Roboto, Arial, sans-serif'}}>{value.title}
             </p>
 
             <span style={{position : 'relative', top : '-10px',fontSize : '15px',fontWeight : '400',color : Dark ? 'white' : 'black' , fontFamily :'Roboto, Arial, sans-serif'}}>{value.channnel_name}</span>
             
             <div>
             <p style={{position : 'relative', top : '-20px',color : Dark ? 'white' : 'black' , fontFamily :'Roboto, Arial, sans-serif'}}>views: {value.views + " " + value.hours} <span style={{display : value.perineum_status ? 'inline' : "none" , padding : "10px", backgroundColor : '#FFEF00' , borderRadius : '10px' ,fontFamily : 'Roboto, Arial, sans-serif'}}>perineum</span>       </p>

             </div>

            </div>

             </div>
    
             </div>
}
    
     </>
    )
    
    
    
  })}
  </div>
    </div>

    <h1>

    </h1>
    </>
    )
     

   
  
  
  
}
