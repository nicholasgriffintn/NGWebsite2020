FROM node:12
WORKDIR /app
COPY . /app
RUN npm run build:production
CMD npm run start
