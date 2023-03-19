<?php

$data = json_decode(file_get_contents('php://input'), true);

$todo = $data['todo'];
$doing = $data['doing'];
$done = $data['done'];
$repo = $data['repo'];


$file = fopen('data.json', 'w');
fwrite($file, json_encode([
  'todo' => $todo,
  'doing' => $doing,
  'done' => $done,
  'repo' => $repo
]));
fclose($file);

?>
