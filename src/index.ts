import express from 'express'
import faker from 'faker'
import cors from 'cors'

import { rabbitMQServer } from './RabbitMQServer'
import { generate } from './controllers'

const app = express()

app.use(cors())

app.get('/new-orders', (_req, res) => {
  const data = generate()
  
  rabbitMQServer.start()
    .then(() =>{
      rabbitMQServer.publish('amq.direct', 'marketplace', JSON.stringify(data))

      console.log('Sended to queue')
    })

  res.send('Ok')
})

app.listen(3569)
