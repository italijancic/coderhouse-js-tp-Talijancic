import { User } from './users.models.js'
import { users, renderUsersList } from './users.services.js';


document.addEventListener('DOMContentLoaded', () => {

	renderUsersList(users.getUsers())

	// Show password
	document.querySelector('#showPassword').addEventListener('click', () => {
		if ( document.querySelector('#password-text-input').type === 'password' ) {
			document.querySelector('#password-text-input').type = 'text'
		} else {
			document.querySelector('#password-text-input').type = 'password'
		}
	})


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

		users.addUser(new User(newUser.username, newUser.email, newUser.password, [], newUser.creationDate))

		// Clear form
		document.querySelector('#username-text-input').value = ''
		document.querySelector('#email-text-input').value = ''
		document.querySelector('#password-text-input').value = ''

		// Render new users list
		renderUsersList(users.getUsers())

		// Save new data on session storage
		sessionStorage.setItem('users', JSON.stringify(users))
	})

})