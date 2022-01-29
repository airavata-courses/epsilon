# nucleus-api-gateway #

### What is this repository for? ###

* API Gateway for Nucleus Web Application (https://nucleus.leadschool.in)

### How do I get set up? ###

* [Install NodeJS 10.x](https://nodejs.org/dist/latest-v10.x/)
* Install dependencies using `npm i`
* Run development build with `node index.js`
* Config file options: .env
* Change base routes in the env in the section Axios to point Micro services to either local or on dev servers.
* Run production standards compatible processes with: `pm2 start index.js --name nucleus-api-gateway -i 4 --kill-timeout 30000 --wait-ready --merge-logs --log-date-format YYYY-MM-DD_HH-mm-ss`

### Who do I talk to? ###

* pramod.bhakta@leadschool.in
* sagar@leadschool.in
* amrish.kumar@leadschool.in

