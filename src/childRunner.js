const { exec } = require("child_process");
const { logger } = require("./logger");

const comando = process.platform === "win32" ? "dir" : "ls -l";

exec(comando, (error, stdout, stderr) => {
  if (error) {
    logger.error(`❌ Erro ao executar comando: ${error.message}`);
    return;
  }

  if (stderr) {
    logger.error(`⚠️ Erro na execução do comando: ${stderr}`);
    return;
  }

  logger.info(`📂 Resultado do comando "${comando}":\n`);
  if (stdout.trim()) {
    logger.info(stdout);
  } else {
    logger.info("📭 Sem resultados para exibir.");
  }
});
