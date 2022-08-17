import bodyParser from 'body-parser';
import express from 'express';
const app = express();
import dotenv from 'dotenv';

app.use(bodyParser.json());

dotenv.config();

const PORTNUMBER: number = parseInt(process.env.PORT);

app.get('/', (req, res) => {
  res.status(200).json({
    PORTNUMBER,
  });
});

console.log('lol');

app.listen(PORTNUMBER, (): void => {
  `Server is running on ${PORTNUMBER}`;
});
