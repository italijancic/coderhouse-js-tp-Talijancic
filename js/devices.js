import { Device, Devices, devices, renderDevicesList } from "./devicesServices.js";


document.addEventListener('DOMContentLoaded', () => {

	renderDevicesList(devices.getDevices())

})