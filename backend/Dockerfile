# Backend
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20 AS runtime
WORKDIR /app
COPY --from=build /app /app
EXPOSE 5000
CMD ["node", "./dist/main.js"]
