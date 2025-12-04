var express = require("express");
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { MongoClient } = require("mongodb");

// MongoDB connection URI for Windows
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Database and collection names
const dbName = "movieDB";
const collectionName = "movies";

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        
        // Optional: Insert sample data if collection is empty
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        
        if (count === 0) {
            console.log("Inserting sample movie data...");
            const sampleMovies = [
                {
                    title: "Inception",
                    director: "Christopher Nolan",
                    year: 2010,
                    image: "images/inception.jpg"
                },
                {
                    title: "The Matrix",
                    director: "The Wachowskis",
                    year: 1999,
                    image: "images/the matrix.jpg"
                },
                {
                    title: "Interstellar",
                    director: "Christopher Nolan",
                    year: 2014,
                    image: "images/interstellar.png"
                },
                {
                    title: "Avatar",
                    director: "James Cameron",
                    year: 2009,
                    image: "images/avatar.png"
                },
                {
                    title: "Titanic",
                    director: "James Cameron",
                    year: 1997,
                    image: "images/titanic.png"
                },
                {
                    title: "Jurassic Park",
                    director: "Steven Spielberg",
                    year: 1993,
                    image: "images/jurassic park.jpg"
                }
            ];
            await collection.insertMany(sampleMovies);
            console.log("Sample data inserted!");
        }
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        console.log("\nMake sure MongoDB is running on your Windows machine!");
        console.log("Start MongoDB with: net start MongoDB");
    }
}

connectToMongoDB();

// Route to add a new movie
app.post("/addMovie", async (req, res) => {
    console.log("Add movie request received:", req.body);
    try {
        const { title, director, year, image } = req.body;
        
        // Validate input
        if (!title || !director || !year) {
            return res.status(400).json({ 
                statusCode: 400, 
                message: "Missing required fields" 
            });
        }

        const movie = {
            title: title,
            director: director,
            year: parseInt(year),
            image: image || "images/default.jpg"
        };

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(movie);
        
        console.log("Movie added successfully:", result.insertedId);
        res.json({ 
            statusCode: 200, 
            data: result, 
            message: "Movie added successfully" 
        });
    } catch (err) {
        console.error("Error adding movie:", err);
        res.status(500).json({ 
            statusCode: 500, 
            message: "Failed to add movie" 
        });
    }
});

// Route to fetch all movies
app.get("/getMovies", async (req, res) => {
    console.log("Get movies request received");
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const movies = await collection.find({}).toArray();
        
        console.log(`Found ${movies.length} movies`);
        res.json({ 
            statusCode: 200, 
            data: movies, 
            message: "Movies fetched successfully" 
        });
    } catch (err) {
        console.error("Error fetching movies:", err);
        res.status(500).json({ 
            statusCode: 500, 
            message: "Failed to fetch movies" 
        });
    }
});


// Graceful shutdown
process.on('SIGINT', async () => {
    console.log("\nClosing MongoDB connection...");
    await client.close();
    process.exit(0);
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App listening on port: " + port);
    console.log("Open http://localhost:" + port + " in your browser");
});