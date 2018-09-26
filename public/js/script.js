// Hanburger Menu
const menuBtn = document.querySelector('.btn-menu');
const sideNav = document.querySelector('nav ul');
const aTags = document.querySelectorAll('nav ul li a');

let showMenu = false;

window.addEventListener('resize', removeMenu);
menuBtn.addEventListener('click', toggleMenu);
sideNav.addEventListener('click', removeMenu);
aTags.forEach(a => a.addEventListener('click', removeMenu));

function toggleMenu() {
    if (!showMenu) {
        addClass();
    } else {
        removeClass();
    }
}

function removeMenu() {
    removeClass();
}

function addClass() {
    menuBtn.classList.add('close');
    sideNav.classList.add('activate', 'show');

    showMenu = true;
}

function removeClass() {
    menuBtn.classList.remove('close');
    sideNav.classList.remove('show');
    setTimeout(() => sideNav.classList.remove('activate'), 400);

    showMenu = false;
}

// CK Editor
const Editor = document.querySelectorAll('.editor');
for (var i = 0; i < Editor.length; ++i) {
    ClassicEditor.create(Editor[i], {
        toolbar: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote'
        ]
    }).catch(error => {
        console.log(error);
    });
}
