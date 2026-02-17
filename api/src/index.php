<?php

require_once __DIR__ . '/../vendor/autoload.php';
include_once __DIR__ . '/auth/auth.php';

use App\Database\Connection;
use App\Database\Models\UserModel;


$router = new \Bramus\Router\Router();

$router->get('/', function() {
    echo "Bienvenue sur l'API ParmClicker !";
});

$router->get('/users', function() { $users = UserModel::getAll(); header('Content-Type: application/json'); echo json_encode($users); });

$router->post('/register', function() {
    $db = Connection::get();
    echo json_encode(register($db));
});

$router->post('/login', function() {
    $db = Connection::get();
    echo json_encode(login($db));
});


$router->run();