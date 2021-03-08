const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const fadeElements = document.querySelectorAll('.has-fade');

btnHamburger.addEventListener('click', function() {
  if(header.classList.contains('open')) { // close
    fadeElements.forEach(function(element) {
      element.classList.remove('fade-in');
      element.classList.add('fade-out');
    });
  } else { // open
    fadeElements.forEach(function(element) {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });
  }
  header.classList.toggle('open');
  body.classList.toggle('noscroll');
})


window.matchMedia('(min-width: 64em)').onchange = function (event) {
	if(header.classList.contains('open')) { // close
    fadeElements.forEach(function(element) {
      element.classList.remove('fade-in');
      element.classList.add('fade-out');
    });
    header.classList.remove('open')
    header.classList.remove('noscroll')
  } 
};