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

//previous picture
function previousPic() {
    let a = document.querySelector('.chosen');
    let b = document.getElementById(a.id);
    let c = Number(b.id) - 1;
    if (c < 0) {
        c = pics.length;
    }
    let d = document.getElementById(c)
    a.classList.add("lightbox-pic");
    toBe.appendChild(a);
    a.classList.remove("chosen");
    d.className = "chosen";
    seen.appendChild(d);
    gallery.focus();

}

//next picture
function nextPic() {
    let a = document.querySelector('.chosen');
    let b = document.getElementById(a.id);
    let c = Number(b.id) + 1;
    if (c > pics.length) {
        c = 0
    }
    let d = document.getElementById(c)
    a.classList.add("lightbox-pic");
    toBe.appendChild(a);
    a.classList.remove("chosen");
    d.className = "chosen";
    seen.appendChild(d);
    gallery.focus();

}

//keyboard control

function keyFun(e) {
    e = e || window.event;

    if (e.keyCode == '37') {
        // left arrow
        previousPic();
    }
    else if (e.keyCode == '39') {
        // right arrow
        nextPic();
    } else if (e.keyCode == '27') {
        //escape
        hide();
    }
}

//button left
left.addEventListener("click", previousPic);

//button right
right.addEventListener("click", nextPic);

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

//lightbox small pics
toBe.addEventListener("click", (e) => {
    document.querySelector('.chosen').classList.add("lightbox-pic");
    toBe.appendChild(document.querySelector('.chosen'));
    document.querySelector('.chosen').classList.remove("chosen");
    e.target.className = "chosen";
    seen.appendChild(e.target);
    gallery.focus();


});

light.addEventListener("click", (e) => { if (e.target.className == "pic") { hide(); } })

close.addEventListener("click", hide);

/*Media query*/
if (matchMedia) {
    const mq = window.matchMedia("(max-width: 730px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
}

// media query change

function WidthChange(mq) {
    if (mq.matches) {
        close.classList.remove("fa-7x");
        close.classList.add("fa-3x");
        left.style.display = 'none';
        right.style.display = 'none';
        left.style.top = '55%';
        right.style.top = '55%';
        left.style.left = '0';
        right.style.right = '0';
        seen.style.height = '340px';
        seen.style.marginTop = '4rem';
        seen.style.padding = '1rem';
        toBe.style.width = '300px';
        toBe.style.display = 'none';
        light.style.overflow = 'scroll';

        //touchstart
        let isMoving = true;
        let isScrolling = false;
        let d = 0;
        let f = 0;
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
                d = e.changedTouches[0].clientX;
            }
        })
        pic.addEventListener("touchmove", (e) => {
            if (isMoving === true && e.target.localName == "img" && isScrolling === false) {
                f = e.changedTouches[0].clientX;
            }
        })
        pic.addEventListener("touchend", (e) => {
            if (isScrolling === false) {
                e.preventDefault();
                if (f > d) {
                    previousPic();
                    isMoving = false;
                }
                if (f < d) {
                    nextPic();
                    isMoving = false;
                }
                if (f == 0) {
                    hide();
                }
                d = 0;
                f = 0;
            }
        })

    } else {
        left.style.display = 'block';
        right.style.display = 'block';
        toBe.style.display = 'block';
        toBe.style.position = 'sticky'
        toBe.style.width = 'auto';
        close.classList.remove("fa-3x");
        close.classList.add("fa-5x");
        light.style.overflow = 'none';
    }

}