const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submission
app.post('/send-message', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create a message object
    const newMessage = {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    };

    // Read existing messages from the JSON file
    fs.readFile('messages.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading messages file');
        }

        let messages = [];
        if (data) {
            messages = JSON.parse(data);
        }

        // Add the new message to the array
        messages.push(newMessage);

        // Write the updated messages back to the JSON file
        fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error saving message');
            }

            res.status(200).send('Message sent successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});