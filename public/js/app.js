$('#pay').on('click', function(event) {
   // console.log("entre");
    event.preventDefault(); // prevent the Browser from refreshing
    const _title = $('#title').text();
    const _price = parseInt($('#price').text());
    const _unit = parseInt($('#unit').text());
    var _imgsrc = $('#img').attr('href');
    _imgsrc = _imgsrc.replace("./", "")

    $.ajax({
        url: '/pay',
        method: 'POST',
        data: {
            title: _title,
            price: _price,
            unit: _unit,
            imgsrc: _imgsrc,
        }
    })
    .then(function (response) {
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        //console.log("pase");
       // console.log(response);
        window.location.href = response;
    }).catch(function (error) {
        console.log(error);
        alert(error);
    });
});

$('#home').on('click', function(event) {
    //console.log("entre");
    event.preventDefault(); // prevent the Browser from refreshing
    window.location.href ="/"
});
$('#home_pending').on('click', function(event) {
   // console.log("entre");
    event.preventDefault(); // prevent the Browser from refreshing
    window.location.href ="/"
});