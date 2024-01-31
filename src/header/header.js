import React, { useState } from 'react'
import  './header.css'
import utbe_icon from '../header/icons/utube_icon.png'
import bell from '../header/icons/icons8-bell-24.png'
import avator from '../header/icons/avator.png'
import video_upload from '../header/icons/icons8-video-upload-32.png'
import search_icon from '../header/icons/icons8-search-50.png'
import man from '../header/icons/man.png'

import { useDispatch, useSelector } from 'react-redux'
import { DarkMode, search } from '../state/action'
import { auth, provider } from '../firebase/firebase'
import {  signInWithPopup } from "firebase/auth";



export default function Header({Dark}) {
  const [toggle , settoggle ] = useState(false)
  const Dispatch = useDispatch()
  const [ image ,setimage ]  = useState('')
  const  [input , setinput ] = useState('')



  const Signin = async ()=>{
    if(localStorage.getItem("img")){
      localStorage.removeItem("img")
      window.location.reload()
    }else{
      let info;
      signInWithPopup(auth,provider)
      .then(async(data)=>{
        setimage(data.user.photoURL)
        localStorage.setItem('img' , data.user.photoURL)
         info  = {
          full_name  : data.user.displayName,
          avator : data.user.photoURL,
          email : data.user.email
        }
        await fetch('http://localhost:5000/check_user_or_get_user', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info), 
        });
    })
  }
}


const inputchange = (e)=> {
  setinput(e.target.value)
  console.log(e.target.value)
  Dispatch(search({ type : "searching", input_value : e.target.value}))   
}

  return (
    <header style={{display : 'flex',alignItems : 'center' , justifyContent : 'space-between',backgroundColor : Dark?'black':'white' }}>
        <div style={{display : 'flex',alignItems : 'center',}}>
        <img style={{height : '5vmax',marginLeft : '10px'}} src={utbe_icon} alt='this is a youtube icon'/>
         <h3 style={{color : Dark ? 'white' : 'black', fontFamily :'Roboto, Arial, sans-serif'
}}>YouTube</h3>
        </div>
        <div className='search_bar'>
          <input  onChange={inputchange} placeholder='Search' type='search'   value={input}/>
          <div>
          <img  style={{height: '2vw',marginLeft : '5px',cursor : 'pointer'}} src={search_icon}/>

          </div>
        </div>
        <div style={{marginRight : '100px' ,display : 'flex' ,justifyContent : 'space-around' , width : '20%' ,alignItems : 'center'}}>
            <img style={{cursor : 'pointer' , height: '2vw'}} src={video_upload} alt='this is a bell icon'/>
            <img style={{cursor : 'pointer',}} src={bell} alt='this is a bell icon'/>
<div style={{marginTop : toggle ? 180 : 0 , zIndex : 1 , width : '20%'}}>

            <img onClick={()=>{settoggle(!toggle)}} style={{cursor : 'pointer' ,height: '6vh',zIndex : 1, borderRadius: '100px'}} src={ localStorage.getItem('img')? localStorage.getItem('img'):image?image: man} alt='this is a bell icon'/>
            <div style={{width : 160, height : 180,backgroundColor : '#fafcfc',zIndex: 1, display : toggle ? 'flex' : 'none', justifyContent : 'center', alignItems : 'center',borderRadius : 15, boxShadow: '1px 2px 9px #dadada',backgroundColor: Dark?'black':'white', color :Dark?'white':'black'  }}>
            <div style={{ listStyle : 'none' ,display : 'flex' , flexDirection : 'column' }}>
              <span onClick={Signin} style={{fontSize : '20px',marginBottom : 40,fontWeight : 600,cursor : 'pointer'}}>{image|| localStorage.getItem('img') ? "🚪Sign Out":"🚪Sign In" }</span>
              <span style={{fontSize : '20px',marginBottom : 40,fontWeight : 600,cursor : 'pointer'}} onClick={()=>Dispatch(DarkMode({mode : !Dark }))}>🌑Dark Mode</span>
              <span style={{fontSize : '20px',marginBottom : 10,fontWeight : 600,cursor : 'pointer'}}>😁Feedback</span>
            </div>
            </div>
</div>


 

        </div>
    </header>
  )
}
