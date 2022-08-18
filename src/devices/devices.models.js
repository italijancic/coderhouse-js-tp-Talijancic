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
    constructor(model, id, name, location, date) {
        this.model = model
        this.id = id
        this.name = name
        this.location = location
        this.creationDate = date
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
            console.log('Devices list is empty')
            return undefined
        }
    }

    getDeviceById(id) {
        const foundDevice = this.devices.find((device) => {
            return device.id === id
        })

        if (foundDevice !== undefined) {
            return foundDevice
        } else {
            console.error('Incorrect or missing device ID')
            return undefined
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
                return true
            } else {
                console.error('Device ID already exist')
                return false
            }
        } else {
            console.error('Missing device ID. Device ID must be unique and not null')
            return undefined
        }
    }
}

export { Device, Devices }
