FROM node:24-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm update
EXPOSE 8080
CMD ["npm", "run", "dev"]