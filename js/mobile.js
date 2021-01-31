document.getElementById("up_btn").addEventListener('touchstart', function(event) {
    keydata.up = true;
});
document.getElementById("up_btn").addEventListener('touchend', function(event) {
    keydata.up = false;
});
document.getElementById("left_btn").addEventListener('touchstart', function(event) {
    keydata.left = true;
});
document.getElementById("left_btn").addEventListener('touchend', function(event) {
    keydata.left = false;
});
document.getElementById("down_btn").addEventListener('touchstart', function(event) {
    keydata.down = true;
});
document.getElementById("down_btn").addEventListener('touchend', function(event) {
    keydata.down = false;
});
document.getElementById("right_btn").addEventListener('touchstart', function(event) {
    event.preventDefault();
    keydata.right = true;
});
document.getElementById("right_btn").addEventListener('touchend', function(event) {
    event.preventDefault();
    keydata.right = false;
});

document.firstElementChild.style.zoom = "reset";