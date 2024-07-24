<?php 
	require_once("./config/Config.php");

	$db = new Connection();
	$pdo = $db->connect();
	$gm = new GlobalMethods($pdo);
	$post = new Post($pdo);
	$get = new Get($pdo);
	$auth = new Auth($pdo);

	if (isset($_REQUEST['request'])) {
		$req = explode('/', rtrim($_REQUEST['request'], '/'));
	} else {
		$req = array("errorcatcher");
	}

	switch($_SERVER['REQUEST_METHOD']) {
		case 'POST':
			switch($req[0]) {
				case 'register':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->register($d), JSON_PRETTY_PRINT);
				break;
				case 'login':
					$d = json_decode(base64_decode(file_get_contents("php://input")));
					echo json_encode($auth->login($d), JSON_PRETTY_PRINT);
				break;

				case 'post':
                   $d = json_decode(base64_decode(file_get_contents("php://input")));
               echo json_encode($post->addPost($d), JSON_PRETTY_PRINT); 
                break;

	
			}
		break;

		case 'GET':
		
switch ($req[0]) {
    case 'getImages':
        echo json_encode($get->getImages(), JSON_PRETTY_PRINT);
        break;
    case 'getComments':
        echo json_encode($get->getComments(), JSON_PRETTY_PRINT);
        break;
    case 'getPosts':
        echo json_encode($get->getPosts(), JSON_PRETTY_PRINT);
        break;
    default:
        echo json_encode(['error' => 'Invalid request']);
}
	}
?>
