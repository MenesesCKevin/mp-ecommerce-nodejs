// SDK de Mercado Pago
const mercadopago = require('mercadopago');
const bodyParser = require("body-parser");
const express = require('express');
const exphbs = require('express-handlebars');


// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
});

let app = express();
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const hbs = exphbs.create({
    helpers: {
        mercadopago: function (title, price, unit) {
            // Crea un objeto de preferencia
            
            return global.id;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/pay', function (req, res) {
    let title = req.body.title;
    let price= parseInt(req.body.price);
    let unit = parseInt(req.body.unit);
    let imgsrc = "https://menesesckev-mp-commerce-nodejs.herokuapp.com/" + req.body.imgsrc;
    //console.log(imgsrc);

    let preference = {
        collector_id : 617633181,
        items: [
            {
                id: "1234",
                title: title,
                currency_id: "MXN",
                picture_url: imgsrc,
                description: "Dispositivo móvil de Tienda e-commerce",
                category_id: "smartphones",
                title: title,
                unit_price: price,
                quantity: unit,
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
        auto_return: "approved",
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
        notification_url: "https://mercadokev.free.beeceptor.com/my/api/path",
        external_reference: "kevosmar.22@gmail.com"
    };
    //let id = await goToMercadoPago(preference);
    mercadopago.preferences.create(preference)
        .then(function (response) {
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            //console.log(response.body.init_point);
            res.json(response.body.init_point);
        }).catch(function (error) {
            res.json(error);
        });
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


