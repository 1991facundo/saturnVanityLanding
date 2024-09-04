<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $name = isset($_POST['name']) ? $_POST['name'] : 'No recibido';
    $company = isset($_POST['company']) ? $_POST['company'] : 'No recibido';
    $email = isset($_POST['email']) ? $_POST['email'] : 'No recibido';
    $message = isset($_POST['message']) ? $_POST['message'] : 'No recibido';

    // Construir el cuerpo del correo
    $to = 'info@saturnvanity.com';  
    $subject = 'Nuevo mensaje de contacto';
    $body = "Has recibido un nuevo mensaje de contacto.\n\n";
    $body .= "Nombre: " . $name . "\n";
    $body .= "Empresa: " . $company . "\n";
    $body .= "Correo Electrónico: " . $email . "\n";
    $body .= "Mensaje:\n" . $message . "\n";

    // Encabezados del correo
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Correo enviado correctamente.";
    } else {
        echo "Error al enviar el correo.";
    }
}
?>
