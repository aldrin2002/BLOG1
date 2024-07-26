<?php

require_once "global.php";

class Post extends GlobalMethods
{
    private $pdo;

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function register($data)
    {
        if (empty($data->name) || empty($data->email) || empty($data->password)) {
            return ['status' => 'error', 'message' => 'Name, email, and password are required.'];
        }

        $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users_tbl (name, email, password) VALUES (:name, :email, :password)";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':password', $hashedPassword);

        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'User registered successfully.'];
        } else {
            return ['status' => 'error', 'message' => 'Failed to register user.'];
        }
    }


    public function login($data)
    {
        $sql = "SELECT * FROM users_tbl WHERE email = :email";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':email', $data->email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($data->password, $user['password'])) {
            return ['status' => 'success', 'message' => 'Login successful.', 'user' => $user];
        } else {
            return ['status' => 'error', 'message' => 'Invalid email or password.'];
        }
    }

    public function addPost($data)
    {
        if (empty($data->title) || empty($data->content) || empty($data->status) || empty($data->user_id)) {
            return ['status' => 'error', 'message' => 'Title, content, status, and user ID are required.'];
        }

        // Naka get ang post based on user_id
        $sql = "SELECT name FROM users_tbl WHERE user_id = :user_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':user_id', $data->user_id);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            return ['status' => 'error', 'message' => 'Invalid user ID.'];
        }

        $created_by = $user['name'];
        $created_at = date('Y-m-d H:i:s');
        $updated_at = $created_at;

        $sql = "INSERT INTO posts (title, content, status, created_at, updated_at, created_by, user_id, filepath) 
                VALUES (:title, :content, :status, :created_at, :updated_at, :created_by, :user_id, :filepath)";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':title', $data->title);
        $stmt->bindParam(':content', $data->content);
        $stmt->bindParam(':status', $data->status);
        $stmt->bindParam(':created_at', $created_at);
        $stmt->bindParam(':updated_at', $updated_at);
        $stmt->bindParam(':created_by', $created_by);
        $stmt->bindParam(':user_id', $data->user_id);
        $stmt->bindParam(':filepath', $data->filepath);

        if ($stmt->execute()) {
            return ['status' => 'success', 'message' => 'Post added successfully.'];
        } else {
            return ['status' => 'error', 'message' => 'Failed to add post.'];
        }
    }

}
