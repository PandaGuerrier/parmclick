<?php


function register($database): array
{
    $errors = [];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // si c'est post alors on récup les infos
        $name = trim($_POST['username'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirmPassword'] ?? '';

        if (empty($name)) {
            $errors['username'] = "Le nom d'utilisateur est requis.";
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = "L'adresse email n'est pas valide.";
        }

        if (empty($password) || strlen($password) < 8) {
            $errors['password'] = "Le mot de passe doit faire au moins 8 caractères.";
        }

        if ($password !== $confirmPassword) {
            $errors['confirmPassword'] = "Les mots de passe ne correspondent pas.";
        }

        if (empty($errors)) {
            $userExists = $database->has("users", [
                "OR" => [
                    "name" => $name,
                    "email" => $email
                ]
            ]);

            if ($userExists) {
                $errors['global'] = "Ce nom d'utilisateur ou cet email est déjà utilisé.";
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                $database->insert("users", [
                    "name" => $name,
                    "email" => $email,
                    "password" => $hashedPassword,
                    "created_at" => date("Y-m-d H:i:s")
                ]);
                header("Location: /login?success=1");
                exit;
            }
        }
    }
    return $errors;
}

function login() {}
