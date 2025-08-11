<?php
// Enable CORS for web requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Neon PostgreSQL connection string
$connectionString = 'postgresql://neondb_owner:npg_bY4MBRkzy0Fl@ep-orange-credit-a1y0knkr-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

try {
    // Parse the connection string
    $url = parse_url($connectionString);

    // Extract connection parameters
    $host = $url['host'];
    $port = $url['port'] ?? '5432';
    $dbname = ltrim($url['path'], '/');
    $user = $url['user'];
    $password = $url['pass'];

    // Extract endpoint from the host (first part before the first dot)
    $endpoint = explode('.', $host)[0];

    // Build PDO connection string with endpoint option
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require;options='--endpoint=$endpoint'";

    // Create PDO connection
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);

    // Create table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS info (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        pass VARCHAR(255) NOT NULL
    )");

} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $e->getMessage()
    ]));
}

// Get the action from POST or GET
$action = $_POST['action'] ?? $_GET['action'] ?? null;

// Action: Test DB connection
if ($action === 'test') {
    try {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM info");
        $row = $stmt->fetch();
        echo json_encode([
            "status" => "success",
            "message" => "Database connected successfully",
            "user_count" => $row['count']
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Database query failed: " . $e->getMessage()
        ]);
    }
    exit;
}

// Action: Login
if ($action === 'login') {
    $email = $_POST['email'] ?? null;
    $pass = $_POST['pass'] ?? null;

    if (!$email || !$pass) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Email and password are required."
        ]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT pass FROM info WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch();
            $hashedPassword = $row['pass'];

            if (password_verify($pass, $hashedPassword)) {
                echo json_encode([
                    "status" => "success",
                    "message" => "Login successful."
                ]);
            } else {
                http_response_code(401);
                echo json_encode([
                    "status" => "error",
                    "message" => "Invalid email or password."
                ]);
            }
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "User not found."
            ]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Database error: " . $e->getMessage()
        ]);
    }
    exit;
}

// Action: Insert (Register)
if ($action === 'insert') {
    $name = $_POST['name'] ?? null;
    $email = $_POST['email'] ?? null;
    $pass = $_POST['pass'] ?? null;

    if (!$name || !$email || !$pass) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "All fields (name, email, pass) are required."
        ]);
        exit;
    }

    try {
        // Check for duplicate email
        $checkStmt = $pdo->prepare("SELECT email FROM info WHERE email = ?");
        $checkStmt->execute([$email]);

        if ($checkStmt->rowCount() > 0) {
            http_response_code(409);
            echo json_encode([
                "status" => "error",
                "message" => "Email already exists."
            ]);
            exit;
        }

        // Insert new user
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);
        $insertStmt = $pdo->prepare("INSERT INTO info (name, email, pass) VALUES (?, ?, ?)");
        $insertStmt->execute([$name, $email, $hashedPass]);

        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "User registered successfully."
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Registration failed: " . $e->getMessage()
        ]);
    }
    exit;
}

// If action is missing or invalid
http_response_code(400);
echo json_encode([
    "status" => "error",
    "message" => "Invalid or missing action parameter. Use 'login', 'insert', or 'test'."
]);

// Close DB connection
$pdo = null;
?>