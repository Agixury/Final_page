const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authFormContainer = document.getElementById('authFormContainer');
const logoutbutton = document.getElementById('logoutButton');
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
if(localStorage.getItem('token')){
	authFormContainer.style.display = 'none';
	let userx=JSON.parse(localStorage.getItem('user'));
	let tosend=capitalizeFirstLetter(userx.firstName)+" "+capitalizeFirstLetter(userx.lastName);
	document.getElementById("loginButton").innerHTML = '<div class="dropdown"><button id="dropbtn"><em><strong><div id="userName">User</div></strong></em></button><div id="myDropdown" class="dropdown-content"><a id="useroption" href="/profile">Profile</a><a id="logoutdesktop" href="#">Logout</a></div></div>';
	document.getElementById("userName").innerText = `${tosend}`;
	document.getElementById("dropbtn").addEventListener('click', ()=>{
		document.getElementById("myDropdown").classList.toggle("show");
	});
	document.getElementById('logoutdesktop').addEventListener('click',async ()=>{
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		window.location.reload();
	});
	document.getElementById('loginButtonmobileview').innerText = tosend;
	document.getElementById('logoutButton').innerText = 'LOGOUT';
	document.getElementById('logoutButton').addEventListener('click',async ()=>{
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		window.location.reload();
	});
}
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
			alert('Logged in successfully. Click OK');
			authFormContainer.style.display = 'none';
			window.location.reload();
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
			window.location.reload();
		})
		.catch((err) => {
			console.log(err.response.data.message);
			// alert(err.response.data.message);
			alert('Registered Successfully!');
			window.location.reload();
		});
};

// const logoutHandler = async (event) => {
// 	// event.preventDefault();
// 	localStorage.removeItem('user');
// 	localStorage.removeItem('token');
// 	window.location.reload();
// }

loginForm.addEventListener('submit', loginHandler);
registerForm.addEventListener('submit', registerHandler);
// logoutbutton.addEventListener('click',logoutHandler);
