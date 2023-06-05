import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

// Read the .env file where API key is saved
dotenv.config();

// Use Configuration function which accepts a object with the API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

//Create an instance of OpenAIApi class with the configuration object
const openai = new OpenAIApi(configuration);

//Initailize express app
const app = express();
app.use(cors());// Allows to do cross origin requests
app.use(express.json()); //Allows to interact with JSON data from frontend to backend

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Sharda Tech AI',
    })
});

//Post request to recieve the prompt and send back the response
app.post('/', async (req, res) => {
    try{
        const prompt  = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\"\"\""],
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error){
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port https://shardatechgpt.onrender.com'));