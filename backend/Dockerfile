FROM node:20-alpine as PROD_IMAGE
WORKDIR /app/midas-backend

COPY . .
RUN npm install
RUN npm install nodemon


EXPOSE 4000
CMD ["npm", "run", "start"]