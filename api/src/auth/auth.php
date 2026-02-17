<?php


function register($database): array
{
    $errors = [];
    $name = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';

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
        $userExists = $database->has("users", [
            "OR" => [
                "name" => $name,
                "email" => $email
            ]
        ]);

        if ($userExists) {
            $errors['global'] = "This username or email is already taken.";
            return $errors;
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $database->insert("users", [
                "uuid" => uniqid(),
                "name" => $name,
                "email" => $email,
                "password" => $hashedPassword,
                "created_at" => date("Y-m-d H:i:s")
            ]);

            return ["success" => true];
        }
    }
    return $errors;
}

function login() {}
