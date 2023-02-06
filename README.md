# SnookersSellsFE

## Development

We utilize [Just](https://github.com/casey/just) to provide run config/recipes for building the application.

### Requirements

To run and develop the application we assume you have a Node version installed
that is compatible with the version specified in the package.json (`engine`).
Currently, that is the latest LTS (16).

### Dockerfile anatomy

The Dockerfile will do exactly two things (multi-staged):

1. Build a production build of the application.
2. Copy said build into a [Caddy](https://caddyserver.com/) image. Caddy is used to serve the frontend.
The next section describes why Caddy is needed and why it is preferred over e.g. nginx.

### Caddy to serve the frontend

The frontend build produces static assets which is good (we don't want to host a Node server that renders the app
for us). But those static assets need to be served via a production grade http/web server. Some come to mind here:
nginx, Traefik, Caddy, Apache, Lighttpd...

Caddy is just easy to set up, has a really easy to understand config file and is fast enough for most needs. Still
it is
sophisticated enough, to support reverse proxying the backend for our frontend.
When doing requests on the frontend, the question often is, which url I should request against. If the backend server
is on the same machine as the frontend server, you can simply request against localhost but that is not possible when
the server is somewhere else. That is where this directive from the Caddyfile comes into play:

```
route /api/* {
  uri strip_prefix /api
  reverse_proxy {$BACKEND_HOST}
}
```

So instead of doing something like this
```js
fetch("localhost:8123/api/orders")
```

you can simply fetch against the current *origin*:

```js
fetch("/api/orders")
```

Caddy will redirect this to whatever the environment variable `$BACKEND_HOST` is, i.e. `prod.ourcompany.com`, `dev.
ourcompany.com` or just `localhost:42069`.

The environment can be passed to the container of the frontend image.

### Building and running the frontend locally inside docker

The simplest thing to do is:

```shell
just run-image
```

which will build the image with a default image name and tag and then runs that image on a default port (8157).
You can specify the image name as a Just variable:

```shell
just image=my-image-name:tag run-image
```

**Run `just help` (or simply `just`) to get an overview over all args.**

Every parameter *after* the recipe is passed to the `docker run` command:

```shell
just image=my-image-name:tag run-image --volume=...
```

### Usage without Just

Simply open the *justfile* and copy the command and paste it into your terminal.
