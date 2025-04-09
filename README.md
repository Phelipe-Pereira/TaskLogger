# 🧠 Task Logger

Projeto desenvolvido na trilha de Node.js Intermediário do SENAI, com foco em processos paralelos, comunicação em tempo real e gerenciamento de logs em aplicações back-end.

## 🚀 Tecnologias utilizadas

- **Node.js**
- **Cluster e Child Processes**
- **Socket.IO**
- **PM2** (gerenciamento e monitoração de processos)
- **Winston** (log de eventos)
- **Express**
- **Ecosystem PM2 config**

---

## 📂 Estrutura do projeto

```
ot-07/
├── src/
│   ├── index.js
│   ├── logger.js
│   ├── worker.js
│   └── events/
│       ├── getTasks.js
│       ├── startWorker.js
│       ├── runCommand.js
│       └── chat.js
├── ecosystem.config.js
└── README.md
```

---

## ⚙️ Como rodar o projeto

### 1. Instalar as dependências
```bash
npm install
```

### 2. Rodar o projeto com PM2
```bash
pm2 start ecosystem.config.js
```

> ⚠️ Certifique-se de que o `index.js` está no caminho correto dentro do `ecosystem.config.js`

### 3. Acompanhar logs
```bash
pm2 logs
```

### 4. Parar ou deletar as instâncias
```bash
pm2 stop all     # Para todas
pm2 delete all   # Remove todas
```

---

## 📡 Eventos Socket.IO disponíveis

| Evento         | Descrição                           |
|----------------|-------------------------------------|
| `getTasks`     | Retorna tarefas em execução         |
| `startWorker`  | Inicia um novo processo worker      |
| `runCommand`   | Executa comandos no worker          |
| `chat`         | Canal de chat entre processos       |

---

## 📘 Aprendizados

- Utilização de **Cluster** e **Child Process** para paralelismo
- Gerenciamento de logs com **Winston**
- Configuração de processos com **PM2**
- Comunicação em tempo real via **WebSocket (Socket.IO)**

---

## 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais no curso de **Análise e Desenvolvimento de Sistemas (SENAI)**.
