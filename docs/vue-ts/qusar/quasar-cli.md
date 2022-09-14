# quasar-cli

## 初始化项目

```bash
yarn global add @quasar/cli # optional
yarn create quasar
quasar dev # need to globally install the @quasar/cli
# or
yarn dev # need to write npm scripts in package.json
# or
yarn qusar dev
```

Quasar CLI (`@quasar/cli`) works in tandem with either `@quasar/app-vite` or `@quasar/app-webpack`

- The first one is optional and allows you to run Quasar CLI commands directly.
- The second package is the heart of it and it gets installed locally into every Quasar project folder.

If you want independence of the globally installed @quasar/cli package, you need to write npm scripts (in your `package.json`) to run Quasar commands.

```json
// package.json
"scripts": {
  "dev": "quasar dev",
  "build": "quasar build",
  "build:pwa": "quasar build -m pwa"
}
```
