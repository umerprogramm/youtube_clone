import './App.css';
import Header from './header/header';
import Main from './main/main';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Video from './video/video';
import { useSelector } from 'react-redux';
import {useEffect} from 'react'
function App() {
  const DarkMode = useSelector((state)=>state.ChangeState.mode)
  useEffect(() => {
    document.body.style = `background:${DarkMode? 'black' : 'white'};`;
  }, [DarkMode])
  
  
  return (
   <div style={{backgroundColor : DarkMode?'black': 'white'}}>
   <Header
   Dark={DarkMode}
   />
  

   <BrowserRouter>
<Routes>
<Route exact path='/' element={<Main   Dark={DarkMode}/>} />
<Route  path='/video' element={<Video   Dark={DarkMode}/>} />

</Routes>

</BrowserRouter>

   </div>
  );
}

export default App;
