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


// Create a function that accepts a movies ID and an object with the updated data and updated the movie with provided.
// Update

async function updateMovie(movieId, updatedData) {   
    try {
        const updatedMovie = await Movie.findByIdUpdate(movieId, updatedMovie, { new: true })
        // Movie.findByIdUpdate({ title: title }, updateMovie, { new: true })
        console.log("Updated Movie", updatedMovie)
    } catch (error) {
        throw error        
    } 
    
}

updateMovie("Your-movie-id", { rating: 8.5 })



// Create a function that accepts a movie Id and deletes the movie with the provided Id.
// Delete

async function DeleteMovie(movieId) {
    try {
        const movie = await Movie.findByIdDelete(movieId)
        console.log("Deleted Movie", movie)        
    } catch (error) {
        throw error        
    }
}

DeleteMovie("Your-movie-id")



// A function to add data to the "shampoo" model

async function addShampooData() {
    const newshampoo = new addShampooData({
        brand: "MamaEarth",
        price: 299
    })

    try {
        const savedShampoo = await newshampoo.save()
        console.log("shampoo data save successfully", savedShampoo)        
    } catch (error) {
        console.log("shampoo data failed to save", error)        
    }
}

