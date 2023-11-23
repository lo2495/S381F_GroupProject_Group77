Library management system

Group: 77
Name: 
Lo Hi Yeung(13424079)

Application link: https://s381f-groupproject-group77.onrender.com/

********************************************
# Login
Through the login interface, each user can access the library management system by entering their username and password.

Each user has a username and password;
[
	{username: user1, password: cs381},
	{username: user2, password: cs381},
	{username: user3, password: cs381},
	{username:admin, password: admin}

]

After successful login, userid is stored in seesion.

********************************************
# Logout
In the home page of the library management system, each user can log out their account by clicking logout.

********************************************
# CRUD service
- Create
-	A book information may contain the following attributes with an example: 
	1)	Title (To Kill a Mockingbird)
	2)	Author (Harper Lee)
	3)	Publication (J. B. Lippincott & Co.)
	4)	Genre (Fiction)
	5)	Availability (true), show it can be borrowed or not
	6)	Borrower ID (13424079), show who borrowed the book
	7)	Loan Period(14), show how many days are left for the student to return the book
	8)	ISBN (9780446310789)
	9)	Abstract (To Kill a Mockingbird is both a young.......)
	10)	Publish Date (1925-04-10)
	11)	Image of the book (data:image/png;base64,iVBORw......)

Except the attributes of Borrower ID and Loan Period, other attributes are mandatory.

Create operation is post request, and all information is in body of request.

********************************************
# CRUD service
- Read
-  There are two options to read and find the book list all information or searching by selected attributes.

1) List all information
	admin.ejs will display all the book information in table form after the user logined in succesfully.
	clicking on the eye icon in selected row, the details of the book will be shown;

2) Searching by selected attributes
	select the attribute by which the user wants to search;
	for example book title, type the title (To kill a Mockingbird) into the search bar;
	title is the key to find the specific row, and in admin.ejs the result will be shown in the same page;
	clicking on the eye icon in selected row, the details of the book will be shown;

********************************************
# CRUD service
- Update
-	The user can update the book information through the details interface.
-	Among the attribute shown above, ISBN cannot be changed. 
-	A book information may contain the following attributes with an example: 
	1)	Title (To Kill a bird)
	2)	Author (Harper Lee)
	3)	Publication (J. B. Lippincott & Co.)
	4)	Genre (Non-Fiction)
	5)	Availability (true), show it can be borrowed or not
	6)	Borrower ID (13424079), show who borrowed the book
	7)	Loan Period(14), show how many days are left for the student to return the book
	8)	Abstract (To Kill a Mockingbird is both a young.......)
	9)	Publish Date (1925-04-10)
	10)	Image of the book (data:image/png;base64,iVBORw......)


	In example, we updated the Genre, Title.

********************************************
# CRUD service
- Delete
-	The user can delete the book information in home page by clicking the "trash can" icon in the specficic row

********************************************
# Restful
In this project, there are 2 HTTP request types, post and get.
- Post(Add)
	Endpoint: POST /books/add

	Description:This endpoint is used to add a new book to the collection of books.

	Request Body:
	The request body should be a JSON object containing the details of the book to be added. The following fields are required:
	- title (string): The title of the book.
	- author (string): The author of the book.
	- publication (string): The publication information of the book.
	- genre (string): The genre of the book.
	- availability (boolean): The availability status of the book.
	- borrower_id (string): The ID of the borrower, if the book is borrowed. If the book is not borrowed, it can be null.
	- loan_period (number): The loan period in days, if the book is borrowed. If the book is not borrowed, it can be null.
	- ISBN (string): The ISBN (International Standard Book Number) of the book.
	- abstract (string): A brief summary or abstract of the book.
	- publish_date (string): The publish date of the book.
	- image (string): The URL or path to the book's image.

	Response:
	- If the book is added successfully, the server will respond with a status code of 200 and the message "Book added successfully".
	- If there is an error adding the book, the server will respond with a status code of 500 and the message "Failed to add book".

	Example Test:
	To add a book using this endpoint, you can send a POST request to the following URL: http://localhost:3000/books/add

	With the following request body:
	{
  	"title": "Testing",
  	"author": "Testing",
  	"publication": "Testing",
  	"genre": "Fiction",
  	"availability": true,
  	"borrower_id": "",
  	"loan_period": "",
  	"ISBN": "1234567890",
  	"abstract": "Testing",
  	"publish_date": "2023-11-23",
  	"image": "http://example.com/book-image.jpg"
	}

	This will add a new book with the provided details to the collection. The server will respond with a status code of 200 and the message "Book added successfully" if the book is added successfully. Otherwise, it will respond with a status code of 500 and the message "Failed to add book" if there is an error.

