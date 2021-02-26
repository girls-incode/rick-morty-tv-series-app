## Rick & Morty TV Series

React-Express app that consume the public API of Rick & Morty: https://rickandmortyapi.com
## Features

-  Login & Register with JWT
    - users need to be authenticated to use the app and the auth have to keep the state between reloads
    - users login info should be stored in a DB

- List all characters

- Character detail view
    - it has a button to add or remove the character to a fav list (it should be reflected on DB)
## Run Locally
- `git clone`
- Execute the development version: `npm run start:dev` or the production one: `npm run start`

## Connect to mongodb
```
mongo "mongodb+srv://gis:zv4nAmeaezmdbpmD@cluster0.93qlc.mongodb.net/rickmorty"
# check the collections and their documents
show dbs
use rickmorty
show collections
db.createCollection("users")
db.createCollection("refreshtokens")
db.users.find({}).pretty()
db.refreshtokens.find({}).pretty()
db.users.drop()
db.refreshtokens.drop()
```
## Tech Stack
- [x] Express
- [x] Typescript
- [x] React
- [x] Redux Toolkit
- [x] Jsonwebtoken
- [x] Mongoose
- [x] Swagger
- [x] SASS
## To be done
- Make an Authorization Server and a Requests Server, so 2 microservices with separate responsabilities
  and maybe run them in docker containers
- Add ip and device infos in DB for auth operations
- Use passport.js to easily add social media login options
- Add more unit & integration tests
- Lazy load the images & components
- Memoize Components
- Add Search by name + Filter by: gender, species, location, status(alive/dead) - redux-observable ?
- Improve SEO with React Helmet
- Add storybook.js