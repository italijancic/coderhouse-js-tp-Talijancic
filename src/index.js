/**
 *	@summary file to implement code for 3rd complement challenge on js course
 *	@author Ivan Talijancic <italijancic@outlook.com>
 *
 *	Create at: 09/08/2022 - 19:45hs
 * **/

import { users, renderUsersList } from "./usersServices.js"
import { devices, renderDevicesList  } from "./devicesServices.js"

document.addEventListener('DOMContentLoaded', () => {

	// Render users table
	renderUsersList(users.getUsers())
	// Render devices table
	renderDevicesList(devices.getDevices())

})

