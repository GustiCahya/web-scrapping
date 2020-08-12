const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


const getData = () => {
    // Write Headers
    const num = Math.floor((Math.random() * 10) + 1);
    const writeStream = fs.createWriteStream(`post_${num}.csv`);
    writeStream.write(`Id, Title, Link \n`);

    request('https://www.duniailkom.com/tutorial-belajar-javascript-dan-index-artikel-javascript/', 
        (error, response, html) => {
            if(!error && response.statusCode == 200){
                const $ = cheerio.load(html);
                // console.log($('header>.title').text());
                $('.list-tutorial a').each((i, elm) => {
                    const title = $(elm).text();
                    const link = $(elm).attr('href');

                    writeStream.write(`${i+1}, ${title}, ${link} \n`);
                });
            }
    })
}

setInterval(getData, 3000)
