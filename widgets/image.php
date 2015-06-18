<?php

$w = isset($_GET['w']) ? intval($_GET['w']):1;
$h = isset($_GET['h']) ? intval($_GET['h']):1;
$c = isset($_GET['c']) ? hex2rgb($_GET['c']):false;
$text = isset($_GET['t']) ? $_GET['t']:'Sample Image';

$img = imagecreatetruecolor($w, $h);

if($c !== false) {
    $color = imagecolorallocate($img, $c[0], $c[1], $c[2]);
}
else {
    $color = imagecolorallocate($img, 255, 255, 255);
}

imagefill($img, 0, 0, $color);

$font_size = 16;
$font_file = '../fonts/museosansfordell-300-webfont.ttf';

$text_prop = imagettfbbox($font_size, 0, $font_file, $text);

imagettftext($img, $font_size, 0, $w/2-(($text_prop[2]-$text_prop[0])/2), $h/2-(($text_prop[6]-$text_prop[1])/2), $black, $font_file, $text);

header('Content-Type: image/png');
imagepng($img);
imagedestroy($img);

function hex2rgb($hex) {
    $hex = str_replace("#", "", $hex);

    if(strlen($hex) == 3) {
        $r = hexdec(substr($hex,0,1).substr($hex,0,1));
        $g = hexdec(substr($hex,1,1).substr($hex,1,1));
        $b = hexdec(substr($hex,2,1).substr($hex,2,1));
    } else {
        $r = hexdec(substr($hex,0,2));
        $g = hexdec(substr($hex,2,2));
        $b = hexdec(substr($hex,4,2));
    }
    $rgb = array($r, $g, $b);
    //return implode(",", $rgb); // returns the rgb values separated by commas
    return $rgb; // returns an array with the rgb values
}