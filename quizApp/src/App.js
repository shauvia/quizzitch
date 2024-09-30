// import QuizSetup from './QuizSetupPage.js';
import './App.css';
import { useState } from 'react';
import CreateQuiz  from './QuizSetupPage.js';
import DisplayQuizzes from './MyQuizzes.js'





function NavBar({onClickedHome,onClickedMyQuizzes}){
  return (
    <nav>
      <ul className="menu">
        <li onClick={onClickedHome} >Home</li>
        <li onClick={onClickedMyQuizzes}>My Quizzes</li>
        <li>Settings</li>
      </ul>
    </nav>
  )
}
function Header({goBackToHomePage, goToMyQuizzes}){
  return (
    <header>
      <h1>Quizzitch</h1>
      <NavBar onClickedHome={goBackToHomePage} onClickedMyQuizzes={goToMyQuizzes}/>
    </header>
  )
}

function Button({btnName, btnId, onClickedButton}){
  return (
    <button onClick={onClickedButton} id={btnId}>
      {btnName}
    </button>
  )
}


function SearchBar ({searchBarId}){
  return (
      <input id={searchBarId} type="text" placeholder="Search..."/>
  )
}

function Footer(){
  return(
    <footer>
      <p>&copy; shauvia</p>
    </footer>
    
  )
}

// function QuizSetupPage({onAddQuizTitle, onAddQuizQA, questionList, quizTitle}){
//   return ( 
//     <QuizSetup onAddQuizTitle={onAddQuizTitle} onAddQuizQA={onAddQuizQA} questionList={questionList} quizTitle={quizTitle}/>
//   )  
 
// }


function HomePage({onCreateNewQuiz}){
  return (
    <div className='homePage'>
        <Button onClickedButton={onCreateNewQuiz} btnId='btnCreateNewQuiz' btnName={"Create New Quiz"}></Button>
        <Button btnId="btnRecentQuizes" btnName={"Recent Quizes"}></Button>
        <SearchBar searchBarId='SearchBar'/>
      </div>
  )
}








