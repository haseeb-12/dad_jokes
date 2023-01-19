
import {AiOutlineArrowDown} from 'react-icons/ai'
import { AiOutlineArrowUp}  from 'react-icons/ai'
import './jokes.css'

const Jokes = ({jokes,changeCount}) => {

 

  return (
    <div className='card'>
      {jokes.map(({joke,id,count})=>(
         <div key={id} className='jokes_card'>
            <AiOutlineArrowUp onClick={()=>changeCount(id,'increment')}/>
            <div className='jokes_circle'>
            <h3 style={{borderColor:count>10
                ?'green'
                :count<0
                ?'red'
                :'blue'}} >{count}</h3>
            </div>
           
            <AiOutlineArrowDown onClick={()=>changeCount(id,'decrement')}/>
            <p >{joke}</p>
            
           
         </div>
        
      ))}
    </div>
  )
}

export default Jokes