<?php

$data = base64_decode($_GET['data']);
$to = $_GET['to'];

file_put_contents('data.json', $data);

header("location: https://undangan.stagingpro.xyz/?to=" . $to);
exit;
