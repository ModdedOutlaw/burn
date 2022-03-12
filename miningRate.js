async function fetchPoolsJSON() {
    const response = await fetch('pools.json');
    const pools = await response.json();
    return pools;
}

async function fetchKeysJSON(walletAddress) {
    const response = await fetch('https://wax.api.atomicassets.io/atomicmarket/v1/assets?collection_name=upliftworld&schema_name=keys&owner='+walletAddress+'&page=1&limit=100&order=desc&sort=asset_id');
    const keys = await response.json();
    return keys;
}

async function fetchMinersJSON(walletAddress) {
    const response = await fetch('https://wax.api.atomicassets.io/atomicmarket/v1/assets?collection_name=upliftworld&schema_name=miners&owner='+walletAddress+'&page=1&limit=100&order=desc&sort=asset_id');
    const keys = await response.json();
    return keys;
}


async function getMiningRate() {

    const outputMiners = document.querySelector('.miningPower');

    const outputInfo = document.querySelector('.outputInfo');

    const miners = {
        name: "",
        rate: 0,
        id:0
    };

    const outputMiningRate = document.querySelector('.miningRate');
  
    outputMiningRate.innerHTML = "";


    let minerArray = [];
    let keysOwned = [];
    let minersOwned = [];

    let upliftiumPerHourKeys = 0;
    let upliftiumPerHourMiners = 0;

   // console.log(wallet);
    let walletAddress = document.getElementById("wallet").value;

    console.log(document.getElementById("wallet").value);

    await fetchPoolsJSON().then(pools => {
        console.log(pools);
        pools.data.payload.forEach((element, index) => {
            console.log(element.label);
            const miner = Object.create(miners);
            if(element.label == "Common NES Miner"){
                //console.log("NE5 --> NES");
                miner.name = "Common NE5 Miner";
            }else if(element.label == "Uncommon NES Miner"){
                miner.name = "Uncommon NE5 Miner";
            }else if(element.label == "Rare NES Miner"){
                miner.name = "Rare NE5 Miner";
            }else if(element.label == "Epic NES Miner"){
                miner.name = "Epic NE5 Miner";
            }else if(element.label == "Legendary NES Miner"){
                miner.name = "Legendary NE5 Miner";
            }else if(element.label == "Mythic Miner - Cauê's Serenity"){
                miner.name = "Ultimate Gratitude Machine - Mythic - Cauê's Serenity";
                //console.log(miner.name);
            }else if(element.label == "Mythic Miner - Nick's Network"){
                miner.name = "Mythic Miner - Nick's Networks";
                //console.log(miner.name);
            }
            else{
            miner.name = element.label;
            }
            miner.rate = parseFloat(element.size_per_tick_per_asset);
            miner.id = element.template_id;
            minerArray[index] = miner;

        });
    });
    console.log("POOL INFO......");
    console.log(minerArray);

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
    //console.log(keysOwned);

    await fetchMinersJSON(walletAddress).then(miners => {
        miners.data.forEach((element, index) => {
            minersOwned[index] = element;
        });
    });

    console.log(minersOwned);

    //console.log(keysOwned);
    keysOwned.forEach(element => {

        let key = minerArray.find(o => o.name === element);
        //console.log(key.rate);

        upliftiumPerHourKeys += parseFloat(key.rate);

    });
    console.log("UPLIFTIUM PER HOUR FROM KEYS...");
    console.log(upliftiumPerHourKeys);

    minersOwned.forEach(element => {
        console.log(element.template.template_id);
        let m = minerArray.find(o => o.id === element.template.template_id);
        console.log(m);
        console.log(m.rate);
        upliftiumPerHourMiners += parseFloat(m.rate);

    });

    console.log(upliftiumPerHourMiners);
 
    outputMiningRate.innerHTML += '<br><h1>Mining Rate Per Hour = ' + (upliftiumPerHourKeys + upliftiumPerHourMiners) + '</h1>';

}