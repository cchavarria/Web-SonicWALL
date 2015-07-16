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
        
        $this->loadDependencies($info['dirname'], $info['filename'] ? $info['filename']:'index');
    }

    function parseSubWidget() {
        $hasVars = false;

        if(preg_match_all("/\[\[widget:(.+)\]\]/", $this->html, $m)) {
            $hasVars = true;

            foreach($m[1] as $indx => $widgetName) {
                $arr = explode('/', $widgetName);
                $filename = 'index';

                if(count($arr) == 2) {
                    $filename = $arr[1];
                }

                $widgetName = $arr[0];

                $this->html = str_replace($m[0][$indx], file_get_contents($widgetName . '/' . $filename . '.htm'), $this->html);
                $this->loadDependencies($widgetName, $filename);
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

    function loadDependencies($widgetName, $filename) {
        if(file_exists($widgetName . '/config.json')) {
            $tmpJSON = json_decode(file_get_contents($widgetName . '/config.json'), true);

            if(isset($tmpJSON['css'])) {
                $this->css = array_merge($tmpJSON['css'], $this->css);
            }

            if(isset($tmpJSON['js'])) {
                $this->js = array_merge($tmpJSON['js'], $this->js);
            }
        }

        if(file_exists($widgetName . '/' . $filename . '.css')) {
            $this->css[] = '../' . $widgetName . '/' . $filename . '.css';
        }

        if(file_exists($widgetName . '/' . $filename . '.js')) {
            $this->js[] = '../' . $widgetName . '/' . $filename . '.js';
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