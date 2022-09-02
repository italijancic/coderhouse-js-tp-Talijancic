import { User, Users } from "./users.models.js"
import { devices } from "../devices/devices.services.js"
import { get } from '../fetch/fetch.js'

// Fectch users from json file
const { users: fetchedUsers } = await get('../src/json/users.json')
console.log(fetchedUsers)

// Create users
const users = new Users([])

// Get data from sesion store
if (sessionStorage.getItem('users') !== null) {
	const { users: storageUsers } = JSON.parse(sessionStorage.getItem('users'))
	storageUsers.forEach((user) => {
		users.addUser(new User(user.username, user.email, user.password, user.devices, user.creationDate))
	})
} else {
	console.debug('[users.services.js]: not load from local storage!')
	fetchedUsers.forEach((user) => {
		users.addUser(new User(user.username, user.email, user.password, user.devices, user.creationDate))
	})
	sessionStorage.setItem('users', JSON.stringify(users))
}

const renderUsersList = (users) => {

	const fragment = document.createDocumentFragment()

	users.forEach((user, index) => {
		const userRowData = document.createElement('tr')
		document.querySelector('#users-data').innerHTML = ''

		userRowData.innerHTML = `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${user.username}</td>
			<td>${user.email}</td>
			<td>${user.password}</td>
			<td>${user.devices.length}</td>
			<td>${user.creationDate}</td>
		</tr>`

		fragment.appendChild(userRowData)
	})

	document.querySelector('#users-data').appendChild(fragment)
}

const renderUsersSearchResult = (users, searchData) => {

	const fragment = document.createDocumentFragment()
	document.querySelector('#users-search-result').innerHTML = ''

	users.forEach((user, index) => {
		const userRowData = document.createElement('tr')

		userRowData.innerHTML = `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${user.username}</td>
			<td>${user.email}</td>
			<td>${user.password}</td>
			<td>${user.devices.length}</td>
			<td>${user.creationDate}</td>
		</tr>`

		fragment.appendChild(userRowData)
	})

	document.querySelector('#users-search-result').appendChild(fragment)
	document.querySelector('#users-search-data').innerHTML = `Filter: ${searchData.filter} - Key: ${searchData.key}`
	document.querySelector('#search-results').style.display = 'block'
}

export {users, renderUsersList, renderUsersSearchResult}