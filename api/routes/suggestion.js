async function routes(fastify, options) {
    fastify.post('/api/v1/suggestion', async(request, reply) => {
        console.log(request.body)
        return { hello: 'world' }
    })
}

module.exports = routes