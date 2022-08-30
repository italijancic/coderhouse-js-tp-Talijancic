/**
 *	@summary file to implement code for 3rd complement challenge on js course
 *	@author Ivan Talijancic <italijancic@outlook.com>
 *
 *	Create at: 09/08/2022 - 19:45hs
 * **/

import { users, renderUsersList } from '../users/users.services.js'
import { devices, renderDevicesList  } from '../devices/devices.services.js'

document.addEventListener('DOMContentLoaded', () => {

	// Render users table
	users.getUsers().success ? renderUsersList(users.getUsers().users) : console.log(users.getUsers())
	// Render devices table
	devices.getDevices().success ? renderDevicesList(devices.getDevices().devices) : console.log(devices.getDevices())
})
