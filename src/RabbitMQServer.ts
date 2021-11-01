import { Channel, connect, Connection, Message } from 'amqplib'

class RabbitMQServer {
	public connection: Connection

	public channel: Channel

	public async start() {
		this.connection = await connect('amqp://admin:admin@localhost:5672')
		this.channel = await this.connection.createChannel()
	}

	public publish(exchange: string, routingKey: string, message: string) {
		return this.channel.publish(exchange, routingKey, Buffer.from(message))
	}

	public async consume(queue: string, callback: (message: Message) => void) {
		return await this.channel.consume(queue, (message) => {
			callback(message)

			this.channel.ack(message)
		})
	}
}

export const rabbitMQServer = new RabbitMQServer()
