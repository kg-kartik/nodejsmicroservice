import bodyParser from 'body-parser';
import express from 'express';
const app = express();
import dotenv from 'dotenv';
import amqp from "amqplib";

app.use(bodyParser.json());

dotenv.config();

const PORTNUMBER: number = 5001;

var channel:any,connection:any;

connect();

async function connect () {
    try{
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("producer");
    }
    catch(err){
      console.log(err);
    }
}

const createSession = async (user:any) => {
  await channel.sendToQueue("producer",Buffer.from(JSON.stringify(user)));
  await channel.close();
  await connection.close();
}

app.post("/login",(req,res) => {
  const {user} = req.body;
  createSession(user);
  res.send(user);
})

app.listen(PORTNUMBER, (): void => {
  console.log(`Server is running on ${PORTNUMBER}`);
});
