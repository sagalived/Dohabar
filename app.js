const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const logo = document.querySelector('.header .background .nav-list .logo .yout');
const mobile_menu = document.querySelector('.header .yout .background .nav ul');
const menu_item = document.querySelectorAll('.header .yout .background .nav ul li a');
const header = document.querySelector('.header.container');

logo.addEventListener('click', () => {
	logo.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});
