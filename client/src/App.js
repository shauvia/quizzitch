// import QuizSetup from './QuizSetupPage.js';
import './App.css';
import { useState, useEffect } from 'react';
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

  const [uploadNewQuiz, setUploadNewQuiz] = useState(false);
  const [uploadHomePage, setUploadHomePage] = useState(true);
  const [displayMyQuizzes, setdisplayMyQuizzes] = useState(false);
  const [nextId, setNextId] = useState(0);
  const [keyId, setKeyId] = useState(0);
  const [quizzes, setQuizzes] = useState([])

  const quizzesApi = "/quiz"
  const serverUrl = "http://localhost:3001";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(serverUrl+quizzesApi, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const jsonData = await response.json();
        console.log("fetchData", jsonData)
        setQuizzes(jsonData);
      } catch (error) {
        console.error("fetchData", error);
      }
    };

    fetchData();
  }, []);


  


  async function updateQuizzesAPI(url, quizApi, uInput){
    console.log("addQuizServer", url,  uInput)
    // console.log("app.js,addTask URL: ", url+postTask,)
    let response = await fetch(url+quizApi, { 
      method: 'POST' , 
      body: JSON.stringify(uInput),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      let err = new Error('fetch failed,addQuizServer, response.status: ' +  response.status, ' response.statusText: ' +  response.statusText);
      throw err;
    }
    let content = await response.text(); // dobranie sie do tresci jest asynchroniczne, trzeba czekac; .json() oddżejsonowuje
    console.log("addQuizServer", content)
    return content;
  }



  function handleOnDeleteQuiz(quizId){
    const newQuizzes = [...quizzes];
    let newerQuizzes =[];
    for (let quiz of newQuizzes) {
      if(quizId !== quiz.id) {
        newerQuizzes.push(quiz);
      }
    }
    // console.log("newQuiz", newQuiz)
    updateQuizzesAPI(serverUrl, quizzesApi, newerQuizzes)
    setQuizzes(newerQuizzes);
    
  }
    
  
  function handleAddQuiz(quiz) {
    console.log("handleAddQuiz, 174, quiz", quiz)
    console.log("handleAddQuiz, 174, newQuizzes", quizzes)
    const newQuizzes = [...quizzes];
    console.log("handleAddQuiz, 174, newQuizzes", newQuizzes)
    // console.log('skopiowany newQuizzes', newQuizzes)
    quiz.id = nextId;
    // console.log("id quizu", quiz.id)
    newQuizzes.push(quiz);
    setNextId(nextId + 1);
    // console.log('newQuizzes po dodaniu quizu', newQuizzes)
    updateQuizzesAPI(serverUrl, quizzesApi, newQuizzes);
    setQuizzes(newQuizzes);
    setUploadHomePage(true); 
    setUploadNewQuiz(false);
    


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
    console.log("app.js, 198, newQuizzes", newQuizzes)
    updateQuizzesAPI(serverUrl, quizzesApi, newQuizzes);
    setQuizzes(newQuizzes);
    
  }
    

  let displayQuizzLis = <DisplayQuizzes quizzesList={quizzes} handleOnDeleteQuiz={handleOnDeleteQuiz} onEditQuiz={handleOnEditQuiz} key={keyId}/>;
  
  

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



export default App;
