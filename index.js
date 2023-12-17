// footer element
const footer = document.querySelector("#footer");
const footerHeight = Number(
    getComputedStyle(footer).height.replace(/[^\d.-]/g, "")
);

// rotates the footer expand chevron to specified value
function rotateChevron(targetRot) {
    // initialise animation variable
    let id = null;
    clearInterval(id);
    id = setInterval(frame, 1);
    // get chevron element
    const chevron = document.querySelector("#footerExpandIcon");
    // get current rotation as a number
    let elementRot = Number(
        getComputedStyle(chevron).rotate.replace(/[^\d.-]/g, "")
    );
    // make target rotation greater than current
    while (targetRot < elementRot) {
        targetRot += 360;
    }
    // speed of rotation
    const increment = 15;
    function frame() {
        // if target reached, end animation, else increment rotation
        if (elementRot == targetRot) {
            while (elementRot >= 360) {
                elementRot -= 360;
            }
            chevron.style.rotate = elementRot + "deg";
            clearInterval(id);
        } else {
            elementRot += increment;
            if (elementRot > targetRot) {
                elementRot = targetRot;
            }
            chevron.style.rotate = elementRot + "deg";
        }
    }
}

// increase/decrease height of specified element to specified height i
function expandHeight(finalHeight, increment, element) {
    let id = null;
    clearInterval(id);
    let height = Number(
        getComputedStyle(element).height.replace(/[^\d.-]/g, "")
    );
    id = setInterval(frame, 1);

    function frame() {
        if (
            (increment > 0 && height < finalHeight) ||
            (increment < 0 && height > finalHeight)
        ) {
            height += increment;
            if (
                (increment > 0 && height > finalHeight) ||
                (increment < 0 && height < finalHeight)
            ) {
                height = finalHeight;
            }
            element.style.height = height + "px";
        } else {
            clearInterval(id);
        }
    }
}

footer.addEventListener("mouseenter", () => {
    expandHeight(footerHeight + 40, 10, footer);
    rotateChevron(180);
});
footer.addEventListener("mouseleave", () => {
    expandHeight(footerHeight, -10, footer);
    rotateChevron(0);
});
