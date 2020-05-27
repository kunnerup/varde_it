<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$emne = $_POST['emne'];
$formcontent="From: $name \n Phone: $phone \n Message: $message";
$recipient = "kontakt@anderskunnerup.dk";
$subject = $emne;
$mailheader = "From: $email \r\n";

mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo '<script type="text/javascript">alert("Tak. Din besked er sendt!");window.history.go(-1);</script>';
?>
