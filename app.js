// SDK de Mercado Pago
const mercadopago = require('mercadopago');
var express = require('express');
var exphbs = require('express-handlebars');

// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
});

var app = express();


const hbs = exphbs.create({
    helpers: {
        mercadopago: function (title, price, unit) {
            console.log("entre")
            // Crea un objeto de preferencia
            let preference = {
                collector_id : 617633181,
                items: [
                    {
                        id: "1234",
                        title: title,
                        currency_id: "MXN",
                        picture_url: "https://menesesckev-mp-commerce-nodejs.herokuapp.com/assets/003.jpg",
                        description: "Dispositivo móvil de Tienda e-commerce",
                        category_id: "smartphones",
                        title: title,
                        unit_price: parseInt(price),
                        quantity: parseInt(unit),
                    }
                ],
                payer: {
                    name: "Lalo",
                    surname: "Landa",
                    email: "test_user_81131286@testuser.com",
                    phone: {
                        area_code: "52",
                        number: 5549737300
                    },
                    address: {
                        street_name: "Insurgentes Sur",
                        street_number: 1602,
                        zip_code: "03940"
                    }
                },
                back_urls: {
                    success: "https://menesesckev-mp-commerce-nodejs.herokuapp.com/success",
                    failure: "https://menesesckev-mp-commerce-nodejs.herokuapp.com/failure",
                    pending: "https://menesesckev-mp-commerce-nodejs.herokuapp.com/pending"
                },
                payment_methods: {
                    excluded_payment_methods: [
                        {
                            id: "amex",

                        }
                    ],
                    excluded_payment_types: [
                        {
                            id: "atm"
                        }
                    ],
                    installments: 6
                },
                external_reference: "kevosmar.22@gmail.com"
            };
            //let id = await goToMercadoPago(preference);
            mercadopago.preferences.create(preference)
                .then(function (response) {
                    // Este valor reemplazará el string "<%= global.id %>" en tu HTML
                    global.id = response.body.init_point;
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            console.log(global.id);
            return global.id;
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

app.get('/success', function (req, res) {
    res.render('success', req.query);
});

app.get('/pending', function (req, res) {
    res.render('pending', req.query);
});

app.get('/failure', function (req, res) {
    res.render('failure', req.query);
});

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server start on port 5000"));


