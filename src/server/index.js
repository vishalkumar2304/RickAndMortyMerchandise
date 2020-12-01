import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import routes from "../shared/routes";
import App from "../shared/App";
import sourceMapSupport from "source-map-support";

if (process.env.NODE_ENV === "development") {
  sourceMapSupport.install();
}

const app = express(),
PORT = process.env.PORT || 8083;

app.use('^/$', (req, res, next)=>{
    const activeRoute = routes.find(route => matchPath(req.url, route));
  
    const requestInitialData =
      activeRoute.component.requestInitialData && activeRoute.component.requestInitialData();
  
    Promise.resolve(requestInitialData)
      .then(initialData => {
        const context = { initialData },
        title = "Rick and Morty",
        markup = renderToString(
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        );
  
        res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
            <script>window.__initialData__ = ${serialize(initialData)}</script>
          </head>
          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
        `);
      })
      .catch(next);
  });

  app.use(express.static("public"));
  
  app.listen(PORT, ()=>{
      console.log("Express Server Online on ", PORT);
  })