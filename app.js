const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowImagen = addKeyword('imagen').addAnswer('te estoy enviando una imagen',{
    media:'https://i.imgur.com/C4heBzJ.jpeg'
})
const flowVolver = addKeyword(['volver','Volver'])
    .addAnswer('🙌 Hola bienvenido a este *Chat-Riboto*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto:',
            '',
            '👉 Escribe: *web* para ver nuestra página y servicios',
            '👉 Escribe: *videos*  para ver la lista de videos',
            '👉 Escribe: *imagen*  opcional',
            '👉 Escribe: *gracias*  para despedirte',
         ] 
 )
const flowPagina = addKeyword(['web','Web']).addAnswer(
    [
        '📄 Aquí esta nuestra página y buscar el servicio que necesitas',
        'https://noticias24venezuela.net/',
        '',
        'Escribir: *Volver* para regresar el menú principal' 
    ],
    null,
    null,
    [flowVolver ]   
 )

const flowVideo = addKeyword(['videos','Videos','video','Video']).addAnswer(
    ['🙌 Aquí encontras un ejemplo rapido de nuestros servicios',
        'https://www.youtube.com/results?search_query=marketing+digital',
        '',
        'Escribir: *Volver* para regresar el menú principal'
     ],
     null,
     null,
     [flowVolver ]  
    
 
)

 
const flowSecundario = addKeyword(['grac', 'gracias']).addAnswer(['vuelve pronto, estamos para servirte!'])

const flowPrincipal = addKeyword(['Hola','hola', 'ole', 'alo', 'hi', 'que hizo', 'tio','buenas'])
    .addAnswer('🙌 Hola bienvenido a este *Chat-Riboto*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto:',
            '',
            '👉 Escribe: *web* para ver nuestra página y servicios',
            '👉 Escribe: *videos*  para ver la lista de videos',
            '👉 Escribe: *imagen*  opcional',
            '👉 Escribe: *gracias*  para despedirte',
         ],
        null,
        null,
        [flowVideo, flowPagina ]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowSecundario,flowImagen])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
