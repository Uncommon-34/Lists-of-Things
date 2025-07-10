# in future i would bind all src folders and public folders to a external storage
# instead of in the image to allow easier updateing and addition of information
FROM node:20-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /usr/src/app/backend
RUN npm install

WORKDIR /usr/src/app/frontend
RUN npm install

WORKDIR /usr/src/app

EXPOSE 5173

CMD ["npm", "run", "start"] 