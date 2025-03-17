function validaSeExisteTarefasNoLocalStorageEMostraNaTela() {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        listaTarefas.forEach(tarefa => {
            const listaTarefas = document.getElementById('lista_de_tarefas')
            const novoItem = document.createElement('li')
            novoItem.innerText = tarefa.descricao
            novoItem.id = tarefa.id
            novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id, tarefa.status))
            if (tarefa.status === 'fechada') {
               novoItem.style.textDecoration =  'line-through'    
            }
            listaTarefas.appendChild(novoItem)
        });
    }
}


function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
}

function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    // guarda o tamanho da lista de tarefas
    let qtdTarefas = listaTarefas.children.length

    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li')

    // adiciona o texto digitado no texto da tarefa
    novoItem.innerText = textoDaTarefa
    // adiciona um ID no novo elemento
    novoItem.id = `tarefa_id_${qtdTarefas++}`

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    listaTarefas.appendChild(novoItem)

    const tarefa = montaTarefa(novoItem.id, novoItem.innerText, 'aberta')
    adicionaTarefaAListaLocalStorage(tarefa)
}


function criaInputCheckBoxTarefa(idTarefa, status) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    if (status === 'fechada') {
        inputTarefa.checked = true
    }
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }
    mudaEstadoTarefaLocalStorage(idTarefa)
}

function mudaEstadoTarefaLocalStorage(idTarefa) {
    const localStorage = window.localStorage
    if (localStorage.getItem('lista_tarefas') != null) {
        const listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
        let contador = 0
        listaTarefas.forEach(tarefa => {
            if (tarefa.id === idTarefa) {
                if (tarefa.status === 'aberta') {
                    tarefa.status = 'fechada'
                } else {
                    tarefa.status = 'aberta'
                }
                console.log(tarefa)
            }
            localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
            contador++
        });

    }
}

function adicionaTarefaAListaLocalStorage(tarefa) {
    const localStorage = window.localStorage
    let listaTarefas = []
    if (localStorage.getItem('lista_tarefas') != null) {
        listaTarefas = JSON.parse(localStorage.getItem('lista_tarefas'))
    }
    listaTarefas.push(tarefa)
    localStorage.setItem('lista_tarefas', JSON.stringify(listaTarefas))
}

function montaTarefa(idTarefa, textoTarefa, status) {
    return {
        id: idTarefa,
        descricao: textoTarefa,
        status: status
    }
}

// ao script ser carregado roda essa funcao
validaSeExisteTarefasNoLocalStorageEMostraNaTela()