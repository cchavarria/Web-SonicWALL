<?php

class Widget {
    private $css, $js, $html, $content;

    function __construct() {
        $this->html = file_get_contents($_GET['page']);

        if(preg_match_all('/\<link(.*?)href="(.*?)"\>/', $this->html, $m)) {
            foreach($m[2] as $link) {
                str_replace('</head>', "<style>\n" . file_get_contents($link) . "\n</style>", $this->html);
            }
        }
    }

    function content() {
        return $this->html;
    }
}