<?php

header('Content-Type: application/json; charset=utf-8');

if($_POST['type'] == 'video list') {
	$url = 'http://software.dell.com/jsonrequest/videolistgetdefault';
	$map = array(
		'prod' => 'prod',
		'sol' => 'sol',
		'plat' => 'plat',
		'brand' => 'brand',
		'typeID' => 'videotypes',
		'pg' => 'page'
	);
}
else if($_POST['type'] == 'video product') {
	$url = 'http://software.dell.com/jsonrequest/videoproductlistget/';
	$map = array(
		'brand' => 'brand'
	);
}
else if($_POST['type'] == 'video solution') {
	$url = 'http://software.dell.com/jsonrequest/videosolutionlistget/';
	$map = array(
		'brand' => 'brand'
	);
}
else if($_POST['type'] == 'video product line') {
	$url = 'http://software.dell.com/jsonrequest/videobrandlistget';
	$map = array(
		'brand' => 'brand'
	);
}

$newJSON = new stdClass;

$newJSON->data = array();
$newJSON->title = '';
$newJSON->Errors = array();

if(isset($url) && isset($map)) {
	foreach($map as $key => $value) {
		if($key == 'typeID') {
			$value = explode(',', $_POST['value']);

			$fields_string .= $key . '=' . $value[0] . '&';
		}
		else {
			$fields_string .= $key . '=' . $_POST[$value] . '&';
		}
	}

	rtrim($fields_string, '&');

//open connection
	$ch = curl_init();

//set the url, number of POST vars, POST data
	curl_setopt($ch, CURLOPT_URL, $url . '?' . $fields_string);
//curl_setopt($ch, CURLOPT_POST, count($_POST));
//curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);

//execute post
	ob_start();
	curl_exec($ch);
	$result = ob_get_clean();

//close connection
	curl_close($ch);

	$json = json_decode($result);

	if(in_array($_POST['type'], array('video solution', 'video product line', 'video product'))) {
		foreach($json->data as $n => $v) {
			if(empty($v->ID)) {
				$newJSON->title = $v->DisplayName;
			}
			else if(in_array($_POST['type'], array('video solution'))) {
				$newJSON->data[] = array(
					'id' => $v->ID,
					'value' => $v->DisplayName,
					'englishvalue' => $v->DisplayName
				);
			}
			else {
				$newJSON->data[] = array(
					'id' => $v->ID,
					'value' => $v->DisplayName
				);
			}
		}

		echo json_encode($newJSON);
	}
	else {
		echo $result;
	}
}
else if($_POST['type'] == 'video type') {
	$newJSON->title = 'Type';

	$newJSON->data[] = array(
		'id' => 220,
		'value' => 'Solution',
		'englishvalue' => 'Solution'
	);

	$newJSON->data[] = array(
		'id' => 212,
		'value' => 'Case Studies',
		'englishvalue' => 'Case Studies'
	);

	$newJSON->data[] = array(
		'id' => 211,
		'value' => 'Events',
		'englishvalue' => 'Events'
	);

	echo json_encode($newJSON);
}

