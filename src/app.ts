import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'
import {
  MemoryDB,
  addKeyword,
  createBot,
  createFlow,
  createProvider
} from '@bot-whatsapp/bot'

const flowBienvenida = addKeyword('hola').addAnswer('buenas! bienvenido')
const port: number = parseInt(process.env.PORT || '3000', 10)
const main = async () => {
  const provider = createProvider(BaileysProvider)

  await createBot({
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider
  })

  provider.initHttpServer(port)

  provider.http.server.post(
    '/send-message',
    handleCtx(async (bot, req, res) => {
      const body = req.body
      const message = body.message
      const phone = body.phone
      await bot.sendMessage(String(phone), message, {})
      res.end('se envio mensaje')
    })
  )
}

main()
