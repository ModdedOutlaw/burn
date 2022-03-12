  const url = "pools.json";

  const outputInfo= document.querySelector('.outputInfo');
  
const miners = {
  name:"",
  rate:0
};

let minerArray = [];

  fetch(url).then(function (res) {
    return res.json()
  }).then(function (data) {
    //console.log(data.data);

    let list = data;
    console.log(list);
    list.data.payload.forEach((element, index) =>{
      console.log(element.label);
      console.log(element.size_per_tick_per_asset);
      const miner = Object.create(miners);
      miner.name = element.label;
      miner.rate = element.size_per_tick_per_asset
      minerArray[index] = miner;
    });

    console.log(minerArray);

  }).catch(function (error) {
    console.log(error);

  });

