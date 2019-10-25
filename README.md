# AsurityChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Development server

First navigate to the project directory and run `npm i`, then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Requirements

* Node
* NPM


## Project Details

I decided to use Angular 2 as I'm more experienced with it than React or Aurelia but still had to learn/remember quite a bit as my main frontend work right now is in AngularJS. I used the angular-cli as you see above which setup the skeleton for the app very quickly. I went with Angular-Material for the component design as it let me easily create a nice grid layout and has really nice apis for filtering/sorting. I marked all the rate spreads over 1.5 in a light coral to distinguish and gave 6 options to filter the data with. I didn't add a view more button as I thought it ruined the layout and so added the requested functionality instead by clicking on a row. Since the specs only called for one more page I went with an overlay versus routing to a new page. Hope that is okay. Think it is cleaner and since the data is fairly limited didn't see the point of a entire new page. Sadly I didn't get a chance to include unit-tests as I finished the main portion after I wanted to.
