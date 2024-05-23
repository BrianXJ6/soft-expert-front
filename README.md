# Instalação do projeto

Realize o clone do projeto para seu local de trabalho

```bash
git clone https://github.com/BrianXJ6/soft-expert-front.git
```

Na raiz da aplicação, execute o comando abaixo para ser possível instalar todas as dependências do projeto:

```bash
npm i
```

## Build

Após instalar as dependências, fica disponível todas as opções de build do projeto abaixo...

```
# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm run start

# generate static project
npm run generate
```

## Extra

Devido a aplicações frontend ter problemas com CORs para acessas outros sistemas internos, segue abaixo uma dica para evitar esse problema:

Edite as configurações de Proxy no arquivo `nuxt.config.js` na raiz do projeto, especificamente na linha 62, e altere o valor de `target` para o seu API host.

```javascript
proxy: {
 // Simple proxy
 '/api/': {
  target:  'http://localhost',
  pathRewrite: { '^/api/':  '' }
 }
},
```
