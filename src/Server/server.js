// server.js
const express = require('express');
const cors = require('cors');
const postgres = require('postgres');

const app = express();
const port = 3001; // Change the port if needed

// Enable CORS for all routers
app.use(cors());

// Replace with your PostgreSQL connection details
const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: 'chcd_test',
    username: 'postgres',
    password: '[YOUR PASSWORD]'
});

app.get('/data', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        console.log('Query error:', q)
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const data = await sql.unsafe(query);
        console.log('Got data:', data)
        res.json(data);
    } catch (error) {
        console.log('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
