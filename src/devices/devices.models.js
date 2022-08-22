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
        return this.devices.length != 0 ? { success: true,  devices: this.devices } : { success: false, message: 'Device list is empty!' }
    }

    getDeviceById(id) {
        const foundDevice = this.devices.find((device) => {
            return device.id === id
        })
        return foundDevice !== undefined ? { success: true, device: foundDevice } : { success: false, message: 'Incorrect or missing device ID!' }
    }

    getDeviceByModel(model) {
        const foundDevices = this.devices.filter((device) => {
            return device.model === model
        })
        return foundDevices !== undefined ? { success: true, devices: foundDevices } : { success: false, message: 'Not device found!'}
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
                return { success: true, message: 'New device added successfully' }
            } else {
                return { success: false, message: 'Device ID already exist!' }
            }
        } else {
            return {
                success: false,
                message: 'Missing device ID. Device ID must be unique and not null!'
            }
        }
    }
}

export { Device, Devices }
