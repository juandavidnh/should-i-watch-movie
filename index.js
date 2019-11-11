'use strict';

const STORE = [
    {
        //1
        question: "How do you prefer to watch your movies?",
        options: ["At the cinema, are you really asking?",
            "Streaming, nothing like one's bed",
            "Good ol' DVDs. Redbox is my bestie"],
        traitIndex: [4, 0, 2]
    },
    {
        //2
        question: "What is your favorite genre?",
        options: ["Drama",
            "Action",
            "Horror",
            "Comedy"],
        traitIndex: [3, 6, 7, 1],
    },
    {
        //3
        question: "With whom do you usually prefer to watch movies?",
        options: ["By myself, nothing like one's own company",
            "With friends, sharing is caring",
            "With my significant other",
            "With my cat, he loves Kubrick",
            "With my family"],
        traitIndex: [5, 1, 4, 2, 0],
    },
    {
        //4
        question: "Why do you watch movies most of the time?",
        options: ["To have fun",
            "To reflect on life and its complexities",
            "As a way of bonding with people I care about",
            "As a way of distracting myself from the horrors of this world"],
        traitIndex: [1, 5, 4, 3],
    },
    {
        //5
        question: "Which of these movies do you like the most?",
        options: ["Gone With The Wind",
            "Avengers: Endgame",
            "When Harry Met Sally",
            "The Conjuring",
            "Good Will Hunting",],
        traitIndex: [2, 6, 4, 7, 3],
    },
    {
        //6
        question: "If you were part of a movie crew, which role would you play?",
        options: ["The director, I want my vision to guide the whole thing",
            "An actress / actor, I'm the soul of this project",
            "An editor, I will put everything together",
            "A cinematographer, I really care about how things look",
            "A scriptwriter, I'm the real creator",],
        traitIndex: [6, 3, 0, 1, 5],
    },
    {
        //7
        question: "Who is your favorite president?",
        options: ["Donald Trump, MAGA all the way",
            "Barack Obama, please come back",
            "George Washington, nothing like a founding father",
            "Abe Lincoln, of course",
            "FDR, f*** the Nazis",],
        traitIndex: [7, 0, 2, 3, 4],
    },
    {
        //8
        question: "What is your favorite ice cream flavor?",
        options: ["Vanilla",
            "Chocolate",
            "Napolitan",
            "Rum & Raisins",
            "Cookie Dough",],
        traitIndex: [2, 4, 1, 7, 0],
        
    },
    {
        //9
        question: "To which country would you prefer to travel for vacation?",
        options: ["France",
            "Iceland",
            "South Africa",
            "Peru",
            "Thailand",
            "Russia",],
        traitIndex: [2, 0, 7, 6, 1, 5],
    },
    {
        //10
        question: "Which pet do you prefer?",
        options: ["Cat",
            "Dog",
            "Fish",
            "Micro Pig",
            "Tarantula",
            "I hate animals",],
        traitIndex: [3, 1, 2, 0, 6, 5],
    },
];

const SCORE = {
    traits: {
        innovative: 0,
        fun: 0,
        traditional: 0,
        dramatic: 0,
        romantic: 0,
        weird: 0,
        adventurous: 0,
        thrillSeeking: 0,
    },
    avgMovieScore: 0,  
};

const GENRES = {
    innovative : [14, 878],
    fun: [35, 16],
    traditional: [99, 37, 10751],
    dramatic: [18, 36, 9648],
    romantic: 10749,
    weird: [10770, 10402],
    adventurous: [12, 28, 10752],
    thrillSeeking: [80, 27, 53],
}

let questionNumber = 0;

const traitKeys = Object.keys(SCORE.traits);

console.log(questionNumber);

function generateQuestionOptions(item){
    $('form').html(`
        <legend class="question-${questionNumber}">${item.question}</legend>
        `)
    for(let i=0; i<item.options.length; i++){
        $('form').append(`
            <input type="radio" name="option${i}-q${questionNumber}" id="option${i}-q${questionNumber}" value="${i}">
            <label for="option${i}-q${questionNumber}">${item.options[i]}</label>
        `)
    }
    $('form').append('<button class="submit">Enter</button>')
}


function assignScore(item, input){
    let traitSelect = item.traitIndex[input];
    let traitName = traitKeys[traitSelect];
    SCORE.traits[traitName]++;
    console.log(SCORE.traits);
    console.log(traitName);
}

function generateFinalScreen(){
    return `<h1>What Should I Watch?</h1>`;
}


function renderQuestionOptions(){
    $('main').on('click', 'button', function(e){
        e.preventDefault();
        console.log('questionNumber: '+questionNumber);    
        let itemCurrent = STORE[questionNumber];
        let itemPrev = STORE[questionNumber-1]
        console.log('itemCurrent: '+itemCurrent); 
        let choiceSelect = $('input[type=radio]:checked').attr('value');
        console.log('choiceSelect: '+choiceSelect);
        if(questionNumber < STORE.length){
            $('.intro').empty();
            if(questionNumber > 0){
                generateQuestionOptions(itemCurrent);
                assignScore(itemPrev, choiceSelect);
            }else{
                generateQuestionOptions(itemCurrent);    
            }
            questionNumber++;
        }else{
            $("body").html(generateFinalScreen());
        }
    })
}


$(renderQuestionOptions);

