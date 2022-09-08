import bodyParser from 'body-parser';
import express from 'express';
const app = express();
import dotenv from 'dotenv';
import amqp from "amqplib";

app.use(bodyParser.json());

dotenv.config();

const PORTNUMBER: number = 5002;

var channel:any,connection:any;

connect();
async function connect () {
    try{
      console.log("lol");
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("producer");

        channel.consume("producer",(data:any) => {
          console.log("data",data);
          console.log(`received ${Buffer.from(data.content)}`);
        })
    }
    catch(err){
      console.log(err);
    }
}

app.listen(PORTNUMBER, (): void => {
  console.log(`Server is running on ${PORTNUMBER}`);
});
