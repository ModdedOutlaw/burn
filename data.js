  const url = "https://tools.uplift.art:3033/v1/world/info/pools";

  const outputInfo= document.querySelector('.outputInfo');
  
  //outputInfo.innerHTML = "";


  fetch(url).then(function (res) {
    return res.json()
  }).then(function (data) {
    //console.log(data.data);

    let list = data;
    console.log(list);

  }).catch(function (error) {
    console.log(error);

  })