function App() {

  // const [contentToDisplay, setContentToDisplay] = useState("homepage");

  // if (contentToDisplay === "homepage") {
  //   ///
  // }
  // else if (contentToDisplay === "newQuiz") {
  //   //
  // }

  // <Header goBackToHomePage={()=>{setUploadHomePage(true); setUploadNewQuiz(false);}} />
  //     { contentToDisplay === "homepage" ? <HomePage onCreateNewQuiz={()=>{setUploadNewQuiz(true); setUploadHomePage(false);}}/> : null }
  //     { contentToDisplay === "newQuiz" ? <QuizSetupPage /> : null}

  const [uploadNewQuiz, setUploadNewQuiz] = useState(false);
  const [uploadHomePage, setUploadHomePage] = useState(true);
  const [displayMyQuizzes, setdisplayMyQuizzes] = useState(false);
  const [nextId, setNextId] = useState(0);
  const [keyId, setKeyId] = useState(0);
  const [quizzes, setQuizzes] = useState([])

  // function handleAddQuizTitle(quizTitle) {
  //   const newQuiz = {...quiz};
  //   // console.log('skopiowany Quiz and title', newQuiz)
  //   newQuiz.title = quizTitle;
  //   // console.log("newQuiztitle", newQuiz.title);
  //   setQuiz(newQuiz);
  // }
  // function handleAddQuizQA({quizQuestion, quizAnswer}){
  //   const newQuiz = {...quiz};
  //   console.log('skopiowany Quiz and question', newQuiz)
  //   newQuiz.qa = [...quiz.qa];
  //   console.log("newQuiz.qa po skopiowaniu")
  //   newQuiz.qa.push(
  //     {question: quizQuestion,
  //     answer : quizAnswer,
  //     id: nextId}
  //   )
  //   setNextId(nextId + 1);
  //   console.log("newQuiz and question", newQuiz);
  //   setQuiz(newQuiz);

  // }

  function handleOnDeleteQuiz(quizId){
    const newQuizzes = [...quizzes];
    let newerQuizzes =[];
    for (let quiz of newQuizzes) {
      if(quizId !== quiz.id) {
        newerQuizzes.push(quiz);
      }
    }
    // console.log("newQuiz", newQuiz)
    setQuizzes(newerQuizzes);
  }

  function handleAddQuiz(quiz) {
    const newQuizzes = [...quizzes];
    // console.log('skopiowany newQuizzes', newQuizzes)
    quiz.id = nextId;
    // console.log("id quizu", quiz.id)
    newQuizzes.push(quiz);
    setNextId(nextId + 1);
    // console.log('newQuizzes po dodaniu quizu', newQuizzes)
    setQuizzes(newQuizzes);
    setUploadHomePage(true); 
    setUploadNewQuiz(false)


  }

  function handleOnEditQuiz(editedQuiz) {
    const newQuizzes = [...quizzes];
    // let newerQuizzes =[];
    console.log("newQuizzes", editedQuiz)
    for (let i = 0; i < newQuizzes.length; i++){
      if(newQuizzes[i].id === editedQuiz.id){
        newQuizzes[i] = editedQuiz;
      }
    }
    setQuizzes(newQuizzes);

    // for (let quiz of newQuizzes) {
    //   console.log('quiz przed edycja', quiz);
    //   if(editedQuiz.id === quiz.id) {
    //     newerQuizzes.push(editedQuiz)
    //     console.log('quiz po zedytowaniu', quiz );
    //   }
    //   newerQuizzes.push(quiz)
    // }
    // console.log('newQuizzes po edytowaniu quizu', newQuizzes)
    // setQuizzes(newerQuizzes);

    // sprawdzić, czy działa!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }

  let displayQuizzLis = <DisplayQuizzes quizzesList={quizzes} handleOnDeleteQuiz={handleOnDeleteQuiz} onEditQuiz={handleOnEditQuiz} key={keyId}/>;
  // displayQuizzes

  return (
    <>
      <Header goBackToHomePage={()=>{setUploadHomePage(true); setUploadNewQuiz(false); setdisplayMyQuizzes(false)}} goToMyQuizzes={()=>{setdisplayMyQuizzes(true); setUploadHomePage(false); setUploadNewQuiz(false); setKeyId(keyId + 1)}} />
      { uploadHomePage ? <HomePage onCreateNewQuiz={()=>{setUploadNewQuiz(true); setUploadHomePage(false); setdisplayMyQuizzes(false)}}/> : null }
        {uploadNewQuiz ? < CreateQuiz onAddQuiz={handleAddQuiz}/> : null}
        {displayMyQuizzes ? displayQuizzLis : null}
      {/* { uploadNewQuiz ? <QuizSetupPage onAddQuizTitle={handleAddQuizTitle} onAddQuizQA={handleAddQuizQA} questionList={quiz.qa} quizTitle={quiz.title}/> : null} */}
      
      <Footer/>
  </>
  )
}

// let nextId = 0;

// export default function List() {
//   const [name, setName] = useState('');
//   const [artists, setArtists] = useState([]);

//   return (
//     <>
//       <h1>Inspiring sculptors:</h1>
//       <input
//         value={name}
//         onChange={e => setName(e.target.value)}
//       />
//       <button onClick={() => {
//         setArtists([
//           ...artists,
//           { id: nextId++, name: name }
//         ]);
//       }}>Add</button>
//       <ul>
//         {artists.map(artist => (
//           <li key={artist.id}>{artist.name}</li>
//         ))}
//       </ul>
//     </>
//   );
// }


// export default function AddTodo({ onAddTodo }) {
//   const [title, setTitle] = useState('');
//   return (
//     <>
//       <input
//         placeholder="Add todo"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       />
//       <button onClick={() => {
//         setTitle('');
//         onAddTodo(title);
//       }}>Add</button>
//     </>
//   )
// }


export default App;
