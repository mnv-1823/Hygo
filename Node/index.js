let url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });