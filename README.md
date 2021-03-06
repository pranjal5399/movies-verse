# Moviesverse

A movie library web application where you can get info about movies and add them to your playlist. In order to create a list, you must have an account.

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.

## Features

- Users can create and view playlists
- Users can search for movies and add them to their playlist
- Only public playlists are accessible to other users

## Run it locally

1. Install [mongodb](https://www.mongodb.com/)
2. Create an OMDb account to get an API key

```
git clone https://github.com/pranjal5399/movies-verse
cd movies-verse
npm install
```

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:

```
MONGO_URL='<url>'
API_KEY='<key>'
APP_SECRET='<secret>'
```

Run `mongod` in another terminal and `node app.js` in the terminal with the project.

Then go to [localhost:3000](http://localhost:3000/).

Check [this](https://movies-verse.herokuapp.com/) out for hosted version of the website.
