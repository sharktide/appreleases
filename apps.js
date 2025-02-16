const recyclebot = document.getElementById("Recyclesmart Desktop");
const currencyconv = document.getElementById("Currency Converter");

async function checkforclick() {
    recyclebot.onclick = function() {
        window.location.href = "https://recyclesmart.vercel.app";
    };
    recyclebot.addEventListener('mouseenter', function() {
        recyclebot.style.backgroundColor = 'lightgrey';
    });
    
    recyclebot.addEventListener('mouseleave', function() {
        recyclebot.style.backgroundColor = 'white';
    });
    

    currencyconv.onclick = function() {
        window.location.href = "/pages?page=currencyconverter";
    };
    currencyconv.addEventListener('mouseenter', function() {
        currencyconv.style.backgroundColor = 'lightgrey';
    });
    
    currencyconv.addEventListener('mouseleave', function() {
        currencyconv.style.backgroundColor = 'white';
    });
}

checkforclick()