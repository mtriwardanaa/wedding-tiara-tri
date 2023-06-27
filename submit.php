<?php

$data = base64_decode($_GET['data']);
file_put_contents('data.json', $data);
echo 'success';
exit;
