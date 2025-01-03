let cookie = document.getElementById("cookie");
let counter = document.getElementById("counter");

let numberOfCookies = 0;
let cookieIncreseNumber = 1;
let clickUpgradeCost = 10;
let autoclickUpgradeCost = 50;
let autoclickPurchaseCount = 0;
let maxAutoclickPurchases = 3;

let autoclickInterval = null;
let gamePaused = true;

let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");

startBtn.onclick = () => {
    gamePaused = false;
    updateButtons();
    if (autoclickPurchaseCount > 0) {
        startAutoclick();
    }
};

pauseBtn.onclick = () => {
    gamePaused = true;
    clearInterval(autoclickInterval);
    updateButtons();
};

resetBtn.onclick = () => {
    numberOfCookies = 0;
    cookieIncreseNumber = 1;
    clickUpgradeCost = 10;
    autoclickUpgradeCost = 50;
    autoclickPurchaseCount = 0;
    gamePaused = true;

    clearInterval(autoclickInterval);
    autoclickInterval = null;

    counter.innerHTML = numberOfCookies;
    clickUpgradeBtn.innerHTML = "Click upgrade (Cost: " + clickUpgradeCost + ")";
    autoclickUpgrade.innerHTML = "Autoclick (Cena: " + autoclickUpgradeCost + ")";
    
    updateButtons();
};

cookie.onclick = () => {
    if (!gamePaused) {
        numberOfCookies += cookieIncreseNumber;
        counter.innerHTML = numberOfCookies;
        updateButtons();
    }
};

let clickUpgradeBtn = document.getElementById("clickUpgrade");

clickUpgradeBtn.onclick = () => {
    if (!gamePaused && numberOfCookies >= clickUpgradeCost) {
        numberOfCookies -= clickUpgradeCost;
        clickUpgradeCost += 10;
        cookieIncreseNumber += cookieIncreseNumber;
        counter.innerHTML = numberOfCookies;
        clickUpgradeBtn.innerHTML = "Click upgrade (Cost: " + clickUpgradeCost + ")";
        updateButtons();
    }
};

let autoclickUpgrade = document.getElementById("autoclickUpgrade");

autoclickUpgrade.onclick = () => {
    if (!gamePaused && numberOfCookies >= autoclickUpgradeCost && autoclickPurchaseCount < maxAutoclickPurchases) {
        numberOfCookies -= autoclickUpgradeCost;
        autoclickUpgradeCost *= 2;
        counter.innerHTML = numberOfCookies;
        autoclickPurchaseCount++;
        autoclickUpgrade.innerHTML = "Autoclick (Cena: " + autoclickUpgradeCost + ")";

        startAutoclick();
        updateButtons();
    }
};

const startAutoclick = () => {
    if (autoclickInterval) clearInterval(autoclickInterval);
    autoclickInterval = setInterval(() => {
        if (!gamePaused) {
            numberOfCookies += cookieIncreseNumber;
            counter.innerHTML = numberOfCookies;
            updateButtons();
        }
    }, 1000);
};

const updateButtons = () => {
    clickUpgradeBtn.disabled = numberOfCookies < clickUpgradeCost || gamePaused;
    
    if (autoclickPurchaseCount < maxAutoclickPurchases) {
        autoclickUpgrade.disabled = numberOfCookies < autoclickUpgradeCost || gamePaused;
    } else {
        autoclickUpgrade.disabled = true;
        autoclickUpgrade.innerHTML = "Toto již nelze zakoupit";
    }

    startBtn.disabled = !gamePaused;
    pauseBtn.disabled = gamePaused;
}

updateButtons();