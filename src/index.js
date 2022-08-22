/**
 *	@summary file to implement code for 3rd complement challenge on js course
 *	@author Ivan Talijancic <italijancic@outlook.com>
 *
 *	Create at: 09/08/2022 - 19:45hs
 * **/

import { users, renderUsersList } from './users/users.services.js'
import { devices, renderDevicesList  } from './devices/devices.services.js'

document.addEventListener('DOMContentLoaded', () => {

	// Render users table
	renderUsersList(users.getUsers())
	// Render devices table
	renderDevicesList(devices.getDevices())

	let result = users.getUserByName('italijancic').getDeviceById('8c:4b:14:0e:7f:24')
	console.log(result)
})
