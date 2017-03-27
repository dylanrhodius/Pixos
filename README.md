# Pixos
Pixos is a real-time multiplayer, turn-based card game inspired by [Gwent](http://witcher.wikia.com/wiki/Gwent) from [The Witcher 3](http://witcher.wikia.com/wiki/The_Witcher_3:_Wild_Hunt).

It is a full stack javascript app built with React, Redux and Socket-io.

[Click here to try out the demo on Heroku.](http://pixos.herokuapp.com/) (Using Chrome is recommended)

Click 'Learn the Rules!' on the homepage to get started. We recommend roping in a friend to matchmake against, but you can always play against yourself on separate browser tabs if you just want to test it out.

### Installation

Ensure you have MongoDB installed and available locally on port 27017, and you have updated to the latest stable versions of Node.js and npm.

You will also need a Facebook App ID and Secret to enable Facebook sign in. This can be set up via [Facebook Developers](https://developers.facebook.com/). Create a new app and set the site URL to `http://localhost:3000`.

Then:
- Clone this repo
- Change into the Pixos directory
- To setup environment variables, create a `.env` file in the Pixos root directory and include the following:
```
MONGO_URL=mongodb://localhost:27017/pixos_test
FACEBOOK_APP_ID=[Your facebook app ID]
FACEBOOK_APP_SECRET=[Your facebook app secret]
APP_DOMAIN="localhost:3000"
```
- Run `npm install` to install dependencies

### Usage

- Host the server by running `npm start`
- Go to your browser and visit `http://localhost:3000/`.
- To run the tests, simply run `npm test`

Test specs are stored in the 'tests' folder.

Additional npm scripts are available for development. Here are the most useful:

- `npm run dev` - Run the dev server with Hot Module Reloading enabled, this will watch for code changes, restart the server and update the app in the browser in real time for an easier development experience.
- `npm run test:dev` - Run the test suite and then watch for code changes. Any code change will re-run the relevant tests and present the results in real-time.

### Technologies

Pixos is built using the universal Javascript approach and employs Javascript across the full stack. It includes the following:

- **Mongodb:** an open source database that uses a document-oriented data model
- **Express:** a web application framework
- **React:** a declarative, efficient, and flexible JavaScript library for building user interfaces
- **Node.js:** an open-source, cross-platform JavaScript runtime environment
- **Redux:** a JavaScript library designed for managing application state
- **React Router:** A routing library for React
- **Passport:** an authentication middleware for Node
- **Socket.io:** a JavaScript library that allows for realtime communication between web clients and servers
- **Bootstrap:** a front-end web framework for designing websites
- **Material UI:** a set of React Components that implement Google's Material Design
- **Sass:** a scripting language that is interpreted into Cascading Style Sheets (CSS)

Testing

- **Enzyme:** a JavaScript Testing utility for testing React
- **Mocha:** a feature-rich JavaScript test framework
- **Sinon:** a testing library
- **Chai:** a unit testing library

### Screenshots

**Homescreen after Facebook login**
![p1](http://i.imgur.com/zJSpXmN.png)

**Build your deck - land cards**
![p2](http://i.imgur.com/err5p3P.png)

**Build your deck - water and air cards**
![p3](http://i.imgur.com/IkX88Qp.png)

**Start Matchmaking**
![p4](http://i.imgur.com/22377lk.png)

**Start of a new game**
![p5](http://i.imgur.com/LjibKg8.png)

**Cards in Play**
![p6](http://i.imgur.com/2Br2cF0.png)

**Lots of meteors played!**
![p7](http://i.imgur.com/3IxRn3h.png)

### Credits

Pixos was built by:

[Rick Clark](https://github.com/rkclark), [Ben Vaughan-Jones](https://github.com/bvjones), [Dylan Rhodius](https://github.com/dylanrhodius), [Rob Holden](https://github.com/holden4), [Mike Field-May](https://github.com/mikefieldmay), and [Ross Benzie](https://github.com/rossbenzie).

Icons made by [Freepik](http://www.freepik.com) from [Flaticon.com](http://www.flaticon.com), licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).

App skeleton built with the [React Redux Starter Kit](https://github.com/davezuko/react-redux-starter-kit).
