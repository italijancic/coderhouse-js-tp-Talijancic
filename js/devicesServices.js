
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
            } else {
                console.error('Device ID already exist')
                return undefined
            }
        } else {
            console.error('Missing device ID. Device ID must be unique and not null')
            return undefined
        }
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
    constructor(model, id, name, location, date) {
        this.model = model
        this.id = id
        this.name = name
        this.location = location
        this.creationDate = date
    }
}

const devices = new Devices([])

if (sessionStorage.getItem('devices') !== null) {
	const storageDevices = JSON.parse(sessionStorage.getItem('devices')).devices
	storageDevices.forEach((device) => {
		devices.addDevice(new Device(device.model, device.id, device.name, device.location, device.creationDate))
	})
} else {
	devices.addDevice(new Device('T700', '08:3a:f2:49:8d:7c', 'Sensor de Temperatura', 'Oficina dyt', new Date().toLocaleString()))
	devices.addDevice(new Device('CEM', 'cc:50:e3:82:f0:6a', 'Tablero General BT', 'AGENPIA', new Date().toLocaleString()))
	devices.addDevice(new Device('IoTgw-MT', '8c:4b:14:10:a0:40', 'Celda MT Ensayo', 'Parque Industrial Avda', new Date().toLocaleString()))
	devices.addDevice(new Device('IoTgw-BT', '8c:4b:14:0e:7f:58', 'TGBT', 'AGENPIA', new Date().toLocaleString()))
	sessionStorage.setItem('devices', JSON.stringify(devices))
}

const renderDevicesList = (devices) => {

	// Render devices list
	let deviceRowData = ''

	devices.forEach((device, index) => {
		deviceRowData += `
	<tr>
		<th scope="row">${index + 1}</th>
		<td>${device.model}</td>
		<td>${device.id}</td>
		<td>${device.name}</td>
		<td>${device.location}</td>
		<td>${device.creationDate.toLocaleString()}</td>
	</tr>`
	})

	document.querySelector('#devices-data').innerHTML = deviceRowData
}


export { Device, Devices, devices, renderDevicesList }