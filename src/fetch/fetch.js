
export const get = async (url) => {
	try {
		const data = await fetch(url)
		const loginJson = await data.json()
		return loginJson
	} catch (error) {
		return error
	}
}