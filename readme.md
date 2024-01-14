```
cp .env.example .env
npm i
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate dev
npm start
```