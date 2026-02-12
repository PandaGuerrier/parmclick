<?php

namespace App\Database;

use Medoo\Medoo;

class Connection {
    private static ?Medoo $instance = null;

    public static function get(): Medoo {
        if (self::$instance === null) {
            self::$instance = new Medoo([
                'type' => 'mysql',
                'host' => '127.0.0.1',
                'database' => 'parmclick',
                'username' => 'routy',
                'password' => 'routy',
                'charset' => 'utf8mb4',
                'port' => 3308,
                'error' => \PDO::ERRMODE_EXCEPTION
            ]);
        }
        return self::$instance;
    }
}