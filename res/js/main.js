let cookie = document.getElementById("cookie");
let counter = document.getElementById("counter");

let numberOfCookies = 0;
let cookieIncreseNumber = 1;
let clickUpgradeCost = 10;
let autoclickUpgradeCost = 50;
let autoclickPurchaseCount = 0; // Sleduje počet zakoupení automatického klikání
let maxAutoclickPurchases = 3; // Maximální počet zakoupení

let autoclickInterval = null; // Uložíme interval pro automatické klikání
let gamePaused = true; // Proměnná sledující, zda je hra pozastavená

// Tlačítka Start, Pause a Reset
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let resetBtn = document.getElementById("resetBtn");

startBtn.onclick = () => {
    gamePaused = false;
    updateButtons();
    // Obnovíme automatické klikání, pokud uživatel nějaké zakoupil
    if (autoclickPurchaseCount > 0) {
        startAutoclick();
    }
};

pauseBtn.onclick = () => {
    gamePaused = true;
    clearInterval(autoclickInterval); // Zastavíme automatické klikání
    updateButtons();
};

resetBtn.onclick = () => {
    // Resetování všech hodnot
    numberOfCookies = 0;
    cookieIncreseNumber = 1;
    clickUpgradeCost = 10;
    autoclickUpgradeCost = 50;
    autoclickPurchaseCount = 0; // Reset počtu zakoupení
    gamePaused = true; // Hra je pozastavena

    clearInterval(autoclickInterval); // Zastavení automatického klikání
    autoclickInterval = null;

    // Aktualizace UI
    counter.innerHTML = numberOfCookies;
    clickUpgradeBtn.innerHTML = "Click upgrade (Cost: " + clickUpgradeCost + ")";
    autoclickUpgrade.innerHTML = "Autoclick (Cena: " + autoclickUpgradeCost + ")";
    
    updateButtons(); // Aktualizace tlačítek
};

cookie.onclick = () => {
    if (!gamePaused) { // Pouze pokud hra není pozastavena
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
        cookieIncreseNumber += cookieIncreseNumber; // Zvyšujeme hodnotu za kliknutí
        counter.innerHTML = numberOfCookies;
        clickUpgradeBtn.innerHTML = "Click upgrade (Cost: " + clickUpgradeCost + ")";
        updateButtons();
    }
};

let autoclickUpgrade = document.getElementById("autoclickUpgrade");

autoclickUpgrade.onclick = () => {
    if (!gamePaused && numberOfCookies >= autoclickUpgradeCost && autoclickPurchaseCount < maxAutoclickPurchases) {
        numberOfCookies -= autoclickUpgradeCost;
        autoclickUpgradeCost *= 2; // Zvyšujeme cenu upgradu
        counter.innerHTML = numberOfCookies;
        autoclickPurchaseCount++;
        autoclickUpgrade.innerHTML = "Autoclick (Cena: " + autoclickUpgradeCost + ")";

        // Spustíme automatické klikání
        startAutoclick();
        updateButtons();
    }
};

const startAutoclick = () => {
    if (autoclickInterval) clearInterval(autoclickInterval); // Zastavíme předchozí interval
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

    // Povolení/zakázání tlačítek start, pause a reset podle stavu hry
    startBtn.disabled = !gamePaused;
    pauseBtn.disabled = gamePaused;
}

// Inicializujeme tlačítka na začátku
updateButtons();
