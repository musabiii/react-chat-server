### Instant chat server side

client side https://github.com/musabiii/react-chat-client
#### commands
start app
```bash
npm start
```

run dev
```bash
npm run dev
```

create container by Dockerfile
```bash
docker build .
```

create container by docker-compose.yml
```bash
docker-compose up -d
```

recreate container with no cash
```bash
docker-compose up --force-recreate
```

#### description
the server side of Instant chat.

If you use docker-compose way to deploy app, you can change the `network` of docker-compose.yml to add the container to your exist network with NGINX or other reverse proxy server

