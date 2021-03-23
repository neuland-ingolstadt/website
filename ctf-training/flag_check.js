(function() {

	async function sha256(text) {
		const encoder = new TextEncoder();
		const data = encoder.encode(text);
		const buff = await crypto.subtle.digest('SHA-256', data);
		const array = new Uint8Array(buff)
		return [...array].map(x => x.toString(16).padStart(2, '0')).join('')
	}

	async function checkFlag(flag) {
		// basically for each valid flag there exists a file
		// `files/flag-${sha256(flag)}`
		// this way we dont need a backend for flag checking

		const digest = await sha256(flag)
		const path = `files/flag-${digest}`;
		const res = fetch(path)
			.then(r => r.status === 200 ? r : Promise.reject(r.statusText))
			.then(r => r.text())
			.catch(err => null);

		return res;
	}

	const input = document.getElementById('flagInput')
	const btn = document.getElementById('checkFlagButton')
	const respAlert = document.getElementById('responseAlert')

	btn.addEventListener('click', ev => {


		respAlert.classList.add('hidden')

		checkFlag(input.value).then(text => {

			respAlert.classList.remove('hidden')
			respAlert.classList.remove('terminal-alert-success')
			respAlert.classList.remove('terminal-alert-error')

			if(text) {
				respAlert.classList.add('terminal-alert-success')
				respAlert.innerText = text
			}
			else {
				respAlert.classList.add('terminal-alert-error')
				respAlert.innerText = 'Incorrect Flag!'
			}

		})

	})

})();