'use strict';

//Access credentials and base data for themoviedb.org API which we'll use to generate recommendation
const moviedbAPI = {
    apiKey: "6184c60592c9e705562804eb21c2f397",
    baseURL: "https://api.themoviedb.org/3",
    querySort: "sort_by=vote_average.desc",
    endPoint: "/discover/movie",
}

//Access credentials and base data for utelly API whick we'll use to generating streaming options list
const utelly = {
    rapidApiKey: "66fdf336cemsh75959c453beef6fp1fff5fjsneffb5f55a399",
    baseURL:"https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    endPoint: "/lookup",
    country: "country=us",
}

//stores questionnaire and answer options. traitIndex will associates specific answer options with certain personnality trait
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
    //test answers will assign to a specific trait below
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
    //since max score for certain traits is different than others, multipliers will normalize each score
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
};

const KEYWORDS = {
    //moviedb has a list of keywords with a specific id for each. keyword ids related to each personality trait are stored in arrays.
    innovative : [190329, 310, 490, 312, 3222, 1576, 3307, 3298, 11440, 207257, 4379, 163561,208807, 243957, 243950,3519 ,4286, 162988, 252635, 253322],
    fun: [258614, 258785, 155722, 11931, 236316, 9963, 18425, 160362, 3205, 186120, 177972, 215200, 9717, 180547, 4344, 256791, 4325, 167213, 9716, 185281],
    traditional: [210543, 222820, 236667, 5783, 10511, 156212, 1627, 6091, 3587, 207876, 156028, 179585, 230457, 3136, 4107, 186, 1405, 3036, 1394, 5049],
    dramatic: [11268, 222, 2462, 188860, 196110, 207114, 214780, 34094, 1599, 970, 219903, 1739, 10683, 164296, 1523, 170418, 240315, 14549, 159315, 223609],
    romantic: [233027, 247745, 257236, 4516, 9799, 40798, 182349, 208793, 221890, 234191, 238251, 239144, 239561, 241637, 240305, 244886, 247643, 248512, 156038, 173137],
    weird: [3260, 9719, 163699, 202882, 9887, 7089, 158713, 33841, 172658, 155678, 156546, 241980, 985, 2117, 162345, 162346, 256059, 166467, 196861, 251847],
    adventurous: [253675, 258331, 163441, 256524, 247784, 250925, 9715, 10843, 1454, 6956, 83, 4776, 219404, 10562, 3713, 849, 33637, 853, 11107, 163295],
    thrillSeeking: [8087, 50009, 192856, 12565, 1930, 10092, 6259, 13112, 155790, 5340, 2620, 9826, 3879, 11134, 1568, 10291, 33421, 166462, 157171, 9665],
}

//questionNumber will keep track of questionnaire
let questionNumber = 0;

//traitKeys will be used to easily access traits within previous arrays
const traitKeys = Object.keys(SCORE.traits);

//for every question submission generate a new one by looking at valuew from STORE array
function generateQuestionOptions(item){
    $('form').html(`
        <legend class="question-${questionNumber}">${item.question}</legend>
        `)
    //append first radio option with 'checked' atrribute
    $('form').append(`
        <div class="question">
            <input type="radio" name="q${questionNumber}" id="option${0}-q${questionNumber}" value="${0}" required checked>
            <label for="option${0}-q${questionNumber}">${item.options[0]}</label><br>
        </div>
        `)
    //iterate over rest of options without 'checked' attribute
    for(let i=1; i<item.options.length; i++){
        $('form').append(`
        <div class="question">
            <input type="radio" name="q${questionNumber}" id="option${i}-q${questionNumber}" value="${i}" required>
            <label for="option${i}-q${questionNumber}">${item.options[i]}</label><br>
        </div>
        `)
    }
    $('form').append('<button class="submit" type="submit">Enter</button>')
}

//every time a question is submitted assignScore will be called to add 1 to the trait associated with the user selection
function assignScore(item, input){
    let traitSelect = item.traitIndex[input];
    let traitName = traitKeys[traitSelect];
    SCORE.traits[traitName]++;
}

//dominantTrait variable will store the trait with highest score after normalizing
function assignWinner(){
    let dominantTrait = "innovative";
    //function will be called after user submits each question
    for(let i=0; i<traitKeys.length; i++){
        //if normalized score of selected trait is higher than normalized score of previous dominantTrait assign new dominantTrait
        if(SCORE.traits[traitKeys[i]]*SCORE.multipliers[traitKeys[i]] > SCORE.traits[dominantTrait]*SCORE.multipliers[dominantTrait]){
            dominantTrait = traitKeys[i];
        }
    }
    //after each question return the current dominantTrait
    return dominantTrait;
}

//at the end of the quiz, generate a string of all keywords associated with winning trait
function determineTrait(dominantTrait){
    let genreArray = KEYWORDS[dominantTrait];
    return genreArray.join("|");
}

