# MYSQL Client Management System

This application is a MySQL powered applicaton designed to be used to store and display departments and roles, as well as store, display, and edit employee information. All of the information entered is stored into a database called 'cms_db'. A schema file is provided.

This application obtains user inputs through a terminal with an external node package called 'inquirer'. When the server.js file is run, the user is taken to a home prompt where they can either view the 'roles', 'departments', or 'employee' tables, add a row to each table, or edit a specific row of the 'employee' table. Depending on the choices made by the user, they will be asked to answer additional prompts. All of these additional choices are designed to redirect the user to the home screen, where they can select all available options.

The tables are visually displayed via the terminal by using the native package 'console.table'.

## Installation

To install:

- Download the root folder of this project to your computer. You could also fork and clone the 'MFF-art.github.io' repo.
- Open a terminal in the root folder of this project and run 'npm i' to install the required node packages.
- Make sure to run the included schema file to initialize the 'cms_db' database and tables.
- Run 'node server' in the terminal to start the application. To use, answer the given prompts through the terminal.

## Usage

First, run the 'schema.sql' file. This will initialize the 'cms_db' database and create three tables inside it: 'departments', 'roles', and 'employees'. Once you have run this file and all of it's operations have executed, the next step is to open up a terminal in the root directory of this project and run the following line of code: "node server". Doing this will initialize the program.

## Credits

This webpage was created by me, Mauricio Fuentes Gomez.

## License

MIT License
