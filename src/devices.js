import { Device, Devices, devices, renderDevicesList } from "./devicesServices.js";


document.addEventListener('DOMContentLoaded', () => {

	renderDevicesList(devices.getDevices())


	document.querySelector('#new-device-form').addEventListener('submit', (event) => {

		event.preventDefault()

		// Create new Device class instance
		const newDevice = {
			"model": event.target[0][event.target[0].selectedIndex].text,
			"id": event.target[1].value,
			"name": event.target[2].value,
			"location": event.target[3].value,
			"creationDate": new Date().toLocaleString()
		}

		devices.addDevice(new Device(newDevice.model, newDevice.id, newDevice.name, newDevice.location, newDevice.creationDate))

		// Clear form
		document.querySelector('#device-model')[0].selected = 'selected'
		document.querySelector('#device-id-text-input').value = ''
		document.querySelector('#device-name-text-input').value = ''
		document.querySelector('#device-location-text-input').value = ''

		// Render new devices list
		renderDevicesList(devices.getDevices())

		// Save new data on session storage
		sessionStorage.setItem('devices', JSON.stringify(devices))
	})

})