- Post(Update)
	Endpoint: POST /books/update/:_id

	Description: This endpoint is used to update an existing book in the collection of books.

	Request Body:
	The request body should be a JSON object containing the updated data for the book. The fields that can be updated include:
	- title (string): The updated title of the book.
	- author (string): The updated author of the book.
	- publication (string): The updated publication information of the book.
	- genre (string): The updated genre of the book.
	- availability (boolean): The updated availability status of the book.
	- borrower_id (string): The updated ID of the borrower, if the book is borrowed. If the book is not borrowed, it can be null.
	- loan_period (number): The updated loan period in days, if the book is borrowed. If the book is not borrowed, it can be null.
	- abstract (string): The updated brief summary or abstract of the book.
	- publish_date (string): The updated publish date of the book.
	- image (string): The updated URL or path to the book's image.

	Path Parameter:
	- _id (string): The ID of the book to be updated. This should be provided in the URL.

	Response:
	- If the book is updated successfully, the server will respond with a status code of 200.
	- If there is an error updating the book, the server will respond with a status code of 500.

	Example Test:
	To update a book using this endpoint, you can send a POST request to the following URL: http://localhost:3000/books/update/616d4c9e9e3d2150d135e0c3

	With the following request body:
	{
  	"title": "Updated Testing",
  	"author": "Updated Testing",
  	"publication": "Updated Testing",
  	"genre": "Updated Testing",
  	"availability": true,
  	"borrower_id": "",
  	"loan_period": "",
  	"abstract": "Updated Testing",
  	"publish_date": "2023-11-23",
  	"image": "http://example.com/updated-book-image.jpg"
	}

	This will update the book with the provided ID (616d4c9e9e3d2150d135e0c3) in the collection with the updated data. The server will respond with a status code of 200 if the book is updated successfully. Otherwise, it will respond with a status code of 500 if there is an error.

- Post(Delete)
	Endpoint: POST /books/delete/:ISBN

	Description: This endpoint is used to delete a book from the collection of books based on its ISBN (International Standard Book Number).

	Path Parameter:
	- ISBN (string): The ISBN of the book to be deleted. This should be provided in the URL.

	Response:
	- If the book is deleted successfully, the server will respond with a status code of 200.
	- If there is an error deleting the book, the server will respond with a status code of 500.

	Example Test:
	To delete a book using this endpoint, you can send a POST request to the following URL: http://localhost:3000/books/delete/1234567890
	This will delete the book with the provided ISBN (1234567890) from the collection. The server will respond with a status code of 200 if the book is deleted successfully. Otherwise, it will respond with a status code of 500 if there is an error.)


- Get
	Endpoint: GET /admin/search

	Description: This endpoint is used to search for books in the collection based on a search query and a filter.

	Query Parameters:
	- search (string): The search query to match against the specified filter.
	- filter (string): The filter to apply for the search. Valid filter options include 'title', 'author', 'ISBN', 'publication', 'genre', 'availability', 'borrower_id', and 'loan_period'.

	Response:
	- If the search is successful, the server will render the 'admin' view and pass the matched books and the user session data to the view template.
	- If there is an error searching for books, the server will redirect the user to the '/admin' page.

	Example Test:
	To perform a search using this endpoint, you can enter the following URL in your web browser's address bar: http://localhost:3000/admin/search?search=example&filter=title

	This will search for books with the word "example" in their title. The server will render the 'admin' view and display the matched books along with the user session data if the search is successful. If there is an error searching for books, the server will redirect the user to the '/admin' page.

For all restful CRUD services, login should be done at first.
