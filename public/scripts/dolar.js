async function getDolarFromDatabase() {
    let URL = 'https://us-central1-hamiltonrios-e760f.cloudfunctions.net/default/api/vars'
    console.log("searching database for dolar data ...")

    $("#dolar").text("aguarde...")
    $("#dolar-timestamp").text("procurando valor do dolar no banco de dados")
    $.ajax({
        type:"GET",
        url: VARS_URL,
        xhrFields: {
            withCredentials: true,
        },
        success: function (data) {

            if(Object.keys(data).length > 0) {


            console.log("dolar data retrieved from database successfuly.")
            console.log(data)

            let quote = data['DOLAR']['dolar_quote']
            let timestamp = data['DOLAR']['dolar_timestamp']

            localStorage.setItem("dolar_quote", quote )
            localStorage.setItem("dolar_timestamp", timestamp )
            localStorage.setItem("dolar_set", true)

            $("#dolar").text(quote)
            $("#dolar-timestamp").text( parseDate(timestamp))

            return data
            }

            console.log('Empty data object');
            

        },
        error: function (err) {

            console.log(err)
           
        }

    })
}

async function getDolarQuote() {
    console.log('updating USD quote...')


    
    let now = new Date()
    let today = `${now.getMonth()}-${now.getDate()}-${now.getFullYear()}`


    let URL =
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${today}'&$top=100&$format=json`;

    $.ajax({
      type: "GET",
      url: URL,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function (data) {
          console.log(data);
        let compra = data.value[0].cotacaoCompra
        let venda = data.value[0].cotacaoVenda
        let quote = (compra + venda) / 2

        localStorage.setItem('dolar_quote', quote.toFixed(4))
        localStorage.setItem('dolar_timestamp', data.value[0].dataHoraCotacao.split('.')[0])

        //location.reload()

        console.log("dolar synced with data from @ ", today)

      },
      error: function (xhr, status, err) {
        return alert(err)
      }
    })
}
  
async function bindDolarHtml(dq, dt) {

    $("#dolar").text(dq)
    $("#dolar-timestamp").text( parseDate(dt) )


    $('#dolar').on('click', function (event) {
        event.target.classList.add('collapse')
        $("#sync-dolar").addClass('collapse')
        $("#edit-dolar").removeClass('collapse')
    })
    $('#edit-dolar-button').on('click', function (event) {
        $("#edit-dolar").addClass('collapse')
        $("#sync-dolar").removeClass('collapse')
        $("#dolar").removeClass('collapse')

        let val = $('#edit-dolar-input').val() 

        saveCustomDolarQuote(val)
    })

    $('#sync-dolar').on('click', async function (event) {
        await getDolarFromDatabase()
    })



}



async function saveCustomDolarQuote(value) {
    
    value = parseFloat(value)

    if( value )
    {
        let tmstmp = Date.now()

        localStorage.setItem('dolar_quote', value)
        localStorage.setItem('dolar_timestamp', tmstmp )

        obj = {
            "KEY": "DOLAR",
            "VALUE": {
                "dolar_quote": `${value}`,
                "dolar_timestamp":`${tmstmp}`
            }
        }

        console.log(obj);
        $.ajax({
            url: VARS_URL,
            type: "POST",
            data: obj,
            dataType: "json",
            encode: true,
            xhrFields: {
                withCredentials: true
              }, 
            success: (sent) => {
                console.log("custom dolar data saved successfuly.")
                console.log(sent)
                
                localStorage.setItem('dolar_set', true)
                $("#dolar").text(value)
                $("#dolar-timestamp").text( parseDate(tmstmp) )
                
            },
            error: (e) => {
                console.log(e);
            }
        })

    }
    else
    {
        console.log("error: invalid custom dolar data")
    }

}


function parseDate(timestamp)
{
    let from = new Date(parseInt(timestamp))
        
    let hours = from.getHours()
    let minutes = from.getMinutes() < 10 ? "0" + from.getMinutes() : from.getMinutes()
    let date = from.getDate()
    let month = from.getMonth() + 1
    return `Desde ${date}/${month} @ ${hours}:${minutes} `
}

function parseCurrency(val) {

    if(typeof(val) !="string")
      val = val.toString()
    
    let p = 0
    while(val[p] == '0') {
      val = val.substring(p+1, val.length)
      p++
    }

    let count = 0
    let decimal = val.split(".")[1] || "";
    val = val.split(".")[0].toString()
    for (var i = val.length - 1; i > 0; i--) {
      count++
      if (count >= 3) {
        val = val.substring(0, i) + ',' + val.substring(i, val.length)
        count = 0
      }
    }
    val = "$ " + val + "." + decimal
    return val
  }