#First stage
FROM node:20-alpine as BUILD_IMAGE
WORKDIR /app/midas-backend

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

#Second stage
FROM node:20-alpine as PROD_IMAGE
WORKDIR /app/midas-backend

COPY package.json .
RUN npm install
COPY --from=BUILD_IMAGE /app/midas-backend/dist/ /app/midas-backend/dist/

EXPOSE 4000
CMD ["npm", "run", "start"]