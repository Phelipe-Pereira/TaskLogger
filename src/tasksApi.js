async function getTarefasFalsas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, titulo: "Processar dados" },
        { id: 2, titulo: "Rodar relatório" },
      ]);
    }, 2000);
  });
}

module.exports = getTarefasFalsas;