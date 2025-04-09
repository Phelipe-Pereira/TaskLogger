const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { exec } = require('child_process');
const { Worker } = require('worker_threads');
const { getTarefasFalsas } = require('./tasksApi');
const logger = require('./logger');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

io.on('connection', (socket) => {
  logger.info(`📥 Cliente conectado: ${socket.id}`);

  socket.on('getTasks', async () => {
    logger.info(`📋 Evento: getTasks`);
    const tasks = await getTarefasFalsas();
    socket.emit('tasksList', tasks);
  });

  socket.on('runCommand', (comando) => {
    logger.info(`💻 Evento: runCommand → ${comando}`);
    exec(comando, (error, stdout, stderr) => {
      if (error) {
        logger.error(`Erro: ${error.message}`);
        socket.emit('resultadoComando', `Erro: ${error.message}`);
        return;
      }
      socket.emit('resultadoComando', stdout || stderr);
    });
  });

  socket.on('startWorker', (data) => {
    logger.info(`🧵 Evento: startWorker → dados: ${JSON.stringify(data)}`);
    const worker = new Worker('./worker.js');

    worker.postMessage(data);
    worker.on('message', (res) => {
      socket.emit('resultadoWorker', res);
    });
    worker.on('error', (err) => {
      logger.error(`Erro no worker: ${err.message}`);
    });
  });

  socket.on('chat', (msg) => {
    logger.info(`💬 Evento: chat → ${msg}`);
    socket.broadcast.emit('chat', msg);
  });

  socket.on('disconnect', () => {
    logger.info(`❌ Cliente desconectado: ${socket.id}`);
  });
});

app.get('/', (req, res) => {
  res.render('index'); // Isso procura views/index.ejs
});

server.listen(3000, () => {
  logger.info(`🚀 Servidor Socket.IO rodando na porta 3000 [PID ${process.pid}]`);
});
