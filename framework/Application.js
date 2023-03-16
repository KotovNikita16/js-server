const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method =>{
                this.emitter.on(this._getRoutMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                });
            });
        });
    }

    _createServer() {
        return http.createServer((req, res) => {
            req.body = "";
            req.on('data', chunk => {
                req.body += chunk;
            });

            req.on('end', () => {
                this.middlewares.forEach(middleware => middleware(req, res));
                const emitted = this.emitter.emit(this._getRoutMask(req.pathname, req.method), req, res);
                if (!emitted) {
                    res.writeHead(404, { 'content-type': 'text/html' });
                    res.end('Page not found: 404.');
                }
            });
        });
    }

    _getRoutMask(path, method) {
        return `[${path}]:[${method}]`;
    }
}