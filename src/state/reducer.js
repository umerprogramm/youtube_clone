
const InitValues = {
  mode : false,
 
}

const InitValues1= {
  input_value : "",
 
}
export const ChangeState =   (state=InitValues,action )=>{


  if(action.type === "Dark"){

  
     
        return { mode : state.mode =  action.mode  }
       
 
    
  }else{
      return{

        mode : state.mode,
      
      }
  }
    

} 




export const change_search =   (state=InitValues1,action )=>{


  if(action.type === "searching"){

  
     
        return { input_value : state.input_value =  action.input_value  }
       
 
    
  }else{
      return{

        input_value : state.input_value,
      
      }
  }
    

} 

  











 