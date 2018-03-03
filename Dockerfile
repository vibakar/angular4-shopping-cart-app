FROM node:carbon
WORKDIR /usr
COPY package*.json /usr/
RUN npm install
COPY . /usr/
EXPOSE 3000
RUN npm run postinstall
CMD [ "npm", "start" ]