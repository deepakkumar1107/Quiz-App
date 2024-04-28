const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

startButton.addEventListener("click" , startGame);
nextButton.addEventListener("click", ()=>{
    currenQuestionIndex++;
    setNextQuestion();
});

let shuffledQuestions , currenQuestionIndex;

function startGame(){
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() =>Math.random() -0.5);
    currenQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion () {
    resetState();
    showQuestion(shuffledQuestions[currenQuestionIndex]);
}

function showQuestion (question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click" , selectAnswer);
        answerButtonsElement.appendChild(button);

    });
}

function resetState (){
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }

}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button)=>{
        setStatusClass(button,button.dataset.correct);
    });
    if(shuffledQuestions.length > currenQuestionIndex+1){
        nextButton.classList.remove("hide");
    }
    else{
        startButton.innerText = "Restart Game";
        startButton.classList.remove("hide");
    }
    
}
 

function setStatusClass(element,correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    }
    else{
        element.classList.add("wrong");
    }

}

function clearStatusClass (element){
    element.classList.remove("wrong");
    element.classList.remove("correct");

}

const questions = [
    {
        question: "what is a Javascript file ?" ,
        answers:[
                {text: "Index.script" , correct: false},
                {text:"Index.js" , correct: true}
        ]
        
    },
    {
        question: " HTML is a which type of language? ",
        answers:[   
            {text: "Programming language" , correct: false},
            {text:"Markup language" , correct: true}
        ]
        
    }
  
    
]
