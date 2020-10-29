const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authFormContainer = document.getElementById('authFormContainer');

const loginHandler = async (event) => {
	event.preventDefault();

	const emailOrContact = document.getElementById('emailOrContact');
	const passwordLogin = document.getElementById('passwordLogin');

	// console.log('[DEBUG] emailOrContact: ', emailOrContact.value);
	// console.log('[DEBUG] typeof(emailOrContact): ', typeof emailOrContact.value);

	let email;
	let contactNumber;
	let password = passwordLogin.value;

	if (parseInt(emailOrContact.value)) {
		contactNumber = emailOrContact.value;
	} else {
		email = emailOrContact.value;
	}

	const body = email ? { email, password } : { contactNumber, password };
	const url = '/users/login';

	// error handling needs some work
	axios
		.post(url, body)
		.then((resp) => {
			// console.log('[DEBUG] resp: ', resp);
			// console.log('[DEBUG] resp.data: ', resp.data);

			localStorage.setItem('user', JSON.stringify(resp.data.user));
			localStorage.setItem('token', resp.data.token);
			alert('Logged in successfully');
			authFormContainer.style.display = 'none';
		})
		.catch((err) => {
			// console.log(err.response);
			console.log(err.response.data.message);
			// alert(err.response.data.message);
			alert('Wrong credentials.');
		});
};

const registerHandler = async (event) => {
	event.preventDefault();
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const email = document.getElementById('email').value;
	const contactNumber = document.getElementById('contactNumber').value;
	const password = document.getElementById('password').value;
	const repeatPassword = document.getElementById('repeatPassword').value;

	const body = {
		firstName,
		lastName,
		email,
		contactNumber,
		password,
		repeatPassword,
	};

	const url = '/users/register';

	const resp = await axios.post(url, body);
	console.log('[DEBUG] resp: ', resp);

	// error handling needs some work
	axios
		.post(url, body)
		.then((resp) => {
			// console.log('[DEBUG] resp: ', resp);
			// console.log('[DEBUG] resp.data: ', resp.data);

			localStorage.setItem('user', JSON.stringify(resp.data.user));
			localStorage.setItem('token', resp.data.token);
			alert('Registered successfully');

			authFormContainer.style.display = 'none';
		})
		.catch((err) => {
			console.log(err.response.data.message);
			// alert(err.response.data.message);
			alert('Invalid credentials.');
		});
};

loginForm.addEventListener('submit', loginHandler);
registerForm.addEventListener('submit', registerHandler);
