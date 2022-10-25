import React, {useState, useEffect} from "react";
// import styles from './writeReview.css'
import styles from './character.css'


export default class CharacterEntry extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      option:2
    };
  }

render() {

  const onChange=(e)=>{
    this.setState({option:e.target.value})
    this.props.setCharacteristics(this.props.moodId,Number(e.target.value)+1)
  }

  const rangeStyle = {
    backgroundColor: '#eee',
    WebkitAppearance: 'none',
    outline:'none',
  }
  return (
            <div>{this.props.character}
              <input
              // className='writeInput'
              style={rangeStyle}
              type='range'
              min={0}
              max={4}
              onChange={onChange}
              value={this.state.option}
              id={this.props.character}
              />
              <label htmlFor={this.props.character}>{this.props.mood[this.state.option]}</label>
            </div>

  )
}
}