// Create a function that accept movie title and retrives the movies details from database
// Read
async function readMovie(movieTitle) {
    try {
        const movie = await Movie.findOne({ title: movieTitle })
        console.log(movie)
    } catch (error) {
        throw error        
    }
}

readMovie("jaadu")


// Create a function that accepts actor name and retrives the all movies details from database
// Read

async function readMoviesByActor(actorName) {
    try {
        const movies = await Movie.find({ actor: actorName })
        console.log(movies)
    } catch (error) {
        throw error        
    }
}

readMoviesByActor("Amir Khan")


// Create a function that accepts director name and retrives the all movies from database 
// Read

async function readMoviesByDirector(directorName) {
    try {
        const movies = await Movie.find({ director: directorName })
        console.log(movies)
    } catch (error) {
        throw error        
    }    
}

readMoviesByDirector("Rajkumar Hirani")


