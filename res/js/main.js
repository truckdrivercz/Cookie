let cookie = document.getElementById("cookie");
let counter = document.getElementById("counter");

let numberOfCookies = 0;
let cookieIncreseNumber = 1;
cookie.onclick = () => {
    numberOfCookies += cookieIncreseNumber;
    counter.innerHTML = numberOfCookies;
}

let wrapper = document.getElementById("wrapper");
let addButton = document.getElementById("add");

addButton.onclick = () => {
    wrapper.innerHTML += "<p>Ahoj</p>";
    wrapper.innerText += "<p>Ahoj</p>"; 
}

let box = document.getElementById("box");

box.onclick = () => {
    box.style.backgroundColor = "red";
}

let secondBox = document.getElementById("box2");

secondBox.onclick = () => {
    secondBox.innerHTML++ //++ inkrement - zvedá o 1
}

let thirdBox = document.getElementById("box3");
let leftPos = 0;
let toptPos = 0;
thirdBox.onclick = () => {
    leftPos++;
    //toptPos = toptPos + 2
    toptPos += 2;
    thirdBox.style.left = leftPos + "px";
    thirdBox.style.top = toptPos + "px";
}

let clickUpgradeBtn = document.getElementById("clickUpgrade");
let clickUpgradeCost = 10;

clickUpgradeBtn.onclick = () => {
    if (numberOfCookies >= clickUpgradeCost) {
        numberOfCookies -= clickUpgradeCost; //odečteme cenu upgradu od sušenek
        clickUpgradeCost += 10; //zvětšení cenu upgradu
        counter.innerHTML = numberOfCookies;
        cookieIncreseNumber++;
        clickUpgradeBtn.innerHTML = "Click upgrade (Cost: "+ clickUpgradeCost +")"
    }
}

let autoclickUpgrade = document.getElementById("autoclickUpgrade");
let autoclickUpgradeCost = 50;

autoclickUpgrade.onclick = () =>  {
    if(numberOfCookies >= autoclickUpgradeCost){
        numberOfCookies -= autoclickUpgradeCost;
        autoclickUpgradeCost *= 2;
        counter.innerHTML = numberOfCookies;
        autoclickUpgrade.innerHTML = "Autoclick (Cena: "+ autoclickUpgradeCost +")";
        setInterval(() => {
            numberOfCookies++;
            counter.innerHTML = numberOfCookies;
        }, 1000);
    }
}