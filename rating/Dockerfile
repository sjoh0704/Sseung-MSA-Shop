FROM node:12.18.1

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --production

CMD ["node", "app.js"]

EXPOSE 8081
