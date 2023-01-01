import * as dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import express from 'express';
import * as url from 'url';
import hbs from 'hbs';

// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express()
const port = process.env.PORT;

// Handlebars
app.set('view engine', 'hbs')
hbs.registerPartials( __dirname + '/views/partials')

// Servir contenido estatico
app.use( express.static('public') )

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Emanuel Reniero',
        titulo: 'Curso de Node'
    });
})

app.get('/generic', (req, res) => {
    res.render('generic')
})

app.get('/elements', (req, res) => {
    res.render('elements')
})

// app.get('/hola-mundo', (req, res) => {
//     res.send('Hola mundo en su respectiva ruta')
// })

// app.get('*', (req, res) => { // El * se usa para tirar un mensaje cuando no encuentra una pagina
//     res.sendFile( __dirname + '/public/404.html')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})