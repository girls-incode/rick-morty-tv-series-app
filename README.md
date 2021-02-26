## Rick & Morty TV Series

React app that consume the public API of Rick & Morty: https://rickandmortyapi.com

### Features

-  Login & Register
    - users need to be authenticated to use the app and the auth have to keep the state between reloads
    - users login info should be stored in a DB

- List all character view

- Character detail view
    - it has a button to add or remove the character to a fav list (it should be reflected on DB)

### Run Locally
- `git clone`
- Run the development version: `npm run start:dev`
- or execute the production version: `npm run start:dev`
```
mongo "mongodb+srv://gis:zv4nAmeaezmdbpmD@cluster0.93qlc.mongodb.net/rickmorty"
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

### To improve
- make an Authorization Server and an Requests Server, 2 microservices with separate responsabilities
- add ip and device infos for auth operations
- use passport.js to easily add social media login options
