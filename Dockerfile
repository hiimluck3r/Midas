#First stage
FROM node:20-alpine as BUILD_IMAGE
WORKDIR /app/midas

COPY package.json .
RUN npm install && npm install @emotion/react @emotion/styled

COPY . .
RUN npm run build

#Second stage
FROM node:20-alpine as PROD_IMAGE
WORKDIR /app/midas

COPY package.json .
COPY vite.config.js .
COPY --from=BUILD_IMAGE /app/midas/dist/ /app/midas/dist/

EXPOSE 8080
CMD ["npm", "run", "preview"]