<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Database\Connection;
use App\Database\Models\UserModel;

echo UserModel::getAll();
echo "Hello World!";