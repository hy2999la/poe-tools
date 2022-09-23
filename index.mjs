import Fastify from 'fastify';
import cors from '@fastify/cors';
import fetch from 'node-fetch';

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: [/http:\/\/localhost:*/, /http:\/\/127.0.0.1:*/],
});

fastify.post('/tradeSearch', function (request, reply) {
  console.log(request.body);
  console.log(JSON.stringify(request.body));
  fetch('https://www.pathofexile.com/api/trade/search/Kalandra', {
    method: 'POST',
    body: JSON.stringify(request.body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    res.json().then((jsonBody) => {
      console.log(jsonBody);
      reply.send(jsonBody.id);
    });
  });
});

// Run the server!
fastify.listen({ port: 3000 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
