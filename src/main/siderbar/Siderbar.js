import React from 'react'
import  './siderbar.css'
import home from '../siderbar/icons/home.png'
import shorts from '../siderbar/icons/shorts.png'
import library from '../siderbar/icons/subs.png'

import subs from '../siderbar/icons/subs.png'

export default function Siderbar() {
  return (
<div className='sidebar'>
    <div style={{display : 'flex',flexDirection : 'column',height: "70vh",width : '10%'}}>
      <div style={{display : 'flex' ,justifyContent: "center" , flexDirection : 'column' , width : '100px'}}>
      <img  style={{height : '20px', width : '20px',marginTop : '40px',marginLeft : '10px'}}  src={home}/>

        <p style={{fontSize : '10px',marginLeft : '10px'}}>Home</p>
      </div>
      <div  style={{display : 'flex' ,justifyContent: "center" , flexDirection : 'column' , width : '100px'}}>
        <img  style={{height : '20px', width : '20px',marginTop : '40px',marginLeft : '10px'}}  src={shorts}/>
        <p style={{fontSize : '10px',marginLeft : '10px'}} >Shorts</p>

      </div>
      <div  style={{display : 'flex' ,justifyContent: "center" , flexDirection : 'column' , width : '100px'}}>
        <img  style={{height : '20px', width : '20px',marginTop : '40px',marginLeft : '10px'}}  src={subs}/>
        <p style={{fontSize : '10px',marginLeft : '3px'}} >Subscriptions</p>

      </div>
      <div  style={{display : 'flex' ,justifyContent: "center" , flexDirection : 'column' , width : '100px'}}>
        <img  style={{height : '20px', width : '20px',marginTop : '40px',marginLeft : '10px'}}  src={library}/>
        <p style={{fontSize : '10px',marginLeft : '10px'}} >Library</p>

      </div>
    </div>

</div>

  )
}
