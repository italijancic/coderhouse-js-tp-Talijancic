import { Device } from './devices.models.js';
import { devices, renderDevicesList, renderDevicesSearchResult } from './devices.services.js'
import { users } from '../users/users.services.js'
import { errorAlert, successAlert } from '../SweetAlert/alerts.js'


document.addEventListener('DOMContentLoaded', () => {

	// Render device table
	devices.getDevices().success ? renderDevicesList(devices.getDevices().devices) : console.log(devices.getDevices().message)

	// Event handlers

	// New device form submit
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

		// Validate empty fields
		if (newDevice.model && newDevice.id && newDevice.name && newDevice.location) {

			const result = devices.addDevice(new Device(newDevice.model, newDevice.id, newDevice.name, newDevice.location, newDevice.creationDate))

			if (result.success) {
				successAlert(result.message)
				// Render new devices list
				renderDevicesList(devices.getDevices().devices)
				// Save new data on session storage
				sessionStorage.setItem('devices', JSON.stringify(devices))
				// Clear form
				document.querySelector('#device-model')[0].selected = 'selected'
				document.querySelector('#device-id-text-input').value = ''
				document.querySelector('#device-name-text-input').value = ''
				document.querySelector('#device-location-text-input').value = ''
			} else {
				errorAlert(result.message)
			}
		} else {
			errorAlert('All data fields are required!')
		}

	})

	// Search device form submit
	document.querySelector('#search-device-form').addEventListener('submit', (event) => {

		event.preventDefault()

		const searchFilterBy = event.target[0][event.target[0].selectedIndex].text
		const searchKey = event.target[1].value
		const searchData = { filter: searchFilterBy, key: searchKey }
		let searchResult = undefined;

		// Check not null search key
		if (searchKey) {
			switch (searchFilterBy) {
				case 'Id':
					// Search device by Id
					searchResult = devices.getDeviceById(searchKey)
					searchResult.success ? renderDevicesSearchResult([searchResult.device], searchData) : errorAlert(searchResult.message)
					break;

				case 'Model':
					// Search device by model
					searchResult = devices.getDeviceByModel(searchKey)
					searchResult.success ? renderDevicesSearchResult(searchResult.devices, searchData) : errorAlert(searchResult.message)
					break;

				case 'Username':
					// Search devices by username
					searchResult = users.getUserByName(searchKey)
					// If username was found
					if (searchResult.success) {
						// Get all devices of this user
						searchResult = searchResult.user.getDevices()
						searchResult.success ? renderDevicesSearchResult(searchResult.devices, searchData) : errorAlert(searchResult.message)
						break;
					} else {
						errorAlert(searchResult.message)
						break;
					}

				default:
					errorAlert('Select one serch filter (Id or Model)')
					break;
			}
		} else {
			errorAlert('Empty search field!')
		}

	})

})