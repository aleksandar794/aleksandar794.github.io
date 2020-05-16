const light = document.querySelector(".lightbox");
const left = document.querySelector(".arrow-left");
const right = document.querySelector(".arrow-right");
const close = document.querySelector(".close");
const gallery = document.querySelector(".gallery");
const seen = document.querySelector(".seen");
const toBe = document.querySelector(".to-be");
const pic = document.querySelector(".pic");
const pics = document.getElementsByClassName("lightbox-pic");
const img = document.querySelectorAll('img');

//check for errors
img.forEach((e) => {
    e.addEventListener("error", (e) => {
        alert('The following pictures are missing:' + ' ' + e.target.src);
    });
});

//on load 
window.onload = () => {
    if (pics == null || gallery == null) {
        alert('Not working!!!!');
    } else {
        for (let i = 0; i < pics.length; i++) {
            const p = pics[i];
            const z = p.id = i;
        }
    }
}

//to hide lightbox
function hide() {
    light.classList.remove("show");
    light.classList.add("out");
    setTimeout(() => {
        light.style.display = 'none';
    }, 200);
    toBe.appendChild(document.querySelector('.chosen'));
    document.querySelector('.chosen').classList.add("lightbox-pic");
    document.querySelector('.chosen').classList.remove("chosen");
    document.documentElement.style.overflow = "auto";
}

//pic control

function changePic(string) {
    let currentPic = document.querySelector('.chosen');
    let currentPicId = document.getElementById(currentPic.id);
    let desiredPicId
    if (string === "next") {
        desiredPicId = Number(currentPicId.id) + 1
        if (desiredPicId > pics.length) {
            desiredPicId = 0
        }
    } else {
        desiredPicId = Number(currentPicId.id) - 1
        if (desiredPicId < 0) {
            desiredPicId = pics.length;
        }
    }
    let desiredPic = document.getElementById(desiredPicId)
    currentPic.classList.add("lightbox-pic");
    toBe.appendChild(currentPic);
    currentPic.classList.remove("chosen");
    desiredPic.className = "chosen";
    seen.appendChild(desiredPic);
    gallery.focus();

}
//keyboard control

function keyFun(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        // left arrow
        changePic("previous");
    }
    else if (e.keyCode == '39') {
        // right arrow
        changePic("next");
    } else if (e.keyCode == '27') {
        //escape
        hide();
    }
}
//keyboard control
gallery.addEventListener("keydown", keyFun);
//open lightbox and show the chosen pic from gallery
gallery.addEventListener("click", (e) => {
    e.preventDefault();
    light.classList.remove("out");
    light.style.display = 'block';
    light.classList.add("show");
    document.documentElement.style.overflow = "hidden";
    n = e.target.src;
    let i = 0;
    for (let i = 0; i < pics.length; i++) {
        const p = pics[i];
        if (p.src == n) {
            p.className = "chosen";
            seen.append(p);
        }
    }
});

//left button
left.addEventListener("click", () => { changePic("previous") });
//right button
right.addEventListener("click", () => { changePic("next") });

//lightbox small pics
toBe.addEventListener("click", (e) => {
    document.querySelector('.chosen').classList.add("lightbox-pic");
    toBe.appendChild(document.querySelector('.chosen'));
    document.querySelector('.chosen').classList.remove("chosen");
    e.target.className = "chosen";
    seen.appendChild(e.target);
    gallery.focus();


});
//hide lightbox if clicked on empty space
light.addEventListener("click", (e) => { if (e.target.className == "pic") { hide(); } })
//close button
close.addEventListener("click", hide);

//media query
if (matchMedia) {
    const mq = window.matchMedia("(max-width: 830px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
}

// media query change

function WidthChange(mq) {
    if (mq.matches) {
        close.classList.remove("fa-7x");
        close.classList.add("fa-3x");

        //touchstart
        let isMoving = true;
        let isScrolling = false;
        let touchStartClientX = 0;
        let toutchMoveClientX = 0;
        light.onscroll = (e) => {
            isMoving = false;
            isScrolling = true;
        }

        light.addEventListener("touchend", (e) => {
            isScrolling = false;
            isMoving = true;
        });

        pic.addEventListener("touchstart", (e) => {
            if (isScrolling != true) {
                touchStartClientX = e.changedTouches[0].clientX;
            }
        })
        pic.addEventListener("touchmove", (e) => {
            if (isMoving === true && e.target.localName == "img" && isScrolling === false) {
                toutchMoveClientX = e.changedTouches[0].clientX;
            }
        })
        pic.addEventListener("touchend", (e) => {
            if (isScrolling === false) {
                e.preventDefault();
                if (toutchMoveClientX > touchStartClientX) {
                    changePic("previous");
                    isMoving = false;
                }
                if (toutchMoveClientX < touchStartClientX) {
                    changePic("next");
                    isMoving = false;
                }
                if (toutchMoveClientX == 0) {
                    hide();
                }
                touchStartClientX = 0;
                toutchMoveClientX = 0;
            }
        })

    }

}