import { useState } from 'react';

export default function DisplayQuizToFill({quizz}){
  // console.log("quiz to fill", quizz);
  // console.log('quiz title', quizz.title);
  const [index, setIndex] = useState(0);
  const [answer, setQuizAnswer] = useState('')
  // console.log("quiz.qa[index]", quizz.qa[index]);
  let disabled = false;
  // console.log("index", index);
  let next;
  let quizQuestion;
  let quizAnswer;
  let mark;
  
  if (index < quizz.qa.length-1) {
    next = () => {setIndex((index + 1)); setQuizAnswer("")};
  } else {
    disabled = true
  }
  
  quizQuestion = quizz.qa[index].question;
  quizAnswer = quizz.qa[index].answer;
  
  if (quizAnswer ===  answer) {
    mark = "correct";
  } else {
    mark = 'wrong';
  }
  
  

  return(
    <div id="quizToFill">
      <h3 id="questionToFill">{quizQuestion}</h3>
      {/* <h3 id="answerToFill">{quizAnswer}</h3> */}
      <input className="quizAnswer" id="answerToFill" type='text' placeholder='Enter an answer' value={answer} onChange={e => setQuizAnswer(e.target.value)}/> {answer === '' ? null : <p id="mark">{mark}</p>}
      <button id="NextQuestionBtn" onClick={next} disabled={disabled} >Next Question</button>
    </div>
  )

}



