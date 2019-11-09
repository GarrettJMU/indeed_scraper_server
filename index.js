const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const indeed = require('indeed-scraper')
var cors = require('cors')

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/the-goods', cors(), function (req, res) {
        console.log(req.query)

        let queryOptions = {
            host: 'www.indeed.com',
            query: req.query.query,
            city: 'San Diego, CA',
            radius: req.query.radius || 25,
            level: req.query.level,
            jobType: 'fulltime',
            maxAge: '7',
            sort: 'date',
            limit: 100
        };

        indeed.query(queryOptions).then(response => {
            res.send(response)
        })
    })
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
