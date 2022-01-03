FROM node:17.0.1
WORKDIR /BOT-02
COPY package.json /BOT-02
RUN npm install
COPY . /BOT-02
CMD npm start