//fetch json with movies associated with keywords belonging to trait with highest normalized score
function fetchMovies(){
    //winningTrait stores string of keywords associated with trait with highest normalized score
    let winningTrait = determineTrait(assignWinner());
    //generate query url with values within the moviedbAPI object and string of keywords associated with the winning trait
    let url = moviedbAPI.baseURL + moviedbAPI.endPoint + "?" + moviedbAPI.querySort + "&" + "api_key=" + moviedbAPI.apiKey + "&with_keywords=" + winningTrait + "&page=1&vote_count.gte=500";
    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
    //call displayResults to appropriately put json elements in the DOM
    .then(responseJson => displayResults(responseJson))
    //handle error response
    .catch(err => alert(`Something went wrong: ${err.message}`));
}

//fetch list of streaming sites where movie is available, takes movie title string as argument
function fetchStreaming(movieTitle){
    //store variable with movie title converted into URI component
    let uriMovie= encodeURIComponent(movieTitle);
    //create api query url with utelly object values and uri compatible movie title
    let url = utelly.baseURL + utelly.endPoint + "?rapidapi-key=" + utelly.rapidApiKey + "&" + utelly.country + "&term=" + uriMovie;
    //fetch json with streaming services playing movie.
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

//taking javascript compatible json as an argument, place appropriate values into DOM
function displayResults(responseJson){
    //random movie stores a random index value that will be passed to retrieve an element within results array
    let randomMovie = Math.floor(Math.random()*responseJson.results.length);
    //store title of random results array element
    let title = responseJson.results[randomMovie].title;
    //store movie 
    let image = "http://image.tmdb.org/t/p/w185//" + responseJson.results[randomMovie].poster_path;
    //place title, image, imdb score, and overview of random movie into the DOM
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
    //pass title into fetchStreaming function which will generate a list of sites where the movie is streaming
    fetchStreaming(title);
    //append buttons which will allow user to take the quiz again or get another random movie within their keyword array
    $('.final-buttons').append(`
        <button class="start-over">Start Over</button>
        <button class="new-movie">New Movie</button>
    `);  
}

//reload web app on click of start-over button
function startOver(){
    $('main').on('click', '.start-over', function(e){
        e.preventDefault();
        window.location.reload(true);
    })   
}

//render new movie data on click of new-movie button
function newMovie(){
    $('main').on('click', '.new-movie', function(e){
        e.preventDefault();
        $('.streaming-list, .final-buttons').empty();
        fetchMovies();
    });
}

/*render streaming links for recommended movie to DOM by taking utelly json response. 
uri compatible movie title is also passed to search on Google in case results array returns empty*/
function displayStreaming(responseJson, uriTitle){
    //if results array for streaming platforms returns empty, generate a link to search movie title on Google
    if(!Array.isArray(responseJson.results) || !responseJson.results.length){
        $('.movie-result').append(`
            <section class="streaming-null">
                <h3>Unfortunately, we couldn't find any site streaming this movie.</h3>     
                <p><a href="http://www.google.com/search?q=${uriTitle}" target="_blank">Search on Google</a></p>
            </section>
        `);
        //hide streaming ul
        $('.streaming').css('display', 'none');
    }
    else{
        //if results array is not empty append result to .streaming-list, a ul.
        for(let i=0; i<responseJson.results[0].locations.length; i++){
            $('.streaming-list').append(`
                <li class="streaming-item"><a href="${responseJson.results[0].locations[i].url}" target="_blank"><img src="${responseJson.results[0].locations[i].icon}" alt="streaming-icon-${i}"></a></li>
            `)
        }
        //show streaming ul
        $('.streaming').css('display', 'block');
    }   
}

//calls appropriate functions to render content into DOM
function renderToDom(){
    $('main').on('click', '.submit, .start', function(e){
        e.preventDefault();
        //store appropriate element within STORE by current questionNumber index
        let itemCurrent = STORE[questionNumber];
        //store previous STORE item to process user selection after button is clicked
        let itemPrev = STORE[questionNumber-1];
        //store value of user answer
        let choiceSelect = $('input[type=radio]:checked').attr('value');
        //iterate over STORE elements until the whole array is covered
        if(questionNumber < STORE.length){
            //reset screen
            $('.intro').empty();
            //after first quesiton has already shown, assign score for each answered question and render new question
            if(questionNumber > 0){
                generateQuestionOptions(itemCurrent);
                assignScore(itemPrev, choiceSelect);
            }
            //render first question
            else{
                generateQuestionOptions(itemCurrent);    
            }
            questionNumber++;
        }
        //once all questions have been rendered, render final screen calling API functions
        else{
            fetchMovies();
            startOver();
            newMovie();
        }
    })
}

$(renderToDom);


