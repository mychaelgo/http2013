<?php
	$tweets = json_decode(file_get_contents('https://twitter.com/statuses/user_timeline.json?screen_name=HTTP_2013&count=10'));

var_dump($tweets);
?>