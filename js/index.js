/**
 *	@summary file to implement code for 2nd complement challenge on js course
 *	@author Ivan Talijancic <italijancic@outlook.com>
 *
 *	Create at: 08/08/2022 - 19:00hs
 * **/

import { User, Users } from './user.js'
import { Device, Devices } from './device.js'

// Node js module to get an input from console
import prompt from 'prompt-sync'
prompt()


// Create devices
const devices = new Devices([])
devices.addDevice(new Device('T700', '08:3a:f2:49:8d:7c', 'Sensor de Temperatura', 'Oficina dyt'))
devices.addDevice(new Device('CEM', 'cc:50:e3:82:f0:6a', 'Tablero General BT', 'AGENPIA'))
devices.addDevice(new Device('IoTgw-MT', '8c:4b:14:10:a0:40', 'Celda MT Ensayo', 'Parque Industrial Avda'))
devices.addDevice(new Device('IoTgw-BT', '8c:4b:14:0e:7f:58', 'TGBT', 'AGENPIA'))

console.log('Test add device method of Devices Class: Print devices list')
console.log('---------------------------------------')
console.log(devices.getDevices())

console.log('')
console.log('Test getDeviceById("08:3a:f2:49:8d:7c") method of Device Class')
console.log('-------------------------------------------------------------')
console.log(devices.getDeviceById('08:3a:f2:49:8d:7c'))

// Create users
const users = new Users([])
users.addUser(new User('italijancic', 'italijancic@gmail.com', '12345678', []))
users.addUser(new User('cdomenje', 'cdomenje@dytsoluciones.com.ar', '12345678', []))
users.addUser(new User('espesot', 'espesot@dytsoluciones.com.ar', '12345678', []))

console.log('')
console.log('Test addUser() method of Users Class: Print Users list')
console.log('------------------------------------')
console.log(users.getUsers())

console.log('')
console.log('Test getUserByName("italijancic") method of Users Class')
console.log('------------------------------------------------------')
console.log(users.getUserByName('italijancic'))

// Add devices to users objects
users.getUserByName('italijancic').addDevice(devices.getDeviceById('08:3a:f2:49:8d:7c'))
users.getUserByName('italijancic').addDevice(devices.getDeviceById('8c:4b:14:0e:7f:58'))
users.getUserByName('cdomenje').addDevice(devices.getDeviceById('8c:4b:14:0e:7f:58'))
users.getUserByName('cdomenje').addDevice(devices.getDeviceById('cc:50:e3:82:f0:6a'))
users.getUserByName('cdomenje').addDevice(devices.getDeviceById('8c:4b:14:10:a0:40'))

console.log('')
console.log('Test result of addDevice() User class method')
console.log('-------------------------------------------')
console.log(users.getUsers())

console.log('')
console.log('Test result of deleteDeviceById() User class method')
console.log('---------------------------------------------------')
users.getUserByName('italijancic').deleteDeviceById('8c:4b:14:0e:7f:58')
console.log(users.getUserByName('italijancic').getDevices())

console.log('')
console.log('Check errors handlers')
console.log('---------------------')
console.log(devices.getDeviceById('08:3a:f2:49:24:24'))
console.log(devices.addDevice(new Device('T700', '08:3a:f2:49:8d:7c', 'Sensor de Temperatura', 'Oficina dyt')))
console.log(users.getUserByName('espesot').getDevices())
console.log(users.getUserByName('espesot').getDeviceById('8c:4b:14:10:a0:40'))
console.log(users.getUserByName('italijancic').addDevice(new Device('T700', '08:3a:f2:49:8d:7c', 'Sensor de Temperatura', 'Oficina dyt')))
