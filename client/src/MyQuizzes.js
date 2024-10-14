import { useState } from 'react';
import DisplayEditQuiz  from './editQuiz.js';
import DisplayQuizToFill from './QuizMode.js';


function GoBackBtn({goBack}){
  return (
    <button id='boBack' onClick={goBack}>Goback</button>
  )
}

function DisplaySingleQuiz({quiz, handleOnDeleteQuiz, toggleQuiz, onEditQuiz2}){

  let displayContent;
  displayContent = (
    <>
      <button className='deleteQuizBtn' onClick={()=> handleOnDeleteQuiz(quiz.id)}>Delete Quiz</button>
        <div id="displayQuizTitle" onClick={()=>{toggleQuiz(quiz)}}>{quiz.title}</div>
        <button className='editQuizBtn' onClick={()=> {onEditQuiz2(quiz) }}>Edit Quiz</button>
    </>
  )
 
  return (
    <>
      <li className='quiz' > 
        {displayContent}
      </li>
     
    </>  
  )
}

export default function DisplayQuizzes({quizzesList, handleOnDeleteQuiz, onEditQuiz}){
  const [displayQuestion, setdisplayQuestion] = useState(false);
  const [clikedQuiz, setClickedQuiz] = useState({});
  const [editQuiz, setEditQuiz] = useState(false);

  let displayContentToFill = (
    <>
    <DisplayQuizToFill quizz={clikedQuiz}/>
    <GoBackBtn goBack={goBack}/>
    </>
  );

  let displayContentToEdit = (
    <>
    <DisplayEditQuiz oneQuiz={clikedQuiz} onSaveQuiz={onEditQuiz2} />
    <GoBackBtn goBack={goBack}/>
    </>
  )

  function toggleQuiz(quiz){
    setdisplayQuestion(!displayQuestion);
    setClickedQuiz(quiz)
  }

  function onEditQuiz2(quiz)  {
    onEditQuiz(quiz);
    setEditQuiz(!editQuiz);
    setClickedQuiz(quiz);
    
  }
  function goBack(){
    setdisplayQuestion(false);
    setEditQuiz(false);
  }



  const listOfQuizzes = quizzesList.map(quiz => { return  <DisplaySingleQuiz  quiz={quiz}  toggleQuiz={toggleQuiz} handleOnDeleteQuiz={handleOnDeleteQuiz} onEditQuiz2={onEditQuiz2} key={quiz.id}/>} )
  return (
      <div>
        {displayQuestion ? displayContentToFill : null }
        {editQuiz ? displayContentToEdit : null}
        {(!displayQuestion && !editQuiz) ? <ul>{listOfQuizzes}</ul>: null}
      </div>
        
      
    )
  }
  