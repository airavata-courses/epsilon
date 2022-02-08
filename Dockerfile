FROM node:latest

RUN mkdir /msvc-users
WORKDIR /msvc-users

# install app dependencies
ENV PATH /msvc-users/node_modules/.bin:$PATH
ADD package.json /msvc-users/package.json
RUN npm install
COPY . .
# start app
CMD ["npm", "run","prod"]