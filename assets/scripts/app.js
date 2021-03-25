
'use strict';

/* Responsive Menu  */

const menuBtn = document.querySelector('.navbar-button');
const navbar = document.querySelector('.navbar-toggle-lists');

const navSlide = () => {
    navbar.classList.toggle('navbar-collapse');
}

menuBtn.addEventListener('click', navSlide);

/* Stop Animations when Resizing Browser  */

let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});


/* Page Navigation with Intersection Observer  */

function selectElementByClass(className) {
    return document.querySelector(`.${className}`);
}

const sections = [
    selectElementByClass('about'),
    selectElementByClass('skills'),
    selectElementByClass('experience'),
    selectElementByClass('education'),
    selectElementByClass('recognitions'),
];

const navItems = {
    about: selectElementByClass('about-navItem'),
    skills: selectElementByClass('skills-navItem'),
    experience: selectElementByClass('experience-navItem'),
    education: selectElementByClass('education-navItem'),
    recognitions: selectElementByClass('recognitions-navItem'),
};

const observerOptions = {
    root: document,
    rootMargin: '0px',
    threshold: 0.7,
};

function observerCallback(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const navItem = navItems[entry.target.id];
            navItem.classList.add('active');
            Object.values(navItems).forEach((item) => {
                if (item != navItem) {
                    item.classList.remove('active');
                }
                /* Closes responsive menu when a scroll trigger link is clicked  */
                item.addEventListener('click', navSlide);
            });   
        }
    });
}


const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((sec) => observer.observe(sec));