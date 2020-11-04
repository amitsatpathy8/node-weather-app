//console.log('Client site java script is loaded up!!')
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=cuttuck').then((response) => {
//     response.json().then((data) =>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messgaeTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value 
    messageOne.textContent = 'Loading...'
    messgaeTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                //console.log(data.error)
                messageOne.textContent = data.error
            }else{
                //console.log(data)
                messageOne.textContent = data.location
                messgaeTwo.textContent = data.forcast
            }
        })
    })
})