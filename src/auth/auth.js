import { errorAlert, successAlert } from "../SweetAlert/alerts.js"


const login = async () => {
	try {
		const data = await fetch('../src/json/authData.json')
		const loginJson = await data.json()
		return loginJson
	} catch (error) {
		console.error(error)
		return error
	}
}

const savedAuthData = JSON.parse(sessionStorage.getItem('authData'))

if (savedAuthData === null || savedAuthData.logged === false) {

	const authData = await login()
	console.log(authData)

	// Show password
	document.querySelector('#showPassword').addEventListener('click', () => {
		if (document.querySelector('#login-password').type === 'password') {
			document.querySelector('#login-password').type = 'text'
		} else {
			document.querySelector('#login-password').type = 'password'
		}
	})

	document.querySelector('#login-form').addEventListener('submit', (event) => {
		event.preventDefault()

		const loginData = {
			"username": event.target[0].value,
			"password": event.target[1].value
		}

		console.log(loginData)

		if (loginData.username && loginData.password) {
			if (loginData.username === authData.username) {
				if (loginData.password === authData.password) {
					successAlert('Login OK!')
					authData.logged = true
					sessionStorage.setItem('authData', JSON.stringify(authData))
					setTimeout(() => {
						window.location.replace('../pages/dashboard.html')
					}, 2000)
				} else {
					errorAlert('Incorrect or missing password')
				}
			} else {
				errorAlert('Incorrect or missing username!')
			}
		} else {
			errorAlert('All fields are required!')
		}
	})
} else {
	window.location.replace('../../pages/dashboard.html')
}