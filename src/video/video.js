import React, { useEffect ,useRef, useState  } from 'react'
import { useSearchParams } from 'react-router-dom'
import { storageRef } from '../firebase/firebase';
import Siderbar from '../main/siderbar/Siderbar';
import './video.css'
import { useSelector } from 'react-redux';
import Like from './icons/like.png'
import Comment from './icons/chat.png'
import Share from './icons/share.png'
import thumb from './icons/thumbs-up.png'
import comments from './icons/comments.png'
import share1 from './icons/share1.png'







export default function Video() {
  const [Video , setVideo ] = useState('')
  const [data , setdata ] = useState([])

          
  useEffect(() => {
    async function fetchData() {
      let posts = await fetch('http://localhost:5000/getData')
      let json_post = await posts.json()
     setdata(json_post);
    }
    fetchData();
  }, []);


  const [ search  ] = useSearchParams()
  const DarkMode = useSelector((state)=>state.ChangeState.mode)

  
   const query = search.get('v') || ''
  useEffect( ()=>{
    async function getData(){
      let videoRef  =  storageRef.child(`videos/${query}.mp4`)
      videoRef
      .getDownloadURL()
      .then((url) => {
        // Set the video URL in state to use in your component
        setVideo(url);
      })
      
      .catch((error) => {
        // Handle any errors
        console.error('Error getting video URL:', error);
      })
    }

    getData()
   
  },[])

  return (
    <>
    <div style={{display : 'flex' , justifyContent : 'space-between' , flexWrap : 'wrap'}}>
      <Siderbar/>
<div>
  
{Video ? (
        <video     style={{marginTop : 50 , width : '50vmax' , height : '30vmax'}} controls   src={Video} type="video/mp4">
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading...</p>
      )}
      <div className='like_share_parent'>
        <div style={{display : 'flex' }}>
        <img style={{ height : '40px'}} src={DarkMode ? thumb:  Like} />
          <p style={{color : DarkMode ? 'white' : 'black'}}>12k</p>

        </div>
        <img src={ DarkMode ? comments:  Comment}/>
        <img src={DarkMode ? share1 : Share}/>


      </div>
</div>
    

<div style={{color : DarkMode ? 'white' : 'black'}} className='right_side'>
{
  data.map(value => {
return(
      <div className='videos_suggestion'>
          <div style={{ backgroundImage : `url(${value.tumbnail})` ,  backgroundSize : 'cover'}} className='thumbnail'>

          </div>
          <p >
          {value.title}
          </p>
          <p>{value.channnel_name}</p>
      </div>

)
})
}
</div>
  
  </div>
    </>
    
  )
}
