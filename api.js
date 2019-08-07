const Axios = require('axios');

const client = Axios.create({
    baseURL:"http://10.0.2.2:3000",
    Headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
})

exports.verifyGoogle = (token) => {
    return client.post('/verifyGoogle',{token:token});
}

exports.hello = () => {
    return client.get('/');
}