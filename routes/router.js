const express = require('express')
const router = express.Router()
const Biblia = require('../database/databiblia')

//// routes
router.get('/', (req, res) => {
    //console.log("rota '/' is [activy]")
    res.render('index')

})

router.get('/biblia', (req, res) => {
    var livros = Biblia('livros', 'livros')
    res.render('biblia', { livros: livros })
})

router.post('/biblia/livro', (req, res) => {
    var cap = Biblia(req.body.name, 'Cap')
    //console.log(req.body.name)
    res.render('capitulos',
        {
            livro: {
                name: req.body.name,
                capitulos: cap
            }
        })
})

router.post('/biblia/livro/capitulo', (req, res) => {
    var vers = Biblia(req.body.livro, req.body.cap)
    var newVers = []

    if (Number(req.body.cap) > 0) {
        res.render('vewCap',
            {
                livro: req.body.livro,
                capitulo: req.body.cap,
                versiculos: newVers
            })

    } else {
        console.log('deu erro')
        var cap = Biblia(req.body.livro, 'Cap')
        //console.log(req.body.name)
        res.redirect('/biblia')
    }
for (var i = 1; i < vers.length; i++) {
    newVers.push(vers[i])
}

})


//// export module
module.exports = router;