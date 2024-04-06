FROM node

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 3344

CMD ["npm", "run", "dev"]