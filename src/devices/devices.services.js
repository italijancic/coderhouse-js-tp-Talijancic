import { Device, Devices } from "./devices.models.js"
import { get } from '../fetch/fetch.js'

// Fetch devices from json file
const { devices: devicesJson } = await get('../src/json/devices.json')
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