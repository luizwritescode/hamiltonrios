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
        let compra = data.value[0].cotacaoCompra
        let venda = data.value[0].cotacaoVenda
        let quote = (compra + venda) / 2

        localStorage.setItem('dolar_quote', quote.toFixed(3))
        localStorage.setItem('dolar_timestamp', data.value[0].dataHoraCotacao.split('.')[0])

        location.reload()

        console.log("dolar synced with data from @ ", today)

      },
      error: function (xhr, status, err) {
        return alert(err)
      }
    })
}
  
async function bindHtml(u, dq, dt) {

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
        await getDolarQuote()
    })

    $("#username").text(u.replace(/"/g, ""))

}



function saveCustomDolarQuote(value) {

    value = parseFloat(value)

    if( value )
    {
        let now = new Date()
        let hours = now.getHours()
        let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
        let date = now.getDate()
        let month = now.getMonth() + 1

        localStorage.setItem('dolar_quote', value.toFixed(2))
        localStorage.setItem('dolar_timestamp', `custom data set @ ${hours}:${minutes} - ${date} ${month} ` )
        location.reload()
        console.log("custom dolar data saved successfuly.")
    }
    else
    {
        console.log("error: invalid custom dolar data")
    }

}