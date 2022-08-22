import { User, Users } from "./users.models.js"
import { devices } from "../devices/devices.services.js"

// Create users
const users = new Users([])

// Get data from sesion store
if (sessionStorage.getItem('users') !== null) {
	const { users: storageUsers } = JSON.parse(sessionStorage.getItem('users'))
	storageUsers.forEach((user) => {
		users.addUser(new User(user.username, user.email, user.password, [], user.creationDate))
	})
} else {
	console.log('[usersServices]: not load from local storage!')
	users.addUser(new User('italijancic', 'italijancic@gmail.com', 'kjs$kl&sd#jf%', [], new Date().toLocaleString()))
	users.addUser(new User('cdomenje', 'cdomenje@dytsoluciones.com.ar', '#%678&8*3$', [], new Date().toLocaleString()))
	users.addUser(new User('espesot', 'espesot@dytsoluciones.com.ar', 'l5k%gm7dlk#$', [], new Date().toLocaleString()))
	sessionStorage.setItem('users', JSON.stringify(users))
}

// Add devices to users objects
users.getUserByName('italijancic').user.addDevice(devices.getDeviceById('08:3a:f2:49:8d:7c').device)
users.getUserByName('italijancic').user.addDevice(devices.getDeviceById('8c:4b:14:0e:7f:58').device)
users.getUserByName('cdomenje').user.addDevice(devices.getDeviceById('8c:4b:14:0e:7f:58').device)
users.getUserByName('cdomenje').user.addDevice(devices.getDeviceById('cc:50:e3:82:f0:6a').device)
users.getUserByName('cdomenje').user.addDevice(devices.getDeviceById('8c:4b:14:10:a0:40').device)

const renderUsersList = (users) => {

	// Render users list
	let usersRowData = ''

	users.forEach((user, index) => {
		usersRowData += `
	<tr>
		<th scope="row">${index + 1}</th>
		<td>${user.username}</td>
		<td>${user.email}</td>
		<td>${user.password}</td>
		<td>${user.devices.length}</td>
		<td>${user.creationDate}</td>
	</tr>`
	})

	document.querySelector('#users-data').innerHTML = usersRowData
}

const renderUsersSearchResult = (users) => {

	// Render devices list
	let deviceRowData = ''

	users.forEach((user, index) => {
		deviceRowData += `
	<tr>
		<th scope="row">${index + 1}</th>
		<td>${user.username}</td>
		<td>${user.email}</td>
		<td>${user.password}</td>
		<td>${user.devices.length}</td>
		<td>${user.creationDate}</td>
	</tr>`
	})

	document.querySelector('#users-search-result').innerHTML = deviceRowData

	document.querySelector('#search-results').style.display = 'block'
}

export {users, renderUsersList, renderUsersSearchResult}