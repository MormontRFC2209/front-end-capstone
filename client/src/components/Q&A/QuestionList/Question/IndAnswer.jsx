import {useState, useEffect} from "react";
import axios from 'axios';
import '../../QANDA.css';





export default function IndAnswer({answer, seller, trackingFunction}) {

  console.log(answer)
  var helpfulCount = answer.helpfulness
  const [count, setCount] = useState(helpfulCount)
  const [reportedClicked, setReportedClicked] = useState('Report?')
  const [helpfulClicked, setHelpfulClicked] = useState(false)

  const increaseHelpfulCount = (event) => {
    event.preventDefault();
    if(helpfulClicked) {
      return;
    }
    axios.put('/info', {route: '/qa/answers/'+answer.id+'/helpful', apiParams:{answer_id: answer.id}})
      .then((result) => {
        helpfulCount++

        setCount(helpfulCount);
        setHelpfulClicked(true);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const reportComment = (event) => {
    event.preventDefault();
    if (reportedClicked === 'Reported') {
      return;
    }
    axios.put('/info', {route: '/qa/answers/'+answer.id+'/report', apiParams:{answer_id: answer.id}})
      .then((result) => {
        setReportedClicked('Reported');
      })
      .catch((error) => {
        console.log(error)
      })
  }



  return(
    <div className="QANDA" id="ANSWERCONTAINER" >
      <span onClick={trackingFunction} className="QANDA" id="A-HEADER">A:</span>
      <span className="QANDA" id="ANSWERBODY"onClick={trackingFunction}>{answer.body}</span>
      <div>

      {seller ? <span className="QANDA" id="ANSWERNAME" onClick={trackingFunction}>BY {answer.answerer_name}, CURRENTDATE   |</span> : <span  className="QANDA" id="ANSWERNAME" onClick={trackingFunction}>by {answer.answerer_name}, currentDate    |</span>}

      <span  className="QANDA" id="ANSWERHELPFUL" onClick={(e)=>{trackingFunction(e); increaseHelpfulCount(e);}}>   Helpful? Yes ({count})    |</span>
      <span  className="QANDA" id="ANSWERREPORT" onClick={(e)=>{trackingFunction(e); reportComment(e);}}>   {reportedClicked}</span>
      <div className="QANDA" id="ANSWERPHOTOBOX">
        { answer.photos.length > 0 ? answer.photos.map((singleImage) => {
              return <img className="QANDA" id="ANSWERPHOTO" src={singleImage} key={Math.random()}></img>
            }): null}
      </div>

      </div>


    </div>
  )

}