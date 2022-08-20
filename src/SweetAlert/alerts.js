/**
* @brief function to print success msg over alert
* @param {string} msg msg to print on alert
* **/
export const successAlert = (msg) => {

	Swal.fire({
		icon: 'success',
		title: 'Success',
		text: msg
	})
}

/**
* @brief function to print success msg over alert
* @param {string} msg msg to print on alert
* **/
export const errorAlert = (msg) => {
	Swal.fire({
		icon: 'error',
		title: 'Error',
		text: msg
	})
}
