import express from 'express';


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`<h2>Welcome to the Payment Backend API 💵</h2>
        <p>Use the following endpoints to interact with the API:</p>
        <ul>
            <li><strong><a href="/profile">GET</a></strong>: Fetch user profile data, vehicle data, and notes.</li>
            <li><strong>POST /services</strong>: Add a new service.</li>
        </ul>
    `);
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});