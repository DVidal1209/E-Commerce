# E-Commerce


## Description

This application is the backend framework for an ECommerce database, allowing the user to view, update, add and delete data from their database in the Category, Tag and Product tables.


## Table of content
[Installation](#installation)

[Usage](#usage)

[Screenshots](#screenshots)

[License](#license)


## Installation
In order to install this application all you need to do is extract it to your desired location. In order to run this program you will need to have both node and mysql installed on your computer.

MySQL can be found [here](https://dev.mysql.com/downloads/mysql/)

Node can be found [here](https://nodejs.org/en/download/)

## Usage

To use this application you must first open the folder in command line / terminal.

Once done you will have to create the database and seed the database. 

To do so log in to the mysql cmd / terminal and enter the command:
    
    "source db/schema.sql"

Once completed exit the mysql cml/terminal and run this command in the normal cmd/terminal:

    "npm run seed"

Once done you can go ahead and exit the sql termina and execute the line "npm start server.js".

From here you may use insomnia or postman to make api calls at localhost:3001/.
 
[Video link on usage](https://drive.google.com/file/d/1HOiZSEFD9c2iU9eU91zbIMG6TE4PPqAy/view)


## Screenshots
![Ecommerce Screenshot](./assets/images/ECommerce-screenshot.png)

## License
MIT License

Copyright (c) 2022 Daniel Vidal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
