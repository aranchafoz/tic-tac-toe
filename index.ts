import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 5000;

function validateBoardContent(board: string): boolean {
    return /^[xo ]{9}$/.test(board);
}

function isPlausiblyOsTurn(board: string): boolean {
    return board.includes(' ');
}

app.get('/', (req, res) => {
    
    // Access the provided 'page' and 'limt' query parameters
    const board = req.query.board?.toString();
    console.log('board: ', board)
    console.log(board?.length)
    if (!board) {
        res.status(400).send('It is mandatory to send by parameter the board')
    } else if (!validateBoardContent(board) || !isPlausiblyOsTurn(board)) {
        res.status(400).send('Invalid board');
    } else {
        res.status(200).send('Valid board!');
    }
})

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})