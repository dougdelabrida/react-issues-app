# React issues Project
This project implements a simple list of React's issue based on the GitHub's API.

You can see the app running [here](http://react-issues-app.surge.sh/)

## Running
After clonning and installing the project's dependecies you will be able to run `npm start`

## Testing
The testing files are in `__tests__` directory.
It can be runned just by typing `npm run test`

## Build
Thanks to create-react-app, you can just run `npm run build`

## Assumptions

- Set labels as tiny colored circles with popup to display its name. Tags were really ugly, maybe a better solution can be found later.
- The users must be able to filter by status, so it was added a group button with the options `All`, `Open` and `Closed`.
- A Icon to view the user's photo and login was added to the table. It could be a good idea to retrive more informations about the user.

## UI Features
- Paginator, State Filter and User Vizualization.

## TODO
- Add additional libraries to mock tests

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).