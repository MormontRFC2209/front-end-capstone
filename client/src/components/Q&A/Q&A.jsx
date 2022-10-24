import {useState, useEffect} from "react";
import axios from 'axios';
import QuestionList from './QuestionList/QuestionList.jsx';
import useModal from '../../components/subComponents/modalHook.jsx';
import QuestionModal from './Modal/QuestionModal.jsx';
import './QANDA.css';



const questionsArray = [];
var renderedQuestions = [];
var searchResultArray = [];

var count = 4;



export default function QANDA(props) {



  const {isShowing, toggle} = useModal();

  const [currentQuestions, setQuestions] = useState(renderedQuestions);
  const [loading, setLoading] = useState(true);
  const [currentList, setList] = useState('');
  const [searchInput, setSearchInput] = useState('')



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


  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)

    if(searchInput.length > 2) {
      //search result array
      searchResultArray = [];

      //iterate through the questions array
      for(let i = 0; i < count; i++) {
        var questionBody = questionsArray[i].question_body.toUpperCase();
        console.log(questionsArray[i].question_body)
        //every question that contains the string add to the array
        if(questionBody.includes(searchInput.toUpperCase())) {
          searchResultArray.push(questionsArray[i])
        }
      }

      //set the currentQuestions to be our search result array

      setQuestions(searchResultArray)

    }

    if(searchInput.length < 3) {

      setQuestions(renderedQuestions)
    }
  };




  useEffect( () => {

    grabQuestions();

  }, [])




  if(loading) {
    return <span>Loading Questions...</span>
  } else {
    return (
      <div className="QANDA" id="QACONTAINER">
        <h4 className="QANDA"id="QATITLE"onClick={props.trackingFunction}>Questions & Answers</h4>

        <input className="QANDA" id="QASEARCH"type="text" onClick={props.trackingFunction} onChange={handleChange} placeholder="Have a Question? Search for an Answer..." ></input>

        {currentQuestions.length > 0 ? <QuestionList questionList={currentQuestions} id={props.productId} trackingFunction={props.trackingFunction}/> : null }

        {currentQuestions.length < 4 ? null : <button className="QANDA" id="QAACCORDIAN" onClick={(event) => {event.preventDefault(); manipulateAccordian(); props.trackingFunction(event);}}>{currentList}</button>}<button onClick={toggle}>Add a Question</button>
        <div id="QuestionFlex">
          <QuestionModal
          isShowing={isShowing}
          hide={toggle}
          id={props.productId}
          trackingFunction={props.trackingFunction}
          />
        </div>

      </div>
    )
  }

}