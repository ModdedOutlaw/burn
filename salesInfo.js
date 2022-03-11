  const urlSalesInfo = "https://api.waxsweden.org:443/v2/state/get_account?account=d.2b4.wam";

  const outputSalesInfo = document.querySelector('.salesInfo');
  
  outputSalesInfo.innerHTML = "";


  fetch(urlSalesInfo).then(function (res) {
    return res.json()
  }).then(function (data) {
    //console.log(data.data);

    let list = data;

    list.actions.forEach(element => {
      let memo = element.act.data.memo;
      if( element.act.data.memo != null){
      if (memo.includes("Location")){
        console.log(element.act);
        console.log(element.act.data.memo);
        if(element.act.data.amount >= 0.01){
          outputSalesInfo.innerHTML += '<br><h2>' + element.act.data.memo + '</h2><br>';

        }else{
        outputSalesInfo.innerHTML += '<br>' + element.act.data.memo + '<br>';
        }
      }
    }
    });

  }).catch(function (error) {
    console.log(error);

  })

