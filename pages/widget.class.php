<?php

class Widget {
    private $css, $js, $html, $content;

    function __construct() {
        $this->css = array();
        $this->js = array();
        $this->content = array();

        $this->html = file_get_contents($_GET['page']);

        $this->parseSubWidget();

        $info = pathinfo($_GET['page']);

        $this->loadDependencies($info['dirname']);
    }

    function parseSubWidget() {
        $hasVars = false;

        if(preg_match_all("/\[\[widget:(.+)\]\]/", $this->html, $m)) {
            $hasVars = true;

            foreach($m[1] as $indx => $widgetName) {
                $this->html = str_replace($m[0][$indx], file_get_contents('../widgets/' . $widgetName . '/index.htm'), $this->html);
                $this->loadDependencies($widgetName);
            }
        }

        /*if(preg_match_all("/\[\[content:(.+)\]\](.+?)\[\[\/content\]\]/", $this->html, $m)) {
            $hasVars = true;
            print_r($m);
        }*/

        if($hasVars) {
            $this->parseSubWidget();
        }
    }

    function loadDependencies($widgetName) {
        if(file_exists('../widgets/' . $widgetName . '/config.json')) {
            $tmpJSON = json_decode(file_get_contents('../widgets/' . $widgetName . '/config.json'), true);

            if(isset($tmpJSON['css'])) {
                $this->css = array_merge($tmpJSON['css'], $this->css);
            }

            if(isset($tmpJSON['js'])) {
                $this->js = array_merge($tmpJSON['js'], $this->js);
            }
        }

        if(file_exists('../widgets/' . $widgetName . '/index.css')) {
            $this->css[] = '../../widgets/' . $widgetName . '/index.css';
        }

        if(file_exists('../widgets/' . $widgetName . '/index.js')) {
            $this->js[] = '../../widgets/' . $widgetName . '/index.js';
        }
    }

    function css() {
        $html = array();

        foreach($this->css as $href) {
            $html[] = '<link rel="stylesheet" href="' . $href . '">';
        }

        return implode("\n", $html);
    }

    function js() {
        $html = array();

        foreach($this->js as $src) {
            $html[] = '<script src="' . $src . '"></script>';
        }

        return implode("\n", $html);
    }

    function content() {
        return $this->html;
    }
}