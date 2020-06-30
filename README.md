# Coding Exercise

Hello, Lehman Black!

Below is a coding exercise that we believe will allow you to show off your amazing development skills!

We’re super excited to see what you come up with!

We expect it to take a few hours. We would ask that you make commits to a git repository every so often so that we can see how long it took. Here is what you need to do

1. Clone this repository locally and update the first line of this README with your name (so that it reads "Hello, YOUR NAME!"). Commit this change. This will serve as a starting timestamp
2. Complete the exercise below
3. Commit progress regularly
4. When you're done, upload your code to a personal GitHub account and email us the link.

## The Exercise

This is a simplified version of a piece of functionality we have in Breeze ChMS. Many of the churches we work with import their data from an existing system or a homegrown spreadsheet into Breeze. We provide tools for bulk importing of people, contribution, group and attendance records.
In this problem we're only going to consider two data types: People and Groups. A Person can be part of one Group.

For the People data type, each person can have a state of either 'active' or ‘archived’. The `id` for each data type is globally unique. As a result, if the id does not exist, create a new record, otherwise, update the existing record.

People columns:
  `id, first_name, last_name, email_address, status`

Group columns:
  `id, group_name`

Here’s an example:

```
id, first_name, last_name, email_address, status
1, "Alex", "Ortiz-Rosado", "alex@breezechms.com", active
2, "Jon", "VerLee", "jon@breezechms.com", "archived"
3, "Fred", "Flintstone", "fredflintstone@example.com", "active"
4, "Marie", "Bourne", "mbourne@example.com", "active"
5, "Wilma", "Flintstone", "wilmaflinstone@example.com", "active"
```

```
id, group_name
1, "Volunteers"
2, "Elders"
3, "Bible Study"
```

### Exercise Setup Help

*Help getting the code up and running:*

**Prerequisites**
* Git, Composer, Laravel
* Node >= 8, Yarn
* Command Line PHP 7
* MySql 5.x installed locally, accessible via 127.0.0.1

- Clone the repository
  - `git clone git@github.com:BreezeChMS/coding-exercise-api-react.git && cd coding-exercise-api-react`
- Setup Laravel
  - `cp .env.example .env`
  - Edit .env with your mysql connection information: the following steps connect to local mysql database using root credentials
  - `composer install && php artisan key:generate && php artisan migrate`
- Start the Laravel API in one Terminal Window: `php artisan serve`
- Start the React/Node.js server in another Terminal Window: `yarn start`


### Expected Changes

Update this RESTful API (built using the Laravel framework) to add a _new_ endpoint for `/groups`. This endpoint should support CRUD (Create, Read, Update, Delete) operations.

Update the ReactJS  application to receive an uploaded People CSV file, import it using the RESTful API service and display the results on the screen. The same application will allow you to do the same thing for a Group CSV file.

Feel free to use a CSV parsing library.

The data will be displayed in a sortable table.

You will need to determine the type of data in the CSV file based on the headers in the first row. Your program will output a list of Groups, and for each Group, a list of active People in that Group.

### Validating the changes
#### Running
You will need an empty MySQL database to run the example. I used docker to spin up
a server (I'm using version 5.7 due to the root account not working out of the box in
newer container versions)

```
docker run --name breezedb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=laravel -p3306:3306  mysql:5.7
```

I also had to install the php-sqlite3 module to get the tests to run.
The installation of `yarn` was missing from my system too, so I had to use `npm`

```
npm install -g yarn
```

After that I could follow the set up instructions above without any issues.
1. copy `.env.example` to .env and add database information
2. run `composer install`
3. run `yarn install`
4. run `php artisan key:generate && php artisan migrate`
4. start API using `php artisan serve`
5. start react with `yarn start`

#### Changes Implemented
Added the API endpoint for `api/groups` and supports all the normal CRUD operations.

The `group_name` column has been added to the `people` table. This can be any string
since it is not checked with the `groups`. In production this should be a foreign key.
This column is also displayed with the other `person` data in the React application.

Automated testing has been added for the People and Groups APIs. They can be run with
```
php artisan test
```

`curl` can be used to manually check API endpoints. The available routes are:

