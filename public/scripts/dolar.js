
async function getDolarFromDatabase() {
    let URL = 'https://us-central1-hamiltonrios-e760f.cloudfunctions.net/default/api/vars'
    console.log("searching database for dolar data ...")

    $("#dolar").text("aguarde...")
    $("#dolar-timestamp").text("procurando valor do dolar no banco de dados")
    $.ajax({
        type:"GET",
        url: URL,
        xhrFields: {
            withCredentials: true,
        },
        success: function (data) {

            console.log("dolar data retrieved from database successfuly.")
            console.log(data)

            let quote = data['DOLAR']['dolar_quote']
            let timestamp = data['DOLAR']['dolar_timestamp']

            localStorage.setItem("dolar_quote", quote )
            localStorage.setItem("dolar_timestamp", timestamp )

            let from = new Date(parseInt(timestamp))
        
            let hours = from.getHours()
            let minutes = from.getMinutes() < 10 ? "0" + from.getMinutes() : from.getMinutes()
            let date = from.getDate()
            let month = from.getMonth() + 1
            let str = `Desde ${date}/${month} @ ${hours}:${minutes} `

            $("#dolar").text(quote)
            $("#dolar-timestamp").text(str)

            return data
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
    $("#dolar-timestamp").text(dt)


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
        let now = new Date( tmstmp )
        let hours = now.getHours()
        let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
        let date = now.getDate()
        let month = now.getMonth() + 1
        let str = `custom data set @ ${hours}:${minutes} - ${date} ${month} `

        localStorage.setItem('dolar_quote', value)
        localStorage.setItem('dolar_timestamp', str )

        obj = {
            "KEY": "DOLAR",
            "VALUE": {
                "dolar_quote": `${value}`,
                "dolar_timestamp":`${tmstmp}`
            }
        }

        let URL = 'https://us-central1-hamiltonrios-e760f.cloudfunctions.net/default/api/vars'
        console.log(obj);
        $.ajax({
            url: URL,
            type: "POST",
            data: JSON.stringify(obj),
            dataType: "application/json",
            encode: true,
            xhrFields: {
                withCredentials: true
              }, 
            success: (sent) => {
                console.log("custom dolar data saved successfuly.")
                console.log(sent)
                
                $("#dolar").text(value)
                $("#dolar-timestamp").text(str)
                
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