import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'
import {
  MemoryDB,
  addKeyword,
  createBot,
  createFlow,
  createProvider
} from '@bot-whatsapp/bot'

const flowBienvenida = addKeyword('hola').addAnswer('buenas! bienvenido')

const main = async () => {
  const provider = createProvider(BaileysProvider)

  await createBot({
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider
  })

  provider.initHttpServer(3000)

  provider.http.server.post(
    '/send-message',
    handleCtx(async (bot, req, res) => {
      const body = req.body
      const message = body.message
      const phone = body.phone

      await bot.sendMessage('573217442971', 'pepe hola hola', {})

      // await bot.sendMessage(phone, message, {})

      res.end('se envio')
    })
  )
}

main()
