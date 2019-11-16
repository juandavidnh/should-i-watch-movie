'use strict';

const moviedbAPI = {
    apiKey: "6184c60592c9e705562804eb21c2f397",
    baseURL: "https://api.themoviedb.org/3",
    querySort: "sort_by=vote_average.desc",
    endPoint: "/discover/movie",
}

const utelly = {
    rapidApiKey: "66fdf336cemsh75959c453beef6fp1fff5fjsneffb5f55a399",
    baseURL:"https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    endPoint: "/lookup",
    country: "country=us",
}

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
    multipliers:{
        innovative: 1/7,
        fun: 1/7,
        traditional: 1/7,
        dramatic: 1/6,
        romantic: 1/6,
        weird: 1/5,
        adventurous: 1/5,
        thrillSeeking: 1/5,
    },
    avgMovieScore: 0,  
};

const KEYWORDS = {
    innovative : [190329, 310, 490, 312, 3222, 1576, 3307, 3298, 11440, 207257, 4379, 163561,208807, 243957, 243950,3519 ,4286, 162988, 252635, 253322],
    fun: [258614, 258785, 155722, 11931, 236316, 9963, 18425, 160362, 3205, 186120, 177972, 215200, 9717, 180547, 4344, 256791, 4325, 167213, 9716, 185281],
    traditional: [210543, 222820, 236667, 5783, 10511, 156212, 1627, 6091, 3587, 207876, 156028, 179585, 230457, 3136, 4107, 186, 1405, 3036, 1394, 5049],
    dramatic: [11268, 222, 2462, 188860, 196110, 207114, 214780, 34094, 1599, 970, 219903, 1739, 10683, 164296, 1523, 170418, 240315, 14549, 159315, 223609],
    romantic: [233027, 247745, 257236, 4516, 9799, 40798, 182349, 208793, 221890, 234191, 238251, 239144, 239561, 241637, 240305, 244886, 247643, 248512, 156038, 173137],
    weird: [3260, 9719, 163699, 202882, 9887, 7089, 158713, 33841, 172658, 155678, 156546, 241980, 985, 2117, 162345, 162346, 256059, 166467, 196861, 251847],
    adventurous: [253675, 258331, 163441, 256524, 247784, 250925, 9715, 10843, 1454, 6956, 83, 4776, 219404, 10562, 3713, 849, 33637, 853, 11107, 163295],
    thrillSeeking: [8087, 50009, 192856, 12565, 1930, 10092, 6259, 13112, 155790, 5340, 2620, 9826, 3879, 11134, 1568, 10291, 33421, 166462, 157171, 9665],
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
        <div class="question">
            <input type="radio" name="q${questionNumber}" id="option${i}-q${questionNumber}" value="${i}" required checked>
            <label for="option${i}-q${questionNumber}">${item.options[i]}</label><br>
        </div>
        `)
    }
    $('form').append('<button class="submit" type="submit">Enter</button>')
}


function assignScore(item, input){
    let traitSelect = item.traitIndex[input];
    let traitName = traitKeys[traitSelect];
    SCORE.traits[traitName]++;
    console.log(SCORE.traits);
    console.log(traitName);
}


function renderQuestionOptions(){
    $('main').on('click', '.submit, .start', function(e){
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
            //$("body").html(generateFinalScreen());
            fetchMovies();
            startOver();
            newMovie();

        }
    })
}

function assignWinner(){
    let dominantTrait = "innovative";
    for(let i=0; i<traitKeys.length; i++){
        if(SCORE.traits[traitKeys[i]]*SCORE.multipliers[traitKeys[i]] > SCORE.traits[dominantTrait]*SCORE.multipliers[dominantTrait]){
            dominantTrait = traitKeys[i];
            //return dominantTrait;
        }
    }
    console.log(dominantTrait);
    return dominantTrait;
}

function determineTrait(dominantTrait){
    let genreArray = KEYWORDS[dominantTrait];
    return genreArray.join("|");
}


function fetchMovies(){
    let winningTrait = determineTrait(assignWinner());
    console.log(winningTrait);
    let url = moviedbAPI.baseURL + moviedbAPI.endPoint + "?" + moviedbAPI.querySort + "&" + "api_key=" + moviedbAPI.apiKey + "&with_keywords=" + winningTrait + "&page=1&vote_count.gte=500";
    console.log(url);
    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
    .then(responseJson => displayResults(responseJson))
    .catch(err => alert(`Something went wrong: ${err.message}`));
}

function fetchStreaming(movieTitle){
    let uriMovie= encodeURIComponent(movieTitle);
    console.log(uriMovie);
    let url = utelly.baseURL + utelly.endPoint + "?rapidapi-key=" + utelly.rapidApiKey + "&" + utelly.country + "&term=" + uriMovie;
    console.log(url);
    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
    .then(responseJson => displayStreaming(responseJson, uriMovie))
    .catch(err => alert(`Something went wrong: ${err.message}`));
}


function displayResults(responseJson){
    let randomMovie = Math.floor(Math.random()*responseJson.results.length);
    console.log(randomMovie);
    let title = responseJson.results[randomMovie].title;
    console.log(title);
    let image = "http://image.tmdb.org/t/p/w185//" + responseJson.results[randomMovie].poster_path;
    console.log(image);
    
    $('.submain').html(`
    <section class="movie-result">
        <h2 class="movie-title">${title}</h2>
        <section class = "movie-poster">
            <img src="${image}" alt="movie-poster">
        </section>
        <section class="score">
            <p><strong>iMDB Score:</strong> ${responseJson.results[randomMovie].vote_average}</p>
        </section>
        <section class="overview">
            <p><strong>Overview:</strong> ${responseJson.results[randomMovie].overview}</p>
        </section>
    </section>
    `);
    fetchStreaming(title);
    $('main').append(`
    <section class="buttons">
        <button class="start-over">Start Over</button>
        <button class="new-movie">New Movie</button>
    </section>
    `);
    
}

function displayStreaming(responseJson, uriTitle){
    
    if(!Array.isArray(responseJson.results) || !responseJson.results.length){
        $('.movie-result').append(`
            <section class="streaming-null">
                <h3>Unfortunately, we couldn't find any site streaming this movie.</h3>     
                <p><a href="http://www.google.com/search?q=${uriTitle}" target="_blank">Search on Google</a></p>
            </section>
        `);
        $('.streaming').css('display', 'none');
    }
    else{
        for(let i=0; i<responseJson.results[0].locations.length; i++){
            $('.streaming-list').append(`
                <li class="streaming-item"><a href="${responseJson.results[0].locations[i].url}" target="_blank"><img src="${responseJson.results[0].locations[i].icon}" alt="streaming-icon-${i}"></a></li>
            `)
        }
        $('.streaming').css('display', 'block');
    }
    
}

function startOver(){
    $('main').on('click', '.start-over', function(e){
        e.preventDefault();
        window.location.reload(true);
    })
    
}

function newMovie(){
    $('main').on('click', '.new-movie', function(e){
        e.preventDefault();
        $('.buttons, .streaming-list li').remove();
        fetchMovies();
    });
}



$(renderQuestionOptions);


