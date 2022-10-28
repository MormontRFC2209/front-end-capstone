import {useState, useEffect} from "react";


export default function Image(props) {
  const [state,setState]=useState(false)

  const onClick=()=>{
    setState(true)
  }

  const handleClick = () => {
    setState(false)
  }



  return (
    <>
  <div style={{marginBottom:"10px",marginTop:"10px"}} onClick={onClick} style={{cursor:'pointer',marginTop:'2vh'}}>
    <img src={props.src} style={{width:'150px',height:'90px',marginRight:'5px',objectFit: 'cover'}}></img>
  </div>
    {state ?<div className='writeBox'>
        <div className={`container ${state ? 'active' : ''}`}>
          <div className="ImagePopup"  onClick={(e) => e.stopPropagation()}>
            <div><img src={props.src} style={{minWidth:'40vw',minHeigth:'40vh'}}></img></div>
            <button style={{right:'5%',top:'5%',position:'fixed'}} id='reviewClose' onClick={handleClick}>X</button>
          </div>
        </div>
      </div>:null}


    </>
  )
}
