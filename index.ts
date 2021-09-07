import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 5000;

function validateBoardContent(board: string): boolean {
    return /^[xo ]{9}$/.test(board);
}

app.get('/', (req, res) => {
    
    // Access the provided 'page' and 'limt' query parameters
    const board = req.query.board?.toString();
    console.log('board: ', board)
    console.log(board?.length)

    if (!board || !validateBoardContent(board)) {
        res.status(400).send('Invalid board');
    } else {
        res.status(200).send('Valid board!');
    }
})

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})