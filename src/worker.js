const { parentPort } = require('worker_threads');

function somaFalsa(num1, num2) {
    return num1 + num2
};

parentPort.on('message', (data) => {
    const { numeroUm, numeroDois} = data;
    
    const resultado = somaFalsa(numeroUm, numeroDois);
    
    setTimeout(() => {
        parentPort.postMessage({ resultado });
    }, 2000)
});