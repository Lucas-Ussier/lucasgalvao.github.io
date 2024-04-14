function enviarPedido(){
    var mesa = document.getElementById('mesa');
    var garcom = document.getElementById('garcom');
    var opcaoLanche = document.getElementsByName('lanche');
    var opcaoBebida = document.getElementsByName('bebida');
    var obs = document.getElementById('obs');
    var opcaoL = 'teste'
    var opcaoB = 'teste'

    for (let i = 0; i < opcaoLanche.length; i++) {
        const element = opcaoLanche[i];
        if (element.checked){
            opcaoL = element.id
        } 
    }

    for (let i = 0; i < opcaoBebida.length; i++) {
        const element = opcaoBebida[i];
        if (element.checked){
            opcaoB = element.id
        } 
    }

    var info = `{"mesa":${mesa.value}, "garcom": "${garcom.value}", "lanche": "${opcaoL}", "bebida": "${opcaoB}", "obs": "${obs.value}"}` 
    var json = JSON.parse(info)
    console.log(json)

    envioDados(json)
}

function getDados() {
    fetch('http://localhost:3000/pedidos')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
  }

  function envioDados(dados){
    fetch('http://localhost:3000/pedidos',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(dados => console.log(dados))
    .catch(e => console.log(e))
  }

  window.onload = function(){
    fetch('http://localhost:3000/pedidos')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
        document.getElementById('tabela').innerHTML += `<tr>
    <td>${data[i].mesa}</td>
    <td>${data[i].garcom}</td>
    <td>${data[i].lanche}</td>
    <td>${data[i].bebida}</td>
    <td>${data[i].obs}</td>
    </tr>`
        }
    })
    .catch(error => console.error(error))

    
  }