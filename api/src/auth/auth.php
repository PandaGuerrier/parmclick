<?php

function RandomString()
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randstring = '';
    for ($i = 0; $i < 64; $i++) {
        $randstring .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randstring;
}

function register($database): array
{
    $errors = [];
    $data = json_decode(file_get_contents('php://input'), true) ?? [];
    $name = trim($data['username'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    $confirmPassword = $data['confirmPassword'] ?? '';

    if (empty($name)) {
        $errors['username'] = "Username is required.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format.";
    }

    if (empty($password) || strlen($password) < 8) {
        $errors['password'] = "Password must be at least 8 characters long.";
    }

    if ($password !== $confirmPassword) {
        $errors['confirmPassword'] = "Password confirmation does not match.";
    }

    if (empty($errors)) {
        $usernameExists = $database->has("users", ["name" => $name]);
        $emailExists = $database->has("users", ["email" => $email]);

        if ($usernameExists) {
            $errors['global'] = "This username is already taken.";
            return $errors;
        }
        else if ($emailExists) {
            $errors['global'] = "This email is already taken.";
            return $errors;
        }
        else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $token = RandomString();

            $database->insert("users", [
                "uuid" => uniqid(),
                "name" => $name,
                "email" => $email,
                "password" => $hashedPassword,
                "created_at" => date("Y-m-d H:i:s"),
                "token" => $token,
                "data" => "{}"
            ]);
            header("Location:http://localhost:8080/auth/login.php");
            return ["success" => true, "token" => $token];
        }
    }
    return $errors;
}

function login($database): array
{
    $errors = [];
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $user = $database->get("users", "*", ["email" => $email]);
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    session_start();
    $_SESSION['user'] = $user['uuid'];

    if ($user && password_verify($password, $user['password']))
    {
        return ["success" => true, "token" => $user['token']];
    }

    return $errors;

}
