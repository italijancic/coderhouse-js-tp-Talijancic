import { Device, Devices } from "./devices.models.js"


const fetchDecives = async () => {
	try {
		const data = await fetch('../src/json/devices.json')
		const devicesJson = await data.json()
		return devicesJson
	} catch (error) {
		console.error(error)
		return error
	}
}

const { devices: devicesJson } = await fetchDecives()
console.log(devicesJson)

// Create devices data set
const devices = new Devices([])

if (sessionStorage.getItem('devices') !== null) {
	const { devices: storageDevices } = JSON.parse(sessionStorage.getItem('devices'))
	storageDevices.forEach((device) => {
		devices.addDevice(new Device(device.model, device.id, device.name, device.location, device.creationDate))
	})
} else {
	devicesJson.forEach((device) => {
		devices.addDevice(new Device(device.model, device.id, device.name, device.location, device.creationDate))
	})
	console.debug('[devices.services.js]: not load from local storage!')
	// devices.addDevice(new Device('T700', '08:3a:f2:49:8d:7c', 'Sensor de Temperatura', 'Oficina dyt', new Date().toLocaleString()))
	// devices.addDevice(new Device('CEM', 'cc:50:e3:82:f0:6a', 'Tablero General BT', 'AGENPIA', new Date().toLocaleString()))
	// devices.addDevice(new Device('IoTgw-MT', '8c:4b:14:10:a0:40', 'Celda MT Ensayo', 'Parque Industrial Avda', new Date().toLocaleString()))
	// devices.addDevice(new Device('IoTgw-BT', '8c:4b:14:0e:7f:58', 'TGBT', 'AGENPIA', new Date().toLocaleString()))
	sessionStorage.setItem('devices', JSON.stringify(devices))
}


const renderDevicesList = (devices) => {

	const fragment = document.createDocumentFragment()

	devices.forEach((device, index) => {
		const deviceRowData = document.createElement('tr')
		document.querySelector('#devices-data').innerHTML = ''

		deviceRowData.innerHTML = `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${device.model}</td>
			<td>${device.id}</td>
			<td>${device.name}</td>
			<td>${device.location}</td>
			<td>${device.creationDate.toLocaleString()}</td>
		</tr>`

		fragment.appendChild(deviceRowData)
	})

	document.querySelector('#devices-data').appendChild(fragment)
}

const renderDevicesSearchResult = (devices, searchData) => {

	const fragment = new DocumentFragment()
	document.querySelector('#devices-search-result').innerHTML = ''

	devices.forEach((device, index) => {
		const deviceRowData = document.createElement('tr')

		deviceRowData.innerHTML = `
		<tr>
			<th scope="row">${index + 1}</th>
			<td>${device.model}</td>
			<td>${device.id}</td>
			<td>${device.name}</td>
			<td>${device.location}</td>
			<td>${device.creationDate.toLocaleString()}</td>
		</tr>`

		fragment.appendChild(deviceRowData)
	})

	document.querySelector('#devices-search-result').appendChild(fragment)
	document.querySelector('#devices-search-data').innerHTML = `Filter: ${searchData.filter} - Key: ${searchData.key}`
	document.querySelector('#search-results').style.display = 'block'
}

export { devices, renderDevicesList, renderDevicesSearchResult }