const minerArray = [];

var upliftiumPerHourKeys = 0;

var upliftiumPerHourMiners = 0;

var totalUpliftiumPerHour = 0;

const miningpower = {
  keys: 0,
  miners: 0
}

const playerMiningPower = Object.create(miningpower);


async function getMiningRate() {

  const url = "pools.json";

  const outputMiners = document.querySelector('.miningPower');

  const outputInfo = document.querySelector('.outputInfo');

  const miners = {
    name: "",
    rate: 0
  };




  fetchPoolsJSON().then(pools => {
    console.log(pools); // fetched pools
    pools.data.payload.forEach((element, index) => {
      //console.log(element.label);
      //console.log(element.size_per_tick_per_asset);
      const miner = Object.create(miners);
      miner.name = element.label;
      miner.rate = element.size_per_tick_per_asset
      minerArray[index] = miner;
    });
  });


  await fetchMiningPerHourKeys();
  await fetchMiningPerHour();



}

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



async function fetchMiningPerHourKeys() {

  const urlKeys = "https://wax.api.atomicassets.io/atomicmarket/v1/assets?collection_name=upliftworld&schema_name=keys&owner=modded.gm&page=1&limit=100&order=desc&sort=asset_id";
  let keysOwned = [];



  fetchKeysJSON().then(keys => {
    console.log("FETECHED KEYS ===> " + keys); // fetched pools

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

    })

    console.log("Keys Owned =====> " + keysOwned);

    keysOwned.forEach(element => {

      let key = minerArray.find(o => o.name === element);
      //console.log("Key Found= " + key.rate);
      upliftiumPerHourKeys += parseInt(key.rate);
      //console.log("Upliftium per hour Keys = " + upliftiumPerHourKeys);

    });

    return upliftiumPerHourKeys;
  });





  // console.log(keysOwned.length);

  fetch(urlKeys).then(function (res) {
    return res.json()
  }).then(function (data) {

    let list = data.data[0].owner;
    data.data.forEach((element, i) => {
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

    // console.log(keysOwned);

    // console.log(keysOwned.length);

    keysOwned.forEach(element => {

      let key = minerArray.find(o => o.name === element);
      //console.log("Key Found= " + key.rate);
      upliftiumPerHourKeys += parseInt(key.rate);


    });
    console.log("Upliftium per hour Keys = " + upliftiumPerHourKeys);
    miningpower.keys = upliftiumPerHourKeys;
    return upliftiumPerHourKeys;


  });


}


async function fetchMiningPerHour() {

  const urlMiners = "https://wax.api.atomicassets.io/atomicmarket/v1/assets?collection_name=upliftworld&schema_name=miners&owner=modded.gm&page=1&limit=100&order=desc&sort=asset_id";

  let minersOwned = [];




  fetch(urlMiners).then(function (res) {
    return res.json()
  }).then(function (data) {
    //console.log(data.data);

    //let list = data.data[0].owner;
    //console.log("Miner Info === > " + list);
    data.data.forEach((element, i) => {
      //console.log("Miner Info === > " + element.data.name);
      minersOwned[i] = element.data.name;

    });

    console.log(minersOwned);
    //console.log(minersOwned.length);
    //console.log("Upliftium per hour Miners = " + upliftiumPerHourMiners);


    for (var i = 0, len = minersOwned.length; i < len; i++) {

      let obj = minerArray.find(o => o.name === minersOwned[i]);
      upliftiumPerHourMiners += parseInt(obj.rate);

    }

    /*
        minersOwned.forEach(element => {
          //console.log("SEARCH...");
          let obj = minerArray.find(o => o.name === element);
          upliftiumPerHourMiners += parseInt(obj.rate);
      
        });
      */

    console.log("Upliftium per hour Miners = " + upliftiumPerHourMiners);
    return upliftiumPerHourMiners;


  }).catch(function (error) {
    console.log(error);

  });

}