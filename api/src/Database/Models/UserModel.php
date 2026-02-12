<?php

namespace App\Database\Models;

use App\Database\Connection;


class UserModel {
    public $uuid;
    public $name;
    public $email;
    public $password;

    function create() {

    }

    function destroy() {

    }

    function save() {

    }

    static function getAll() {
    $db = Connection::get();

      return $db->select('users', '*');
     }


    static function get($uuid) {

    }
}