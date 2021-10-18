
var URL_EMBARQUES = "http://localhost:5001/hamiltonrios-e760f/us-central1/app/api/embarques"
var localhost = "http://localhost:5001/hamiltonrios-e760f/us-central1/app"

async function postEmbarque(data) {
    $('post-embarque').on
}
async function loadEmbarques(data) {
    console.log(data)

    data.map( em => {
        let td = document.createElement('td')
        let d = new Date(Math.round(em.Data._seconds*1000))
        var $tr = $('<tr>').append(
            $('<td>').text(em.NomeCliente),
            $('<td>').text(em.NumFatura),
            $('<td>').text(`${d.getDate()} / ${d.getMonth()} / ${d.getFullYear()}`),
            $('<td>').text( parseCurrency(em.REAL) ),
            $('<td>').text( parseCurrency(em.USD)),
        );
        $('#embarques').append($tr)
    })
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            localStorage.setItem('latest', xmlHttp.responseText)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


function parseCurrency(val)
{
    let count = 0
    val = val.toString()
    for( var i = val.length - 1; i > 0; i--) {
        count++
        if( count >= 3 ) {
            val = val.substring(0, i) + ',' + val.substring(i,val.length)
            count = 0
        }
    }
    val = "$ " + val
    return val
}


async function getDolarExchangeRate() {
    $.ajax({
        url: localhost + '/api/dolar',
        success: function(data) {
            console.log('dolar' + data)
            $("#dolar").text(data)
        }
    })
}


getDolarExchangeRate()


// document.addEventListener('DOMContentLoaded', function() {
        

//     const loadEl = document.querySelector('#load');

//     const quotes = getBCBQuotes();
   
//   });