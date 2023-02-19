import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { ChatGPTAPI } from 'chatgpt'

interface RequestMessage {
    conversationId?: string;
    previousMessageId?: string;
    text: string;
}

interface ResponseMessage {
    conversationId: string;
    messageId: string;
    text: string;
    code: number;
}

const PORT: number = 3001;
const MAX_INCOMING_TEXT = 256;

const app: Application = express();
const router = express.Router()
const chatgptApi = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY as string
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/messages", (req, res) => {
    const requestMessage = req.body as RequestMessage;
    if (requestMessage.text.length > MAX_INCOMING_TEXT) {
        res.status(400).send({
            text: "消息内容超限",
            code: 1
        })
    }

    if (!requestMessage.conversationId) {
        chatgptApi.sendMessage(requestMessage.text).then(openaiRes => {
            let reply: ResponseMessage = {
                conversationId: openaiRes.conversationId as string,
                messageId: openaiRes.id,
                text: openaiRes.text,
                code: 0
            }
            res.send(reply)
            return res
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                text: err,
                code: 1
            })
        })
    } else {
        chatgptApi.sendMessage(requestMessage.text, {
            conversationId: requestMessage.conversationId,
            parentMessageId: requestMessage.previousMessageId
        }).then(openaiRes => {
            let reply: ResponseMessage = {
                conversationId: openaiRes.conversationId as string,
                messageId: openaiRes.id,
                text: openaiRes.text,
                code: 0
            }
            res.send(reply)
            return res
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                text: err,
                code: 1
            })
        })
    }
})

app.use('/gpt3/api', router)

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
