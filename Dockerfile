##PRIMERO: BUILD DE LA APLICACION
FROM node:14.20.0-alpine3.15 AS build
WORKDIR /LoginClient
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

##SEGUNDO: CONFIGURAR NGINX
FROM nginx:1.22.0-alpine AS prod-stage
COPY ==from=build /LoginClient/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]