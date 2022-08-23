import { User } from './users.models.js'
import { users, renderUsersList, renderUsersSearchResult } from './users.services.js';
import { errorAlert, successAlert } from '../SweetAlert/alerts.js'

document.addEventListener('DOMContentLoaded', () => {

	// Render users table
	users.getUsers().success ? renderUsersList(users.getUsers().users) : console.log(users.getUsers())

	// Show password
	document.querySelector('#showPassword').addEventListener('click', () => {
		if ( document.querySelector('#password-text-input').type === 'password' ) {
			document.querySelector('#password-text-input').type = 'text'
		} else {
			document.querySelector('#password-text-input').type = 'password'
		}
	})

	// New users form submit
	document.querySelector('#new-user-form').addEventListener('submit', (event) => {

		event.preventDefault()

		// Create new User class instance
		const newUser = {
			"username": event.target[0].value,
			"email": event.target[1].value,
			"password": event.target[2].value,
			"devices": [],
			"creationDate": new Date().toLocaleString()
		}

		// Validate empty fields
		if (newUser.username && newUser.email && newUser.password) {

			const result = users.addUser(new User(newUser.username, newUser.email, newUser.password, [], newUser.creationDate))

			if (result.success) {
				// Sweetalert2 OK msg
				successAlert(result.message)
				// Render new users list
				renderUsersList(users.getUsers().users)
				// Save new data on session storage
				sessionStorage.setItem('users', JSON.stringify(users))
				// Clear form
				document.querySelector('#username-text-input').value = ''
				document.querySelector('#email-text-input').value = ''
				document.querySelector('#password-text-input').value = ''
			} else {
				errorAlert(result.message)
			}
		} else {
			errorAlert('All data fields are required!')
		}

	})

	// Search user form submit
	document.querySelector('#search-user-form').addEventListener('submit', (event) => {

		event.preventDefault()

		const searchFilterBy = event.target[0][event.target[0].selectedIndex].text
		const searchKey = event.target[1].value
		const searchData = { filter: searchFilterBy, key: searchKey }
		let searchResult = {};

		if (searchKey) {
			switch (searchFilterBy) {
				case 'Username':
					// Search device by Id
					searchResult = users.getUserByName(searchKey)
					searchResult.success ? renderUsersSearchResult([searchResult.user], searchData) : errorAlert(searchResult.message)
					break;

				case 'Email':
					// Search device by model
					searchResult = users.getUserByEmail(searchKey)
					searchResult.success ? renderUsersSearchResult([searchResult.user], searchData) : errorAlert(searchResult.message)
					break;

				default:
					errorAlert('Select one serch filter (Username or Email)')
					break;
			}
		} else {
			errorAlert('Empty search field!')
		}

	})

})