let cookie = document.getElementById("cookie");
let counter = document.getElementById("counter");

let numberOfCookies = 0;
let cookieIncreseNumber = 1;
let clickUpgradeCost = 10;
let autoclickUpgradeCost = 50;
let autoclickPurchaseCount = 0; // Sleduje počet zakoupení automatického klikání
let maxAutoclickPurchases = 3; // Maximální počet zakoupení

cookie.onclick = () => {
    numberOfCookies += cookieIncreseNumber;
    counter.innerHTML = numberOfCookies;
    updateButtons();
}

let clickUpgradeBtn = document.getElementById("clickUpgrade");

clickUpgradeBtn.onclick = () => {
    if (numberOfCookies >= clickUpgradeCost) {
        numberOfCookies -= clickUpgradeCost; // Odečteme cenu upgradu od sušenek
        clickUpgradeCost += 10; // Zvýšení ceny upgradu
        cookieIncreseNumber += cookieIncreseNumber; // Zvětšíme hodnotu za kliknutí
        counter.innerHTML = numberOfCookies;
        clickUpgradeBtn.innerHTML = "Click upgrade (Cost: " + clickUpgradeCost + ")";
        updateButtons();
    }
}

let autoclickUpgrade = document.getElementById("autoclickUpgrade");

autoclickUpgrade.onclick = () => {
    if (numberOfCookies >= autoclickUpgradeCost && autoclickPurchaseCount < maxAutoclickPurchases) {
        numberOfCookies -= autoclickUpgradeCost;
        autoclickUpgradeCost *= 2; // Zvýšení ceny upgradu
        counter.innerHTML = numberOfCookies;
        autoclickPurchaseCount++; // Zvýšíme počet nákupů
        autoclickUpgrade.innerHTML = "Autoclick (Cena: " + autoclickUpgradeCost + ")";

        setInterval(() => {
            numberOfCookies += cookieIncreseNumber;
            counter.innerHTML = numberOfCookies;
            updateButtons();
        }, 1000);

        if (autoclickPurchaseCount === maxAutoclickPurchases) {
            autoclickUpgrade.disabled = true; // Deaktivace po třetím zakoupení
        }
        updateButtons();
    }
}

// Funkce, která kontroluje a aktualizuje tlačítka podle počtu sušenek
const updateButtons = () => {
    clickUpgradeBtn.disabled = numberOfCookies < clickUpgradeCost;
    
    // Pokud ještě nebylo dosaženo maximálního počtu zakoupení, tlačítko je aktivní
    if (autoclickPurchaseCount < maxAutoclickPurchases) {
        autoclickUpgrade.disabled = numberOfCookies < autoclickUpgradeCost;
    } else {
        autoclickUpgrade.disabled = true; // Tlačítko je trvale deaktivováno po třetím zakoupení
        autoclickUpgrade.innerHTML = "Toto již nelze koupit";
    }
}

// Inicializujeme tlačítka na začátku
updateButtons();
