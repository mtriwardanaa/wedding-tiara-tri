<?php

$data = base64_decode($_GET['data']);
$to = $_GET['to'];

file_put_contents('data.json', $data);

sleep(1);

$url = url();
$url = parse_url($url, PHP_URL_SCHEME) . '://' . parse_url($url, PHP_URL_HOST);
$base_url = trim($url, '/') . '?to=' . $to;
header("location: " . $base_url);
exit;

function url()
{
    return sprintf(
        "%s://%s%s",
        isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
        $_SERVER['SERVER_NAME'],
        $_SERVER['REQUEST_URI']
    );
}
