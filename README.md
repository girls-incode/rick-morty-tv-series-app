## Rick & Morty TV Series

React-Express app that consume the public API of Rick & Morty: https://rickandmortyapi.com

<kbd><img src="https://github.com/girls-incode/rick-morty-tv-series-app/blob/master/assets/rick-morty-tv-series-app-list.jpg" alt="" /></kbd>
<br/><br/>
<kbd><img src="https://github.com/girls-incode/rick-morty-tv-series-app/blob/master/assets/rick-morty-tv-series-app-detail.jpg" alt="" /></kbd>
<br/><br/>
<kbd><img src="https://github.com/girls-incode/rick-morty-tv-series-app/blob/master/assets/rick-morty-tv-series-app-register.jpg" alt="" /></kbd>
<br/><br/>
<kbd><img src="https://github.com/girls-incode/rick-morty-tv-series-app/blob/master/assets/rick-morty-tv-series-app-login.jpg" alt="" /></kbd>
<br/><br/>
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

## API endpoints
- http://localhost:4000/api/v1/user/login
- http://localhost:4000/api/v1/user/register
- http://localhost:4000/api/v1/user/refresh-token
- http://localhost:4000/api/v1/user/logout
- http://localhost:4000/api/v1/user/add-favorite
- http://localhost:4000/api/v1/user/remove-favorite

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
