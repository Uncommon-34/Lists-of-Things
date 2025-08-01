# I dont know how to make the env values a docker input sadly soooo youll need to make your own env and add then values then recompile the docker img. 
# After i learn docker compose ill try make a compose file with these images and learn how to take env values and put them in the image. 
# The compose will also run the postgres container and connect them.

FROM node:20-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /usr/src/app/lot-backend
RUN npm install

WORKDIR /usr/src/app/lot-frontend
RUN npm install

WORKDIR /usr/src/app

EXPOSE 5173

run npm run build

CMD ["npm", "run", "start"] 