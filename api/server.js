// CommonJs
const fastify = require('fastify')({
    logger: true
})

fastify.register(require('./routes/suggestion'))

fastify.listen(3000, function(err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})