const STORE = [
    {
        //1
        question: "How do you prefer to watch your movies?",
        options: ["At the cinema, are you really asking?",
            "Streaming, nothing like one's bed",
            "Good ol' DVDs. Redbox is my bestie"],
    },
    {
        //2
        question: "What is your favorite genre?",
        options: ["Drama",
            "Action",
            "Horror",
            "Comedy"],
    },
    {
        //3
        question: "With whom do you usually prefer to watch movies?",
        options: ["By myself, nothing like one's own company",
            "With friends, sharing is caring",
            "With my significant other",
            "With my cat, he loves Kubrick",
            "With my family"],
    },
    {
        //4
        question: "With whom do you usually prefer to watch movies?",
        options: ["By myself, nothing like one's own company",
            "With friends, sharing is caring",
            "With my significant other",
            "With my cat, he loves Kubrick",
            "With my family"],
    },
    {
        //5
        question: "Why do you watch movies most of the time?",
        options: ["To have fun",
            "To reflect on life and its complexities",
            "As a way of bonding with people I care about",
            "As a way of distracting myself from the horrors of this world"],
    },
    {
        //6
        question: "Which of these movies do you like the most?",
        options: ["Gone With The Wind",
            "Avengers: Endgame",
            "When Harry Met Sally",
            "The Conjuring",
            "Good Will Hunting",],
    },
    {
        //7
        question: "If you were part of a movie crew, which role would you play?",
        options: ["The director, I want my vision to guide the whole thing",
            "An actress / actor, I'm the soul of this project",
            "An editor, I will put everything together",
            "A cinematographer, I really care about how things look",
            "A scriptwriter, I'm the real creator",],
    },
    {
        //8
        question: "Who is your favorite president?",
        options: ["Donald Trump, MAGA all the way",
            "Barack Obama, please come back",
            "George Washington, nothing like a founding father",
            "Abe Lincoln, of course",
            "FDR, f*** the Nazis",],
    },
    {
        //9
        question: "What is your favorite ice cream flavor?",
        options: ["Vanilla",
            "Chocolate",
            "Napolitan",
            "Rum & Raisins",
            "Cookie Dough",],
    },
    {
        //10
        question: "To which country would you prefer to travel for vacation?",
        options: ["France",
            "Iceland",
            "South Africa",
            "Peru",
            "Thailand",
            "Russia",],
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
        thrill_seeking: 0,
    },
    avg_movie_score: 0,  
};

const GENRES = {
    innovative : [14, 878],
    fun: [35, 16],
    traditional: [99, 37, 10751],
    dramatic: [18, 36, 9648],
    romantic: 10749,
    weird: [10770, 10402],
    adventurous: [12, 28, 10752],
    thrill_seeking: [80, 27, 53],
}

const traitKeys = Object.keys(SCORE.traits);

console.log(traitKeys);


