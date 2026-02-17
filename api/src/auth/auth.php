<?php
function console_log($data) {
    $output = json_encode($data);
    echo "<script>console.log($output);</script>";
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

            $database->insert("users", [
                "uuid" => uniqid(),
                "name" => $name,
                "email" => $email,
                "password" => $hashedPassword,
                "created_at" => date("Y-m-d H:i:s")
            ]);
            header("Location:http://localhost:8080/auth/login.php");
            return ["success" => true];
        }
    }
    return $errors;
}

function login($database)
{
    $errors = [];
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $userUuid = $database->get("users", "uuid", ["email" => $email]);

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    session_start();
    $_SESSION['user'] = $userUuid;

    if (isset($_SESSION['use']))
    {
        header("Location:index.html"); // todo: add path
    }

    $user = $database->get("users", "*", ["email" => $email]);

    if ($user && password_verify($password, $user['password']))
    {
        echo "success";
        header("Location:http://localhost:8080/");
    }

    return $errors;

}
