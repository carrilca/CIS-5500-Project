import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Testing Hello World!');
});

app.post('/', (req, res) => {
	res.send('Got a POST request');
});

app.put('/user', (req, res) => {
	res.send('Got a PUT request at /user');
});

app.delete('/user', (req, res) => {
	res.send('Got a DELETE request at /user');
});

app.listen(PORT, () => {
	console.log(`Server started on PORT: ${PORT}`);
});
