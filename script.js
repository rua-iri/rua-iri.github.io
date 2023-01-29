const shareButtons = document.querySelectorAll(".tile-share-button");
const mainShareButton = document.getElementsByClassName("share-button")[0];


function copyText(e) {
    e.preventDefault();
    const lnk = this.getAttribute("link");

    try {
        navigator.clipboard.writeText(lnk);
        alert("Copied " + lnk);
    } catch (error) {
        console.log(error);
    }
}

shareButtons.forEach(shButton => {
    shButton.addEventListener("click", copyText)
})

mainShareButton.addEventListener("click", function() {
    try {
        navigator.clipboard.writeText("https://rua-iri.github.io/");
        alert("Copied https://rua-iri.github.io/");
    } catch (error) {
        console.log(error);
    }
})