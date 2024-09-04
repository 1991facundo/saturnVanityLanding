<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $company = isset($_POST['company']) ? $_POST['company'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Validar que el nombre no tenga números
    if (preg_match('/\d/', $name)) {
        echo "El nombre no puede contener números.";
        exit;
    }

    // Validar que el correo tenga al menos un "@".
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !strpos($email, '@')) {
        echo "Correo electrónico no válido.";
        exit;
    }

    // Validación superada, construir el cuerpo del correo
    $to = 'info@saturnvanity.com';
    $subject = 'Nuevo mensaje de contacto';
    $body = "Has recibido un nuevo mensaje de contacto.\n\n";
    $body .= "Nombre: " . $name . "\n";
    $body .= "Empresa: " . $company . "\n";
    $body .= "Correo Electrónico: " . $email . "\n";
    $body .= "Mensaje:\n" . $message . "\n";

    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Correo enviado correctamente."; // Solo este mensaje
    } else {
        echo "Error al enviar el correo.";
    }
}
?>
