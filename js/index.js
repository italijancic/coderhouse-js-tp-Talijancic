/**
 *	@summary file to implement code for 2nd complement challenge on js course
 *	@author Ivan Talijancic <italijancic@outlook.com>
 *
 *	Create at: 08/08/2022 - 19:00hs
 * **/

// Node js module to get an input from console
const prompt = require('prompt-sync')()

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
        }
    }

    getDeviceById(id) {
        if (this.devices.length != 0) {
            const foundDevice = this.devices.find((device) => (device.id === id))

            if (foundDevice !== undefined) {
                return foundDevice
            } else {
                console.error('Device ID does not exist on devices list')
            }
        } else {
            console.error('This user has not devices!')
        }
    }

    addDevice(newDevice) {
        const foundDevice = this.devices.find((device) => (device.id === newDevice.id))
        if (foundDevice === undefined) {
            this.devices.push(newDevice)
        } else {
            console.error('Device ID alreadey exist on this user devices list')
        }
    }

    addDevices(newDevices) {
        newDevices.forEach((newDevice) => this.addDevice(newDevice))
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

/**
 * @description Class to represent a device
 * **/
class Device {

    /**
     * Create a device object
     * @param {string} model 	string to identificate device model
     * @param {string} id		string unique for any device
     * @param {string} name		descriptive name for device, asing by user
     * @param {string} location	string to indicate device location
     *
     * **/
    constructor(model, id, name, location) {
        this.model = model
        this.id = id
        this.name = name
        this.location = location
        this.creationDate = new Date()
    }
}

/**
 * @description Class to represent a set of devices
 * **/
class Devices {

    /**
     * Create de devices set object
     * @param {Device} devices array of device objects
     *
     * **/
    constructor(devices) {
        this.devices = devices
    }

    getDevices() {
        if (this.devices.length != 0) {
            return this.devices
        } else {
            return console.log('Devices list is empty')
        }
    }

    getDeviceById(id) {
        const foundDevice = this.devices.find((device) => {
            return device.id === id
        })

        if (foundDevice !== undefined) {
            return foundDevice
        } else {
            return console.error('Incorrect or missing device ID')
        }
    }

    addDevice(newDevice) {
        // Check not null device ID
        if (newDevice.id != '') {
            // Check not repeat device ID
            const foundDevice = this.devices.find((device) => {
                return device.id === newDevice.id
            })
            if (foundDevice === undefined) {
                this.devices.push(newDevice)
            } else {
                return console.error('Device ID already exist')
            }
        } else {
            return console.error('Missing device ID. Device ID must be unique and not null')
        }
    }
}

// Create devices
const devices = new Devices([])
devices.addDevice(new Device('T700', '08:3a:f2:49:8d:7c', 'Sensor de Temperatura', 'Oficina dyt'))
devices.addDevice(new Device('CEM', 'cc:50:e3:82:f0:6a', 'Tablero General BT', 'AGENPIA'))
devices.addDevice(new Device('IoTgw-MT', '8c:4b:14:10:a0:40', 'Celda MT Ensayo', 'Parque Industrial Avda'))
devices.addDevice(new Device('IoTgw-BT', '8c:4b:14:0e:7f:58', 'TGBT', 'AGENPIA'))

console.log('Test add device method of Devices Class: Print devices list')
console.log('---------------------------------------')
console.log(devices.getDevices())

console.log('')
console.log('Test getDeviceById("08:3a:f2:49:8d:7c") method of Device Class')
console.log('-------------------------------------------------------------')
console.log(devices.getDeviceById('08:3a:f2:49:8d:7c'))

// Create users
const users = new Users([])
users.addUser(new User('italijancic', 'italijancic@gmail.com', '12345678', []))
users.addUser(new User('cdomenje', 'cdomenje@dytsoluciones.com.ar', '12345678', []))
users.addUser(new User('espesot', 'espesot@dytsoluciones.com.ar', '12345678', []))

console.log('')
console.log('Test addUser() method of Users Class: Print Users list')
console.log('------------------------------------')
console.log(users.getUsers())

console.log('')
console.log('Test getUserByName("italijancic") method of Users Class')
console.log('------------------------------------------')
console.log(users.getUserByName('italijancic'))

// Add devices to users objects
users.getUserByName('italijancic').addDevice(devices.getDeviceById('08:3a:f2:49:8d:7c'))
users.getUserByName('italijancic').addDevice(devices.getDeviceById('8c:4b:14:0e:7f:58'))
users.getUserByName('cdomenje').addDevice(devices.getDeviceById('8c:4b:14:0e:7f:58'))
users.getUserByName('cdomenje').addDevice(devices.getDeviceById('cc:50:e3:82:f0:6a'))
users.getUserByName('cdomenje').addDevice(devices.getDeviceById('8c:4b:14:10:a0:40'))

console.log('')
console.log('Test result of addDevice() User class method')
console.log('-------------------------------------------')
console.log(users.getUsers())

// console.log(users.getUserByName('italijancic').getDevices())
// console.log(users.getUserByName('cdomenje'))
// console.log(users.getUserByEmail('italijancic@gmail.com'))
// console.log(users.getUsers())
// console.log(users.deleteUserByUsername('italijancic'))
