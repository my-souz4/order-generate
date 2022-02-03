import cors from 'cors'
import express from 'express'

import { generate } from './controllers'
import { rabbitMQServer } from './RabbitMQServer'

const app = express()

app.use(cors())

app.get('/new-orders', (_req, res) => {
  const data = generate('single')

  rabbitMQServer.start()
    .then(() =>{
      rabbitMQServer.publish('amq.direct', 'marketplace', JSON.stringify(data))

      res.send('Sended to queue')
    })
})

app.listen(3569, () => {
  console.log('Listen on port 3569')
})
