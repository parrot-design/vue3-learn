const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '..')+'/packages'));

app.get('/vue3-demo1', (req, res) => {
    res.sendFile(path.join(__dirname, '..') + '/example/vue3-demo1.html');
});

app.get('/1-reactivity', (req, res) => {
    res.sendFile(path.join(__dirname, '..') + '/example/1-reactivity.html');
});

app.listen(8888,()=>{
    console.log("Server started on http://localhost:8888");
})