```
# php artisan route:list

+--------+-----------+--------------------------+----------------+-----------------------------------------------+------------+
| Domain | Method    | URI                      | Name           | Action                                        | Middleware |
+--------+-----------+--------------------------+----------------+-----------------------------------------------+------------+
|        | GET|HEAD  | api/groups               | groups.index   | App\Http\Controllers\GroupsController@index   | api        |
|        | POST      | api/groups               | groups.store   | App\Http\Controllers\GroupsController@store   | api        |
|        | GET|HEAD  | api/groups/create        | groups.create  | App\Http\Controllers\GroupsController@create  | api        |
|        | GET|HEAD  | api/groups/{group}       | groups.show    | App\Http\Controllers\GroupsController@show    | api        |
|        | PUT|PATCH | api/groups/{group}       | groups.update  | App\Http\Controllers\GroupsController@update  | api        |
|        | DELETE    | api/groups/{group}       | groups.destroy | App\Http\Controllers\GroupsController@destroy | api        |
|        | GET|HEAD  | api/groups/{group}/edit  | groups.edit    | App\Http\Controllers\GroupsController@edit    | api        |
|        | GET|HEAD  | api/people               | people.index   | App\Http\Controllers\PeopleController@index   | api        |
|        | POST      | api/people               | people.store   | App\Http\Controllers\PeopleController@store   | api        |
|        | GET|HEAD  | api/people/create        | people.create  | App\Http\Controllers\PeopleController@create  | api        |
|        | GET|HEAD  | api/people/{person}      | people.show    | App\Http\Controllers\PeopleController@show    | api        |
|        | PUT|PATCH | api/people/{person}      | people.update  | App\Http\Controllers\PeopleController@update  | api        |
|        | DELETE    | api/people/{person}      | people.destroy | App\Http\Controllers\PeopleController@destroy | api        |
|        | GET|HEAD  | api/people/{person}/edit | people.edit    | App\Http\Controllers\PeopleController@edit    | api        |
+--------+-----------+--------------------------+----------------+-----------------------------------------------+------------+
```

The React application now has a place at the top to upload CSV files. The type of
resource is automatically detected. If the CSV file is not a recognized resource
then nothing happens when you click the upload button (see the tasks remaining section)

There is some console logs for when the upload finishes, but nothing displays on the screen.
You must also refresh the page to view the data changes

The CSV files do not depend on each other so you can upload them in any order.
(benefit of using a string for the `person.group_name`. In production, I would
create any missing groups or default missing groups to an empty string)

Sample CSV files can be found in `tests/sample_data`.


#### CSV Format
People
```
id,first_name,last_name,email_address,status,group_name
1,"Alex","Ortiz-Rosado","alex@breezechms.com",active,"Bible Study"
2,"Jon","VerLee","jon@breezechms.com","archived","Bible Study"
3,"Fred","Flintstone","fredflintstone@example.com","active","Bible Study"
4,"Marie","Bourne","mbourne@example.com","active","Vacation"
5,"Wilma","Flintstone","wilmaflinstone@example.com","active","Elders"
```

Groups
```
id,group_name
1,Volunteers
2,Elders
3,"Bible Study"
```

#### Known Issues
* **columns are not sortable. ...It's just a matter of adding the right `sortable` state as given in
 https://react.semantic-ui.com/collections/table/#variations-sortable**
* `id` is required, but does not quite work as expected. It is an autoincrementing
column so new ID's may not match if you skip numbers or do not have the IDs in a sorted order
* `jest` tests for ResultsList is broken due to updates. Should just need to update the expected
data with the new JSX changes
* have not checked for how large a CSV can be processed
* uploading multiple files without refreshing didn't work during testing
* The PapaParse JavaScript library can be tweaked to be more friendly, but is kind of strict
* Some console errors due to 204 No Content responses from the API being handled improperly
using the defaults. I have noticed issues with the following:
    * Columns should not have spaces between them. (Bad: `id, group_name`, Good: `id,group_name` )
    * PapaParse doesn't allow you set multiple quote characters, so I set it to use `"`
    
#### Tasks Remaining
* UI feedback
    * Add dimmer to show files are uploading and prevent multiple uploads accidently
    * add upload progress (PapaParse lets you have a callback for each row / chain state updates to the fetch promises)
    * notify user when upload finishes
    * show results of the upload (created, updated, errors)
    * add link in upload results to show error details
    * automatically refresh tables
    * allow user to download sample files
    * notify user if no file selected or bad file selected
    * breeze demo upload uses popup for uploads, would style to match production conventions
* better error handling
* abstract `PeopleService` and `GroupService` into a factory. All that really changes is the URL,
and the allowed fields
* verify CSRF or other XSS protection beyond React's defaults are needed
* If performance became an issue then the CSV parsing and API requests could be done in batches
with some modifications to the API POST/PUT endpoints.
* Update JS to match coding standards (current company does not use ES6+ so I'm a bit rusty)
* Add missing code documentation




### Testing

We love TDD! So we’d love to see tests for the API and ReactJS application. Write automated tests to verify your results and account for gotchas (handling different column orders, invalid id's in the People CSV file, etc..). Classify your tests as either unit, integration, ui, or acceptance, but it is not required to use every type.

## Finally

We’re a fully remote team so communication is really important. Be sure to include any instructions needed for any of our team mates to run and test.

Good luck and we'll get back to you once we review it!
