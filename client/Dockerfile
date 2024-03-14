FROM node:20
WORKDIR /app/midas

COPY . .
RUN npm install && npm install @emotion/react @emotion/styled axios

EXPOSE 5173
CMD ["npm", "run", "dev"]