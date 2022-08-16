import { devices } from "./devicesServices.js"

/**
 * @description Class representing a a user
 * **/
 class User {

    /**
     * Create a user object
     * @param {string} 	username
     * @param {string} 	email
     * @param {string} 	passwword
     * @param {array}	devices Array of devices objets
     *
     * **/
    constructor(username, email, password, devices, date) {
        this.username = username
        this.email = email
        this.password = password
        this.devices = devices
        this.creationDate = date
    }

    getUsername() {
        return this.username
    }

    getEmail() {
        return this.email
    }

    getPassword() {
        return this.password
    }

    setUsername(username) {
        this.username = username
    }

    setEmail(email) {
        this.email = email
    }

    setPassword(password) {
        this.password = password
    }

    getDevices() {
        if (this.devices.length != 0) {
            return this.devices
        } else {
            console.error('This user has not devices!')
            return undefined
        }
    }

    getDeviceById(id) {
        if (this.devices.length != 0) {
            const foundDevice = this.devices.find((device) => (device.id === id))

            if (foundDevice !== undefined) {
                return foundDevice
            } else {
                console.error('Device ID does not exist on devices list')
                return undefined
            }
        } else {
            console.error('This user has not devices!')
            return undefined
        }
    }

    addDevice(newDevice) {
        const foundDevice = this.devices.find((device) => (device.id === newDevice.id))
        if (foundDevice === undefined) {
            this.devices.push(newDevice)
        } else {
            console.error('Device ID alreadey exist on this user devices list')
            return undefined
        }
    }

    addDevices(newDevices) {
        newDevices.forEach((newDevice) => this.addDevice(newDevice))
    }

    deleteDeviceById(id) {
        const newDeviceList = this.devices.filter((device) => {
            return device.id != id
        })

        this.devices = newDeviceList
        return this.devices
    }
}

/**
 * @description Class representing a set ofuser
 *
 * **/
class Users {

    /**
     * Create a users set object
     * @param {User} users	Array of user objects
     * **/
    constructor(users) {
        this.users = users
    }

    getUsers() {
        return this.users
    }

    addUser(newUser) {
		// Check not null user fields
		if( newUser.username !== '' ) {
			// Check not repeat username
			const foundUser = this.users.find((user) => {
				return user.username === newUser.username
			})
			if ( foundUser === undefined ) {
				this.users.push(newUser)
			} else {
				alert('Username already exist!')
				console.error('Username already exist')
				return undefined
			}
		}
    }

    getUserByName(username) {
        const foundUser = this.users.find((user) => {
            return user.username === username
        })

        if (foundUser != undefined) {
            return foundUser
        } else {
           console.error('Incorrect or missing username')
            return undefined
        }
    }

    getUserByEmail(email) {
        const foundUser = this.users.find((user) => {
            return user.email === email
        })

        if (foundUser != undefined) {
            return foundUser
        } else {
            console.error('Incorrect or missing email')
            return undefined
        }
    }

    deleteUserByUsername(username) {
        const newUsersList = this.users.filter((user) => {
            return user.username !== username
        })

        this.users = newUsersList
        return this.users
    }

}

// Create users
const users = new Users([])

// Get data from sesion store
if (sessionStorage.getItem('users') !== null) {
	const storageUsers = JSON.parse(sessionStorage.getItem('users')).users
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
users.getUserByName('italijancic').addDevice(devices.getDeviceById('08:3a:f2:49:8d:7c'))
users.getUserByName('italijancic').addDevice(devices.getDeviceById('8c:4b:14:0e:7f:58'))
users.getUserByName('cdomenje').addDevice(devices.getDeviceById('8c:4b:14:0e:7f:58'))
users.getUserByName('cdomenje').addDevice(devices.getDeviceById('cc:50:e3:82:f0:6a'))
users.getUserByName('cdomenje').addDevice(devices.getDeviceById('8c:4b:14:10:a0:40'))


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

export { User, Users, users, renderUsersList }
