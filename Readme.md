<h1>
    <img width="32" height="32" src="src/client/static/images/logo.png">
    RPGKeeper
</h1>

[![Total alerts](https://img.shields.io/lgtm/alerts/g/Morgul/rpgkeeper.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Morgul/rpgkeeper/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Morgul/rpgkeeper.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Morgul/rpgkeeper/context:javascript)

* Production: https://rpgkeeper.com
* Beta: https://beta.rpgkeeper.com

RPGKeeper is a digital chracter manager. While there are many others out there that are targeted to one or two systems, RPGKeeper aims to be a _universal_ character management system. It can support any TTRPG system ever created, as long as that system is added into it's codebase. Building a system is a time-consuming process, but it's possible to get the basics going in just a few hours. With support for a 'generic' system, RPGKeeper allows you to get down to playing quickly even if it doesn't support your game with a dedicated system.

## FAQ

### But what about Roll20?

Don't get us wrong, Roll20 certainly has a lot of features, and a dedicated fanbase. But Role20 is a map first, and a character/campaign manager second. Often, character sheets are built based off the official paper sheets from games; which often don't translate well to a digital format. RPGKeeper takes a different approach: we focus on building user experiences centered around playing your character, without worrying about keeping the sheet the same as the paper version. Characters are a first class citizen.

### How many Characters can I have?

Currently, there are no limits on number of characters.

### I have a game I want to add a system for!

Well, are you a developer? RPGKeeper is written in [VueJS][vue], [TypeScript][ts], and [NodeJS][node]. If you know (or are willing to learn) those technologies, then fork the code, and start adding a system. If, instead, you're just a gamer and want us to do the work, then [Request a System](https://github.com/Morgul/rpgkeeper/issues/new?labels=system%20request&title=[Request]%20).

### Can I share a link to my character?

You can! Simply copy the url from your browser, and send that link to someone else. They will see a read-only version of your character.

---

## Development

RPGKeeper is, and always will be an open source project. We want to encourage developers to help improve it, and add new features that we haven't even considered before. As such, we want to keep how to contribute front and center in this readme. All contributions are welcome!

### Getting started

Before getting started you will need the following installed:

* NodeJS >= v14
* Yarn package manager (`npm install -g yarn`)

### Running

The first thing you will want to do is to install dependencies:  

* `yarn`

Next, build the client assets:

* `yarn build:watch` (for development)
* `yarn build:release` (for release)

_Note: In a future version this will also build the server._

Finally, you will need to start the server:

* `yarn start`

It should create a new database file: `<project_root>/db/rpgk.db`. You should now be able to access the running client
at http://localhost:5678/.

#### Checking your work

Before you are allowed to push, the project will force you to run through the linter. If the linter doesn't pass, you don't get to push. To check on your own, I recommend you run: `yarn run lint:fix`. If this passes then you know you're good to go.

_Note: Merge requests will not be accepted without passing linting._

[vue]: https://vuejs.org/
[ts]: https://www.typescriptlang.org/
[node]: https://nodejs.org/en/
