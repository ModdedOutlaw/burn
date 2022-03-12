async function fetchPoolsJSON() {
    const response = await fetch('pools.json');
    const pools = await response.json();
    return pools;
}

async function fetchKeysJSON(walletAddress) {
    const response = await fetch('https://wax.api.atomicassets.io/atomicmarket/v1/assets?collection_name=upliftworld&schema_name=keys&owner=' + walletAddress + '&page=1&limit=500&order=desc&sort=asset_id');
    const keys = await response.json();
    return keys;
}

async function fetchMinersJSON(walletAddress) {
    const response = await fetch('https://wax.api.atomicassets.io/atomicmarket/v1/assets?collection_name=upliftworld&schema_name=miners&owner=' + walletAddress + '&page=1&limit=1000&order=desc&sort=asset_id');
    const keys = await response.json();
    return keys;
}

async function fetchYoshisJSON(walletAddress) {
    const response = await fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=yoshidrops&schema_name=memberships&owner='+walletAddress+'&page=1&limit=200&order=desc&sort=asset_id');
    const yoshis = await response.json();
    return yoshis;
}

async function fetchYoshiCoinsJSON(walletAddress) {
    const response = await fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=yoshidrops&schema_name=yoshicoins&owner='+walletAddress+'&page=1&limit=200&order=desc&sort=asset_id');
    const yoshisCoins = await response.json();
    return yoshisCoins;
}

async function fetchAlphaWingsJSON(walletAddress) {
    const response = await fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=upliftworld&schema_name=collectibles&template_id=133746&owner='+walletAddress+'&page=1&limit=200&order=desc&sort=asset_id');
    const alphaWings = await response.json();
    return alphaWings;
}

async function getMiningRate() {

    const miners = {
        name: "",
        rate: 0,
        id: 0
    };

    const outputMiningRate = document.querySelector('.miningRate');

    outputMiningRate.innerHTML = "";


    let minerArray = [];
    let keysOwned = [];
    let minersOwned = [];
    let yoshisOwned = [];
    let yoshiCoinsOwned = [];
    let alphaWingsOwned = [];

    let upliftiumPerHourKeys = 0;
    let upliftiumPerHourMiners = 0;
    let upliftiumPerHourYoshis = 0;
    let upliftiumPerHourYoshiCoins = 0;
    let upliftiumPerHourAlphaWings = 0;


    let walletAddress = document.getElementById("wallet").value; 

    await fetchPoolsJSON().then(pools => {
     
        pools.data.payload.forEach((element, index) => {
    
            const miner = Object.create(miners);
            if (element.label == "Common NES Miner") {
                //console.log("NE5 --> NES");
                miner.name = "Common NE5 Miner";
            } else if (element.label == "Uncommon NES Miner") {
                miner.name = "Uncommon NE5 Miner";
            } else if (element.label == "Rare NES Miner") {
                miner.name = "Rare NE5 Miner";
            } else if (element.label == "Epic NES Miner") {
                miner.name = "Epic NE5 Miner";
            } else if (element.label == "Legendary NES Miner") {
                miner.name = "Legendary NE5 Miner";
            } else if (element.label == "Mythic Miner - Cauê's Serenity") {
                miner.name = "Ultimate Gratitude Machine - Mythic - Cauê's Serenity";
             
            } else if (element.label == "Mythic Miner - Nick's Network") {
                miner.name = "Mythic Miner - Nick's Networks";
             
            } else {
                miner.name = element.label;
            }
            miner.rate = parseFloat(element.size_per_tick_per_asset);
            miner.id = element.template_id;
            minerArray[index] = miner;

        });
    });

    await fetchKeysJSON(walletAddress).then(keys => {
        keys.data.forEach((element, i) => {
            if (element.data.name.includes("Upluft") && element.data.name.includes("Land Key")) {
                keysOwned[i] = "Land Key - Upluft";
            } else if (element.data.name.includes("Upluft") && element.data.name.includes("Rail Key")) {
                keysOwned[i] = "Rail Key - Upluft";

            } else if (element.data.name.includes("Gratitude") && element.data.name.includes("Land Key")) {
                keysOwned[i] = "Land Key - Gratitude";

            } else if (element.data.name.includes("Land Key")) {
                keysOwned[i] = "Land Key - Londom/Genesis";

            } else if (element.data.name.includes("Rail Key")) {
                keysOwned[i] = "Rail Key - Londom/Genesis";

            }

        });

    });

    await fetchMinersJSON(walletAddress).then(miners => {
        miners.data.forEach((element, index) => {
            minersOwned[index] = element;
        });
    });

    await fetchYoshisJSON(walletAddress).then(yoshis => {
        yoshis.data.forEach((element, index) => {
            console.log(yoshis);
            yoshisOwned[index] = element;
        });
    });

    await fetchYoshiCoinsJSON(walletAddress).then(yoshiCoins => {
        yoshiCoins.data.forEach((element, index) => {
            yoshiCoinsOwned[index] = element;
        });
    });

    await fetchAlphaWingsJSON(walletAddress).then(alphaWings => {
        alphaWings.data.forEach((element, index) => {
            alphaWingsOwned[index] = element;
        });
    });

    keysOwned.forEach(element => {

        let key = minerArray.find(o => o.name === element);
        upliftiumPerHourKeys += parseFloat(key.rate);

    });

    minersOwned.forEach(element => {
   
        let m = minerArray.find(o => o.id === element.template.template_id);
        upliftiumPerHourMiners += parseFloat(m.rate);

    });

   yoshisOwned.forEach(element => {
   
        let m = minerArray.find(o => o.id === element.template.template_id);
        upliftiumPerHourYoshis += parseFloat(m.rate);

    });

    yoshiCoinsOwned.forEach(element => {
   
        let m = minerArray.find(o => o.id === element.template.template_id);
        upliftiumPerHourYoshiCoins += parseFloat(m.rate);

    });
    console.log(upliftiumPerHourYoshiCoins);

    alphaWingsOwned.forEach(element => {
   
        let m = minerArray.find(o => o.id === element.template.template_id);
        upliftiumPerHourAlphaWings += parseFloat(m.rate);

    });
    console.log(upliftiumPerHourAlphaWings);

    outputMiningRate.innerHTML += '<br><h1>Upliftium per Hour</h1><h2><span>' + (upliftiumPerHourAlphaWings+ upliftiumPerHourYoshiCoins+upliftiumPerHourKeys + upliftiumPerHourMiners + upliftiumPerHourYoshis).toFixed(2) + '</span></h2>';
}