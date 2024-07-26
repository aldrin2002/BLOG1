<?php
require_once "./modules/get.php";
require_once "./modules/post.php";
require_once "./config/database.php";

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// Serve image files with CORS headers (for guide lang sainyo kung gusto niyo lagyan ng images mga blogs ninyo, pwede niyo tanggalin)
if (isset($_GET['file_path']) && strpos($_GET['file_path'], 'uploaded_thumbnail/') === 0) {
    $filePath = $_GET['file_path'];
    $fullPath = __DIR__ . '/' . $filePath;

    if (file_exists($fullPath)) {
        header('Content-Type: ' . mime_content_type($fullPath));
        header('Content-Length: ' . filesize($fullPath));
        header('Access-Control-Allow-Origin: *');
        readfile($fullPath);
        exit;
    } else {
        echo json_encode(['status' => 'error', 'message' => 'File not found']);
        http_response_code(404);
        exit;
    }
}

$con = new Connection();
$pdo = $con->connect();

$get = new Get($pdo);
$post = new Post($pdo);

if (isset($_REQUEST['request'])) {
    $request = explode('/', $_REQUEST['request']);
} else {
    echo "Not Found";
    http_response_code(404);
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        switch ($request[0]) {
            case 'getPosts':
                if (isset($request[1]) && is_numeric($request[1])) {
                    $user_id = $request[1];
                    $data = ['user_id' => $user_id];
                    $response = $get->getPosts($data);
                    echo json_encode($response);
                } else {
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Valid user_id is required'
                    ]);
                    http_response_code(400);
                }
                break;

            default:
                echo "This is forbidden";
                http_response_code(403);
                break;
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch ($request[0]) {
            case 'register':
                $response = $post->register($data);
                echo json_encode($response);
                break;

            case 'login':
                $response = $post->login($data);
                echo json_encode($response);
                break;

            case 'addpost':
                $response = $post->addPost($data);
                echo json_encode($response);
                break;

            default:
                // Return a 403 response for unsupported requests   
                echo "This is forbidden";
                http_response_code(403);
                break;
        }
        break;

    default:
        // Return a 404 response for unsupported HTTP methods
        echo "Method not available";
        http_response_code(404);
        break;
}
