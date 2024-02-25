const socket = io('http://localhost:8001')

//const username = prompt('Whats your username ?')
//const password = prompt('Whats your password ?')


socket.on('connect', () => {
    console.log('connected')
    socket.emit('client_connect')
})

socket.on('welcome', (data) => {
    console.log(data)
})

socket.on('list_namespaces', (nsData) => {
    const lastNsEndpoint = localStorage.getItem('lastNs')
    const nameSpacesDiv = document.querySelector('.namespaces')
    nameSpacesDiv.innerHTML = ""
    nsData.forEach((namespace) => {
        nameSpacesDiv.innerHTML += `<div class="namespace" id="${namespace.endpoint}" ns="${namespace.endpoint}"><img src="${namespace.image}"></div>`
    })

    const namespacesArray = Array.from(document.getElementsByClassName('namespace'))

    namespacesArray.forEach((element) => {
        element.addEventListener('click', () => {
            joinNs(element, nsData)
        })
    })

    if(lastNsEndpoint) {
        const lastNsElement = document.getElementById(lastNsEndpoint)
        if (lastNsElement) {
            joinNs(lastNsElement, nsData)
        } else {
            joinNs(namespacesArray[0], nsData)
        }
    } else {
        joinNs(namespacesArray[0], nsData)
    }
})