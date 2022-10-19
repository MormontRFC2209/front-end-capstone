import {useState, useEffect} from "react";
import axios from 'axios';





export default function IndAnswer({answer, seller}) {

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
        console.log(helpfulCount);
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
    <div>
      <span>{answer.body}</span>
      <div>

      {seller ? <span>BY {answer.answerer_name}, CURRENTDATE   |</span> : <span>by {answer.answerer_name}, currentDate    |</span>}

      <span onClick={increaseHelpfulCount}>   Helpful? Yes ({count})    |</span>
      <span onClick={reportComment}>   {reportedClicked}</span>
      </div>


    </div>
  )

}