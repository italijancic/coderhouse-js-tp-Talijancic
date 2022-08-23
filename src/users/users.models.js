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
        return this.devices.length != 0 ? {success: true, devices: this.devices} : { success: false, message: 'This user has not devices!' }
    }

    getDeviceById(id) {
        if (this.devices.length != 0) {
            const foundDevice = this.devices.find((device) => (device.id === id))
            return foundDevice !== undefined ? foundDevice : { success: false, message: 'Device ID does not exist on devices list'}
        } else {
            return { success: false, message: 'This user has not devices!' }
        }
    }

    addDevice(newDevice) {
        const foundDevice = this.devices.find((device) => (device.id === newDevice.id))
        if (foundDevice === undefined) {
            this.devices.push(newDevice)
            return { success: true, message: 'New device addedd to device list' }
        } else {
            return { success: false, message: 'Device ID alreadey exist on this user devices list' }
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
        return {
            success: true,
            message: 'Delete device from device list OK',
            newDeviceList: this.devices
        }
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
        return this.users.length != 0 ? { success: true, users: this.users } : { success: false, message: 'Users list is empty'}
    }

    addUser(newUser) {
		// Check not null user fields
		if( newUser.username !== '' ) {
			// Check not repeat username
			let foundUser = this.users.find((user) => {
				return user.username === newUser.username
			})
			if ( foundUser === undefined ) {
                // Check not repear email
                foundUser = this.users.find((user) => {
                    return user.email === newUser.email
                })
                if ( foundUser === undefined ) {
                    this.users.push(newUser)
                    return { success: true, message: `${newUser.username} has been added to users list successfully!`}
                } else {
                    return { success: false, message: 'Email already exist' }
                }
			} else {
                return { success: false, message: 'Username already exist' }
			}
		}
    }

    getUserByName(username) {
        const foundUser = this.users.find((user) => {
            return user.username === username
        })
        return foundUser != undefined ? { success: true, user: foundUser } : { success: false, message: 'Incorrect or missing username'}
    }

    getUserByEmail(email) {
        const foundUser = this.users.find((user) => {
            return user.email === email
        })
        return foundUser != undefined ? { success: true, user: foundUser } : { success: false, message: 'Incorrect or missing email'}
    }

    deleteUserByUsername(username) {
        const newUsersList = this.users.filter((user) => {
            return user.username !== username
        })

        this.users = newUsersList
        return {
            success: true,
            message: 'Delete user from users list OK',
            newDeviceList: this.users
        }
    }

}

export { User, Users }
