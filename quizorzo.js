var data = { 
    time: 20,
    questions:
        [
        {   question: "Where Bill live?",
            responses: ["Silicon Valley","Ravanusa","Italy", "Sicily"],
            correct: 1
        },
        {   
            question: "Where Vito live?",
            responses: ["Milano", "Ravanusa", "Qui"],
            correct: 2
        },
        {   
            question: "What color is the white horse of Napolen?",
            responses: ["Black", "Green", "White"],
            correct: 3
        }
        ]
}



class Quizorzo{
    constructor(data, quizDiv){
        /* Input: data: dict, quizDiv: string */
        this.data = data || {};
        this.done = false; //make sure button will be pushed for one time
        this.time = data['time']; //timer
        this.nCorrect = 0;
        this.nWrong = 0;
        this.quizDiv = quizDiv || "";
        this.classRadio = '' //setted in getQuiz method
        if(data && quizDiv)
            document.getElementById(quizDiv).innerHTML = this.getQuiz();
    }

    getQuiz(questionDiv = 'question', labelClass = "rounded p-2 option", classRadio = 'quiz'){
        /* Create a quiz and return the html code */
        this.classRadio = classRadio;
        let question;
        let correct_;
        let response_; //contain response one by one
        let responseT; //the true response
        let html='';

        for(let i=0; i<this.data.questions.length; i++){
    
            question = this.data.questions[i].question;
            html += "<div id='" + questionDiv + "'>" + question + "</div>";
            html += '<form>'; 
    
            correct_ = this.data.questions[i].correct;
            for(let j=0; j<this.data.questions[i].responses.length; j++){
                response_ = this.data.questions[i].responses[j];
                //assign true or false to the value parameter
                let value = correct_ == j+1 ? 'true' : 'false';
                html += `<label class="${labelClass}">${response_}
                    <input type="radio" name="radio${i}" value="${value}" class="${this.classRadio}"> 
                    <span class="crossmark"></span> </label>`;
            }
    
            responseT = this.data.questions[i].correct;
            html += '</form>';
        }
        return html;
    }



    setTimer(divTimer_){
        /* Parameter: divTimer_: string */
        //decrease timer
        window.setInterval(function(){
            let timer;
            timer = document.getElementById(divTimer_);
            timer.innerHTML = this.time;
            if(this.time>0){
                this.time -= 1;
            }
            else {
                timer.innerHTML = "Tempo scaduto";
            }
        }.bind(this), 1000);
        //we had binded the inner function to the main class
    }

 

    checkQuiz(divButton_){
        /* Input: divButton_: string, classRadio: string */

        document.getElementById(divButton_).addEventListener("click",function() {
            if(this.done==false && this.time>0){

                console.log(this.classRadio)
                let radioClass = document.getElementsByClassName(this.classRadio);
                console.log(radioClass)
        
                for( var i=0; i<radioClass.length; i++){
                    //controlliamo che la risposta giusta sia segnata solo nelle caselle in cui risulta vera
                    if(radioClass[i].value ===  String(radioClass[i].checked) && radioClass[i].value==="true"){
                      
                        //se corretta coloro di verde il nodo genitore
                        radioClass[i].parentNode.style.backgroundColor='#99ff66';
                        this.nCorrect++;
                    }
                    if(radioClass[i].value !==  String(radioClass[i].checked) && radioClass[i].value==="false"){
               
                        //se scorretta coloro di rosso
                        radioClass[i].parentNode.style.backgroundColor='#ff6633';
                        radioClass[i].parentNode.innerHTML += " -> <b>Risposta errata</b>";
                        this.nWrong++;
                    }
                    if(radioClass[i].value == "true"){
                        radioClass[i].parentNode.innerHTML += " -> <b>Risposta corretta</b>";
                        //verde
                        radioClass[i].parentNode.style.backgroundColor='#99ff66';
                    }   
                }//for
        
                //calcolo risposte corrette
                document.getElementById("points").innerHTML = "Hai totalizzato " + this.nCorrect + " risposte corrette";
                this.done=true;//ok, button has been pushed
            }//if done
        }.bind(this))
    }
 
}//end class

quiz = new Quizorzo(data, 'quiz');
quiz.setTimer('timer');
quiz.checkQuiz('checkButton');
