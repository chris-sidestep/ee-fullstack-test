## Simple Grocery List App
This is a simple Grocery List app written in Typescript, running on Next.js, for the EE Full Stack Tech Test

The version number is 5b8d0fd276b6d288905ed2f63a934e057e8feca2 
## Getting Started

### Prerequisites

*Node version: v18.17.0
*This application uses Redis as a simple backend data store:

```bash
docker run -p 6379:6379 --name my-redis -d redis
```


### Running the app
Running the development server:

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Running a production server:

```bash
npm run build
npm run start
```

running "npm build" will also run the linting and typescript validity checking!


## Tests

This application uses Jest for testing, which can be run using:

```bash
npm run test
```
This will run unit tests for the backend, as well as shallow-render tests for the UI.

## To do

Things that remain to be implemented:

* un-deleting a grocery list item
* Enhanced error handling
* End-to-end & integration tests

