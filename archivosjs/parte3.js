document.addEventListener("DOMContentLoaded", function() {
    var descubreButton = document.getElementById('descubreButton');
    descubreButton.addEventListener('click', function() {
        var container = document.querySelector('.container');
        container.classList.toggle('button-clicked');
    });
});
