const Egrul = require('./egrul')

// ИНН Компании
const company_inn = '1234567890'

// Получение данных из ЕГРЮЛ
Egrul.getEgrul(company_inn)
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })