import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'
import {
  MemoryDB,
  addKeyword,
  createBot,
  createFlow,
  createProvider
} from '@bot-whatsapp/bot'

// Constants
const PORT_DEFAULT = 3000

// Functions
const initBotServer = async () => {
  const flowBienvenida = addKeyword('hola').addAnswer('buenas! bienvenido')
  const port: number = parseInt(process.env.PORT || String(PORT_DEFAULT), 10)

  const provider = createProvider(BaileysProvider)
  await createBot({
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider
  })

  provider.initHttpServer(port)
  setupMessageEndpoint(provider)
}

const setupMessageEndpoint = (provider: any) => {
  provider.http.server.post(
    '/send-message',
    handleCtx(async (bot, req, res) => {
      const { message, phone } = req.body

      await bot.sendMessage(String(phone), message, {})
      res.end('se envió el mensaje.')
    })
  )
}

// Main function
const main = async () => {
  try {
    await initBotServer()
  } catch (error) {
    console.error('Error initializing bot:', error)
  }
}

// Run main function
main()
