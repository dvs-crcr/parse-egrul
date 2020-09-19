const bent = require('bent')

module.exports = new class {
    /** Получение сведений из ЕГРЮЛ/ЕГРИП по номеру ИНН */
    getEgrul(inn) {
        return new Promise((resolve, reject) => {
            this.getToken(inn).then(async (token) => {
                if (token) {
                    let data = await this.getInnData(token)
                    if (data.length > 0) {
                        resolve(data)
                    } else {
                        reject({error: 'no data'})
                    }
                } else {
                    reject({error: 'no token'})
                }
            })
        })
    }
    /** Получение токена с сайта egrul.nalog.ru для осществления запроса */
    async getToken(inn) {
        let data = {
            query: inn.toString(),
            vyp3CaptchaToken: '',
            page: '',
            region: '',
            PreventChromeAutocomplete: ''
        }
        let post = bent('https://egrul.nalog.ru/', 'POST', 'json', 200)
        let response = await post('', data)
        return (typeof response.t !== 'undefined' ? response.t : false)
    }
    /** Получение сведений из ЕГРЮЛ/ЕГРИП по токену */
    async getInnData(token) {
        let get = bent(`https://egrul.nalog.ru/search-result/${token}`, 'GET', 'json', 200)
        let response = await get('')
        return response.rows
    }
}
