FROM node:latest

RUN mkdir /msvc-node
WORKDIR /msvc-node

# install app dependencies
ENV PATH /msvc-node/node_modules/.bin:$PATH
ADD package.json /msvc-node/package.json
RUN npm install

# start app
CMD ["npm", "run","prod"]