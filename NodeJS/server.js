const { app, closeServer, runServer } = require('./index');

runServer(3001, 'mongodb://localhost:27017/university');

app.on('close', closeServer);
app.on('SIGTERM', closeServer);
