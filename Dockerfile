FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

RUN npm run build

COPY . .

CMD [ "npm", "run", "prod" ]