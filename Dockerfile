FROM --platform=linux/amd64 node:latest

RUN mkdir /epsilon-api-gtw
WORKDIR /epsilon-api-gtw

# install app dependencies
ENV PATH /epsilon-api-gtw/node_modules/.bin:$PATH
ADD package.json /epsilon-api-gtw/package.json
RUN npm install

# start app
COPY . .
CMD ["npm", "run","prod"]