import express from 'express'
import fetch from 'node-fetch'
import NodeCache from 'node-cache'

const cache = new NodeCache({stdTTL: 10});

const app = express();

const url = 'https://jsonplaceholder.typicode.com/todos';

app.get('/todos', (req, res) => {
    if(cache.has('Todos')){
        console.log('from cache');
        return res.send(cache.get('Todos'));
    }else{
        fetch(url)
            .then(res => res.json())
            .then(data => {
                cache.set('Todos', data);
                console.log('from fetch');
                res.send(data);
            })
    }
});

app.get('/stats', (req, res) => {
    res.send(cache.getStats())
});

app.listen(5000, () => {
    console.log('Listening on port 5000')
});