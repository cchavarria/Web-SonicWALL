<?php
    require 'widget.class.php';
    require 'Emogrifier.php';

    $widget = new Widget();

    if(isset($_GET['download'])) {
        $info = pathinfo($_GET['page']);

        header("Content-Type: text/html");
        header("Content-Transfer-Encoding: Ascii");
        header("Content-disposition: attachment; filename=\"{$info['basename']}\"");
    }

    echo $widget->content();
?>