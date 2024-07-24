<?php

class Post {
    protected $gm;

    public function __construct(\PDO $pdo) {
        $this->gm = new GlobalMethods($pdo);
    }

    public function addPost($data) {
        try {
            // Validate required fields
            if (!isset($data->user_id) || !isset($data->title) || !isset($data->content) || !isset($data->status)) {
                throw new Exception("Missing required parameters.");
            }

            // Prepare data for database insertion
            $insertData = [
                'user_id' => $data->user_id,
                'title' => $data->title,
                'content' => $data->content,
                'status' => $data->status,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];

            // Insert into database using GlobalMethods insert method
            $insertResult = $this->gm->insert('posts', $insertData);

            // Check insertion result
            if ($insertResult['code'] !== 200) {
                throw new Exception("Error inserting data into database: " . $insertResult['errmsg']);
            }

            return ["code" => 200, "message" => "Post added successfully."];
        } catch (Exception $e) {
            return ["code" => 500, "message" => $e->getMessage()];
        }
    }
}
?>
