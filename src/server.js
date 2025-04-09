const cluster = require('cluster');
const os = require('os');
const logger = require('./logger');
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  logger.info(`🧠 Processo mestre. PID: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  require('./app')
  logger.info(`🔧 Worker iniciado. PID: ${process.pid}`);
}
