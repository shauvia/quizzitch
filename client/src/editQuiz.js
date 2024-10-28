import { useState } from 'react';

function QuizName(props){
  return (
    <>
      <input {...props} id="" type='text' placeholder='Add quiz title' value={props.quizTitle}  onChange={e => props.setQuizTitle(e.target.value)} />
    </>
  )
}

function QuizContent({quizQuestion, quizAnswer, editQuizQuestion, editQuizAnswer, onDeleteQuestion}){
  return (
    <>
      <input className="quizQuestion" type='text' placeholder='Enter a question' value={quizQuestion} onChange={e => editQuizQuestion(e.target.value)}/>
      <input className="quizAnswer" type='text' placeholder='Enter an answer' value={quizAnswer} onChange={e => editQuizAnswer(e.target.value)}/>
      <button id='deleteQuestion' onClick={onDeleteQuestion}>Delete Question</button>
    </>
  )
}

function DislayQuizContent({questionList, handleEditQuizQestion, handleEditQuizAnswer, handleOnDeleteQuestion}){
  const listItems = questionList.map((item, index) =>{ return <QuizContent key={item.id} quizQuestion={item.question} quizAnswer={item.answer} editQuizQuestion={quizQuestion => handleEditQuizQestion(quizQuestion, index)} editQuizAnswer={quizAnswer => handleEditQuizAnswer(quizAnswer, index)} onDeleteQuestion={() => handleOnDeleteQuestion(item.id)}/>})
  return (
    <div id='quizQa'>
      {listItems}
    </div>
  )
}


function NextQuestionBtn ({onCreateNewQuestion}){
  return (
    <button id='nextQuestion' onClick={onCreateNewQuestion}>New Question</button>
  )
}

function EditQuizBtn ({oncreateQuiz}){
  return (
    <button id="saveQuiz" onClick={oncreateQuiz}>Save Quiz</button> 
  )
}

export default function DisplayEditQuiz({oneQuiz, onSaveQuiz}){
  const [quiz, setQuiz] = useState(oneQuiz);
  console.log("DisplayEditQuiz, quiz", quiz)


  function handleAddQuizTitle(quizName) {
    const newQuiz = {...quiz};
    // console.log('skopiowany Quiz and title', newQuiz)
    newQuiz.title = quizName;
    // console.log("newQuiztitle", newQuiz.title);
    // console.log('newQuiz and title', newQuiz)
    setQuiz(newQuiz);
  }


  function handleEditQuizQestion(quizQuestion, questionIndex){
    const newQuiz = {...quiz};
    // console.log('skopiowany Quiz and question', newQuiz)
    newQuiz.qa = [...quiz.qa];
    // console.log("newQuiz.qa po skopiowaniu")
    newQuiz.qa[questionIndex].question = quizQuestion;
    // console.log("newQuiz and question", newQuiz);
    setQuiz(newQuiz);
  }

  function handleEditQuizAnswer(quizAnswer, questionIndex){
    const newQuiz = {...quiz};
    // console.log('skopiowany Quiz and question', newQuiz)
    newQuiz.qa = [...quiz.qa];
    // console.log("newQuiz.qa po skopiowaniu")
    newQuiz.qa[questionIndex].answer = quizAnswer;
    // console.log("newQuiz and question", newQuiz);
    setQuiz(newQuiz);
  }

  function handleOnDeleteQuestion(questionId){
    // console.log("questionId", questionId);
    const newQuiz = {...quiz};
    newQuiz.qa = [...quiz.qa];
    let newQa =[];
    for (let question of newQuiz.qa) {
      if(questionId !== question.id) {
        newQa.push(question);
      }
    }
    newQuiz.qa = newQa;
    // console.log("newQuiz", newQuiz)
    setQuiz(newQuiz);
  }

  function handleCreateNewQuestion(){
    const newQuiz = {...quiz};
    newQuiz.qa = [...quiz.qa];
    let nextId = newQuiz.lastQuestionId + 1;
    newQuiz.lastQuestionId = nextId;
    newQuiz.qa.push(
      {question: '',
      answer :'',
      id: nextId}
    )
    setQuiz(newQuiz);
  }

  return (
    <div id='createQuizComponent'>
      <QuizName quizTitle={quiz.title} setQuizTitle={handleAddQuizTitle} className="quizTitle"/>
      <DislayQuizContent questionList={quiz.qa} handleEditQuizQestion={handleEditQuizQestion} handleEditQuizAnswer={handleEditQuizAnswer} handleOnDeleteQuestion={handleOnDeleteQuestion}/>
      <NextQuestionBtn onCreateNewQuestion={handleCreateNewQuestion}/>
      <EditQuizBtn oncreateQuiz={() => onSaveQuiz(quiz)} />
      
    </div>  
  )
}