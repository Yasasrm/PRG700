const express = require('express');
const app = express();

// Middleware to serve static files
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});