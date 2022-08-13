/**
 *	@summary file to implement code for 3rd complement challenge on js course
 *	@author Ivan Talijancic <italijancic@outlook.com>
 *
 *	Create at: 09/08/2022 - 19:45hs
 * **/


// Node js module to get an input from console
// import { prompt } from "prompt-sync"
// prompt()

// localStorage.setItem('users', JSON.stringify(users))
// const users = JSON.parse(localStorage.getItem('users'))

import { users, renderUsersList } from "./usersServices.js"
import { devices, renderDevicesList  } from "./devicesServices.js"

document.addEventListener('DOMContentLoaded', () => {

	// Render users table
	renderUsersList(users.getUsers())
	// Render devices table
	renderDevicesList(devices.getDevices())

})

