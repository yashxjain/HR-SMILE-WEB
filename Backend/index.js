import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const dbConfig = {
    host: "139.5.190.143",
    user: "yash",
    password: "A@9u)RSDvvEwRMOT",
    database: "ssmile",
};

async function getEmp(req, res) {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connection successful');

        const [rows, fields] = await connection.execute('SELECT * FROM Employees');
        console.log(rows);

        res.json(rows);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        res.status(500).json({ error: 'Database connection failed' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

app.get('/employees', getEmp);

app.listen(3306, () => {
    console.log('Server is running on port 3306');
});
