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

const GENRES = {
    innovative : [14, 878],
    fun: [35, 16],
    traditional: [99, 37, 10751],
    dramatic: [18, 36, 9648],
    romantic: [10749],
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

function determineGenre(dominantTrait){
    let genreArray = GENRES[dominantTrait];
    return genreArray.join("|");
}


function fetchMovies(){
    let genres = determineGenre(assignWinner());
    console.log(genres);
    let url = moviedbAPI.baseURL + moviedbAPI.endPoint + "?" + moviedbAPI.querySort + "&" + "api_key=" + moviedbAPI.apiKey + "&with_genres=" + genres + "&page=1&vote_count.gte=500";
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


