// SDK de Mercado Pago
const mercadopago = require('mercadopago');
var express = require('express');
var exphbs = require('express-handlebars');

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181'
});

var app = express();

function goToMercadoPago(preference) {
    return new Promise((resolve, reject) => {
        mercadopago.preferences.create(preference)
            .then(function (response) {
                // Este valor reemplazará el string "<%= global.id %>" en tu HTML
                global.id = response.body.id;
                console.log(global.id);
                resolve(global.id)
            }).catch(function (error) {
                reject(error);
            });
    });
}

const hbs = exphbs.create({
    helpers: {
        mercadopago: async function (title, price, unit) {
            console.log("entre")
            // Crea un objeto de preferencia
            let preference = {
                items: [
                    {
                        title: title,
                        unit_price: parseInt(price),
                        quantity: parseInt(unit),
                    }
                ]
            };
            let id = await goToMercadoPago(preference);
            console.log(id);
            return id
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', { title: 'Tienda e-commerce' });
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server start on port 5000"));


