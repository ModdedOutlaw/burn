async function fetchPoolsJSON() {
    const response = await fetch('pools.json');
    const pools = await response.json();
    return pools;
}

async function fetchKeysJSON() {
    const response = await fetch('https://wax.api.atomicassets.io/atomicmarket/v1/assets?collection_name=upliftworld&schema_name=keys&owner=modded.gm&page=1&limit=100&order=desc&sort=asset_id');
    const keys = await response.json();
    return keys;
}

async function fetchMinersJSON() {
    const response = await fetch('https://wax.api.atomicassets.io/atomicmarket/v1/assets?collection_name=upliftworld&schema_name=miners&owner=modded.gm&page=1&limit=100&order=desc&sort=asset_id');
    const keys = await response.json();
    return keys;
}


async function getMiningRate() {

    const outputMiners = document.querySelector('.miningPower');

    const outputInfo = document.querySelector('.outputInfo');

    const miners = {
        name: "",
        rate: 0
    };

    let minerArray = [];
    let keysOwned = [];
    let minersOwned = [];

    let upliftiumPerHourKeys = 0;
    let upliftiumPerHourMiners = 0;



    await fetchPoolsJSON().then(pools => {
        pools.data.payload.forEach((element, index) => {
            console.log(element);
            const miner = Object.create(miners);
            miner.name = element.label;
            miner.rate = element.size_per_tick_per_asset
            minerArray[index] = miner;

        });
    });

    await fetchKeysJSON().then(keys => {
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

    await fetchMinersJSON().then(miners => {
        miners.data.forEach((element, index) => {
            minersOwned[index] = element;
        });
    });

    console.log(keysOwned);
    keysOwned.forEach(element => {

        let key = minerArray.find(o => o.name === element);
        console.log(key.rate);

        upliftiumPerHourKeys += parseInt(key.rate);

    });



    minersOwned.forEach(element => {

        let m = minerArray.find(o => o.name === element.name);
        console.log(m.rate);
        upliftiumPerHourMiners += parseInt(m.rate);

    });

    console.log(upliftiumPerHourMiners);
    console.log(upliftiumPerHourKeys);
    console.log("Total Miner Rate ===> " + (upliftiumPerHourKeys + upliftiumPerHourMiners));
}