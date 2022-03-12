<?php

$api_url = 'https://tools.uplift.art:3033/v1/world/info/pools';
$json_data = file_get_contents($api_url);
$response_data = json_decode($json_data);
$json = json_encode(array('data' => $response_data));

//write json to file
if (file_put_contents("pools.json", $json, JSON_PRETTY_PRINT))
  echo "Pool informations recieved...<br>";
else
  echo "Oops! Error creating json file...";

?>
<!doctype html>
<html lang="en-US">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="css/salesInfoStyle.css" rel="stylesheet" type="text/css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@200&display=swap" rel="stylesheet">
  <title>Upliftium Information</title>

</head>

<body onload="getMiningRate()">

  <header>
    
  
  </header>
  <!-- Main Container -->
  <div class="salesInfo">



    <div class="outputInfo">


    </div>
    <div class="miningPower">


    </div>
    <!-- Copyrights Section -->
    <div class="copyright">&copy;2022- <strong>ModdedOutlaw</strong></div>
  </div>

  <!-- Main Container Ends -->

  <script src="miningRate.js"></script>

</body>

</html>