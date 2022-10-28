import {useState} from 'react';


const ProgressBar = (props) => {
  const {bgcolor, completed, characters} = props;

  console.log(completed, bgcolor, props)




  const fillerStyles = {

    width: `${completed}%`,
    backgroundColor: bgcolor

  }




  return (
    <div id="progresscontainer" >
      <div id="progressbar"style={fillerStyles}>
        <span id="progresslabel"></span>
      </div>
    </div>
  )
}

export default ProgressBar;