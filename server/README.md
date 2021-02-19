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