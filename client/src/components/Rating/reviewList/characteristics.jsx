import React, {useState, useEffect} from "react";
import CharacterEntry from "./characterEntry.jsx";

export default class Characteristics extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      Size:['Too small','small','Perfect','large','Too large'],
      Width:['Too narrow','narrow','Perfect','wide','Too wide'],
      Comfort:['uncomfortable', 'no bad','as expected','great', 'perfect'],
      Quality: ['poor','accept', 'as expected', 'great','perfect'],
    };
  }

render() {

  return (
    <div style={{marginTop:'20px'}}>
    {Object.keys(this.props.metaData.characteristics).map((character,id)=>{
      return <CharacterEntry key={id} character={character} mood={this.state[character]} moodId={this.props.metaData.characteristics[character].id} setCharacteristics={this.props.setCharacteristics}/>
    })}
    </div>

  )
}
}