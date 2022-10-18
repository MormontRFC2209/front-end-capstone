import {useState, useEffect} from "react";
import axios from 'axios';
import QuestionList from './QuestionList/QuestionList.jsx'

const questionsArray = [];
var renderedQuestions = [];
var count = 4;



export default function QANDA(props) {

  console.log(props)



  const [currentQuestions, setQuestions] = useState(renderedQuestions);
  const [loading, setLoading] = useState(true);
  const [currentList, setList] = useState('');



  const grabQuestions = () => {
    axios.get('/info', {params:{route:'/qa/questions/', apiParams:{product_id: props.productId, count: 25}}})
      .then((resultData) => {

        var rawQuestions = resultData.data.results

        for (var  i = 0; i < rawQuestions.length; i++) {
          questionsArray.push(rawQuestions[i]);
        }
        if(questionsArray.length < 4) {
          count = questionsArray.length
        }
        for ( var i = 0; i < count; i++) {
          renderedQuestions.push(questionsArray[i]);
        }
        setQuestions(renderedQuestions);

        if(loading) {
         setLoading(false);
        }
        if(questionsArray.length > 4) {
          setList('More Answered Questions');
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }





  const manipulateAccordian = () => {

    if(currentList === 'Collapse Questions') {

      if(questionsArray.length < 4) {
        count = questionsArray.length
      } else {
        count = 4;
      }


      renderedQuestions = [];
      for ( var i = 0; i < count; i++) {
        renderedQuestions.push(questionsArray[i])
      }
      setQuestions(renderedQuestions);
      setList('More Answered Questions');


      return;
    }

    var currentCount = count;

    if(questionsArray[count] === undefined) {
      return;
    }
    if(questionsArray[count+1] === undefined) {
      count+=1;
      setList('Collapse Questions');
    } else {
      count += 2;
    }
    var addedQuestion = [];


    for(currentCount; currentCount < count; currentCount++) {
      addedQuestion.push(questionsArray[currentCount]);

    }
    if(questionsArray[count] === undefined) {
      setList('Collapse Questions');
    }

    setQuestions(currentQuestions.concat(addedQuestion));

  }


  useEffect( () => {

    grabQuestions();

  }, [])

  console.log(props.product_id)



  if(loading) {
    return <span>Loading Questions...</span>
  } else {
    return (
      <div>
        <h4>Questions & Answers</h4>

        {currentQuestions.length > 0 ? <QuestionList questionList={currentQuestions} id={props.productId}/> : null }

        <h4 onClick={(e) => {e.preventDefault; manipulateAccordian();}}>{currentList}</h4>
      </div>
    )
  }

}