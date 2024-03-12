FROM node:20-alpine as PROD_IMAGE
WORKDIR /app/midas-backend

COPY . .
RUN npm install

EXPOSE 4000
EXPOSE 3000
ENTRYPOINT ["sh", "entrypoint.sh" ]
CMD ["npm", "run", "start"]