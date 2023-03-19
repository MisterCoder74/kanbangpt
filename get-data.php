<?php

$file = fopen('data.json', 'r');
$data = fread($file, filesize('data.json'));
fclose($file);

echo $data;

?>