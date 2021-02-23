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
