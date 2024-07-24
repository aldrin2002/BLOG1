<?php

class Get {
    protected $gm, $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

    public function getImages() {
        $sql = "SELECT * FROM images ORDER BY uploaded_at DESC"; // Adjust query as needed
        $res = $this->gm->generalQuery($sql, "No images found.");
        if ($res['code'] == 200) {
            return $res['data']; // Return the fetched images data
        } else {
            return []; // Return an empty array if no images found or error occurred
        }
    }

    public function getComments() {
        $sql = "SELECT * FROM comments ORDER BY created_at DESC"; // Adjust query as needed
        $res = $this->gm->generalQuery($sql, "No comments found.");
        if ($res['code'] == 200) {
            return $res['data']; // Return the fetched comments data
        } else {
            return []; // Return an empty array if no comments found or error occurred
        }
    }

    public function getPosts() {
        $sql = "SELECT * FROM posts ORDER BY created_at DESC"; // Adjust query as needed
        $res = $this->gm->generalQuery($sql, "No posts found.");
        if ($res['code'] == 200) {
            return $res['data']; // Return the fetched posts data
        } else {
            return []; // Return an empty array if no posts found or error occurred
        }
    }
}

?>
