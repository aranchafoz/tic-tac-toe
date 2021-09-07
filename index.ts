import express from 'express';
import Game from './game';
import { calculateNextMove } from './strategy';
import { isPlausiblyOsTurn, validateBoardContent } from './validators';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    const board = req.query.board?.toString();

    if (!board) {
        res.status(400).send('It is mandatory to send by parameter the board')
    } else if (!validateBoardContent(board) || !isPlausiblyOsTurn(board)) {
        res.status(400).send('Invalid board');
    } else {
        const game = new Game(board);
        const nextMove = game.calculateNextMove();
        res.status(200).send(nextMove);
    }
})

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})