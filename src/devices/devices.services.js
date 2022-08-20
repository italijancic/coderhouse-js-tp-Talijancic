import { Device, Devices } from "./devices.models.js"

// Create devices data set
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

export { devices, renderDevicesList }