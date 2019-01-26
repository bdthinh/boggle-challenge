const serveStatic = require('serve-static');
const express = require('express');
const path = require('path');

const { mime } = serveStatic;
const app = express();

function renderPartial(req, res) {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
}

const ONE_MONTH_IN_SECONDS = 2592000;

const gzipAssetsRegex = /\.js$|\.css$|\.eot?.+$|\.ttf?.+$|\.woff?$|\.svg?.+$/;
function serveGzip(req, res, next) {
  const type = mime.lookup(req.path);
  const charset = mime.charsets.lookup(type);

  // eslint-disable-next-line immutable/no-mutation
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.setHeader('Content-Type', type + (charset ? `; charset=${charset}` : ''));
  res.setHeader('Cache-Control', `public, max-age=${ONE_MONTH_IN_SECONDS}`);
  res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
  next();
}

const cachedAssetsRegex = /\.png$|\.jpg$|\.jpeg$/;
function serveCachedControl(req, res, next) {
  res.setHeader('Cache-Control', `public, max-age=${ONE_MONTH_IN_SECONDS}`);
  res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());

  next();
}

app.get(gzipAssetsRegex, serveGzip);
app.get(cachedAssetsRegex, serveCachedControl);

app.use(express.static('build'));

app.set('port', (process.env.PORT || 3003));

app.get('*', renderPartial);

app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Node app is running on port:${app.get('port')}`);
});
