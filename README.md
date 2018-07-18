# Neighborhood-Map
This is the 8th project for Udacity's Front End Nanodegree. A single-page web application, built using the React framework, that displays a Google Map [using Google Maps API](https://cloud.google.com/maps-platform/maps/) of El Hossary area in 6th of October City in Egypt, and various coffee shops in that area. Users can search all included landmarks and, when selected, additional information about a landmark is presented from the FourSquare API.


## Features

1. Type into the filter/search box to filter the shown locations on the map.
2. Click on the button below the filter/search box to collapse or expand the suggestions list.
3. Click anywhere on the map to close the information window that opens.
4. Click on any marker to see the location details fetched from the [FourSquare API](https://developer.foursquare.com/).


## Prerequisites

* [npm](https://www.npmjs.com/)

If you have Node installed, you have NPM, if not install node:

* [Node](https://nodejs.org/en/)


## How to run the project in Development Mode
The project uses [Node.js >= 6.x](https://nodejs.org/en/) and the [Create-React-App starter code](https://github.com/facebookincubator/create-react-app).

After Node is installed in your system, follow the below steps.

1. Clone the repo. 
2. Navigate to the directory where you cloned the repo.
3. Run the command `npm install`
4. Launch the app with `npm start`

A new browser window open automatically displaying the app.  If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

**Note**
The service workers for this app will only cache the site when it is in production mode.

## How to run the project in Production Mode

1. Build the production optimised code by: `npm run build`
2. Deploy it to `gh-pages` branch by `npm run deploy`
