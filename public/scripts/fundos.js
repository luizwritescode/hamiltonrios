async function loadFundos(data, status, xhr) {

    await getDolarQuote();
    let dolar_timestamp = localStorage.getItem("dolar_timestamp")
    let dolar_quote = localStorage.getItem("dolar_quote")
    $("#dolar").text(dolar_quote)
    $("#dolar-timestamp").text(dolar_timestamp)


    Object.values(data).map(fundo => {
      let td = document.createElement('td')

      var $tr = $('<tr>').append(
        $('<td>').text(fundo.Nome),
        $('<td>').text(parseCurrency(parseFloat(fundo.REAL).toFixed(2))),
        $('<td>').text(parseCurrency(parseFloat(fundo.REAL * 1 / dolar_quote).toFixed(2)))
      );
      $('#fundos').append($tr)

      let option = document.createElement('option')
      option.value = fundo.Nome
      option.innerText = fundo.Nome

      $('#edit-fundos').append(option)
    })

    localStorage.setItem('fundos', JSON.stringify(data))
  }

  async function postNewFund(data) {

    $.ajax({
      type: "POST",
      url: URL_FUNDOS,
      data: JSON.stringify(data),
      contentType: "json",
      dataType: "application/json",
      success: function (d) {
        console.log(d)
      },
      error: function (e) {
        console.log(e)
      },

    })
  }
