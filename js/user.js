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
    constructor(username, email, password, devices) {
        this.username = username
        this.email = email
        this.password = password
        this.devices = devices
        this.creationDate = new Date()
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

    addUser(user) {
        this.users.push(user)
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

export { User, Users }