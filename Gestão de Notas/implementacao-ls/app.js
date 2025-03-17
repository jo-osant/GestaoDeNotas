let listaTextos = []
// toda vez que pagina for executada a funcao abaixo vai ser chamada
lerTexto();
console.log(listaTextos)

function adicionarTexto() {
    const inputTexto = document.getElementById('texto')

    // inicio de trabalho com listas (array)
    listaTextos.push(inputTexto.value)
    console.log(listaTextos)

    // referenciando ao local storage da pagina
    const localStorage = window.localStorage
    localStorage.setItem('chave', JSON.stringify(listaTextos))
}

function lerTexto() {
    // referenciando ao local storage da pagina
    const localStorage = window.localStorage
    const data = localStorage.getItem('chave')
    if (data !== null) {
        listaTextos = JSON.parse(data)
    } else {
        console.log('Não foi encontrado valores no localstorage')
    }
}