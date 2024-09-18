const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());
// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit', async (req, res) => {
    const { age, weight, height, goal, diet, exercise } = req.body;
    // console.log("----------------------------------------------------------")
    // console.log(req.body)

    const pythonScriptPath = './bard.py';

    exec(`python ${pythonScriptPath} "${age}" "${weight}" "${height}" "${goal}" "${diet}" "${exercise}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log("----------------------------------------------------------")
        console.log(req.body)
        console.log('Python script output:');
        console.log(stdout);
        const pythonOutput = stdout.trim();

        res.send(pythonOutput);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
