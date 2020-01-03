console.log('File Loded!')

const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const message = document.querySelector('#one')

message.textContent = '' 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = address.value
    message.innerHTML = '<h3>Searching for forecast...</h3>'
    fetch('/weather?addr=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message.innerHTML = '<h3>' + data.error 
                return
            }
            message.innerHTML = 'Place: ' + data.place + '<br>Temprature: ' + data.temprature + '<br>Probability of Rain: ' + data.precipProbability 
        })
    })
})