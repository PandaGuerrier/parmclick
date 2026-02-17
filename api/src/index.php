<?php

require_once __DIR__ . '/../vendor/autoload.php';
include_once __DIR__ . '/auth/auth.php';

use App\Database\Connection;
use App\Database\Models\UserModel;

header("Access-Control-Allow-Origin: http://127.0.0.1:8080");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$router = new \Bramus\Router\Router();

$router->get('/', function() {
    echo "Bienvenue sur l'API ParmClicker !";
    exit();
});

$router->get('/v1/health', function() {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok']);
});

$router->get('/users', function() { $users = UserModel::getAll(); header('Content-Type: application/json'); echo json_encode($users); });

$router->post('/register', function() {
    $db = Connection::get();
    $response = register($db);

    if ($response['success'] ?? false) {
        http_response_code(201);
    } else {
        http_response_code(400);
    }

    header('Content-Type: application/json');
    echo json_encode($response);
});

$router->post('/login', function() {
    $db = Connection::get();
    $response = login($db);

    if ($response['success'] ?? false) {
        http_response_code(201);
    } else {
        http_response_code(400);
    }

    header('Content-Type: application/json');
    echo json_encode($response);
});

$router->get('/data/get', function() {
    // todo: get data from db
});

$router->post('/data/post', function() {
    //todo: post user data in db
});
$router->run();