import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';

import Home from "../shared/Home/home";

const app = express(),
PORT = process.env.PORT || 8083;

app.use('^/$', (req, res, next)=>{
    const title = "Rick and Morty";
    return res.send(`
        <!DOCTYPE html>
        <head>
            <title>${title}</title>
            <link rel="stylesheet" href="/css/main.css"></link>
            <script src="/bundle.js" defer></script>
        </head>
        <body>
            <div id="root">${renderToString(<Home/>)}</div>
        </body>
        </html>`
    )
})

app.use(express.static("public"));

app.listen(PORT, ()=>{
    console.log("Express Server Online on ", PORT);
})