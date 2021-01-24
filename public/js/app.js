const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const data1Msg = document.querySelector('#data1')
const data2Msg = document.querySelector('#data2')

//errorMsg.textContent = 'Js content!'

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = search.value

    data1Msg.textContent = 'Loading...'
    data2Msg.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                data1Msg.textContent = data.error
            } else {
                data1Msg.textContent = data.location
                data2Msg.textContent = data.forecast
            }
        })
    })
})