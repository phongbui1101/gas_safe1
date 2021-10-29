<!DOCTYPE html>
<html lang="vn">

<head>
	<title>Gas Safe</title>
	<!-- Meta tag Keywords -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="UTF-8" />
	<meta name="keywords" content="Bootstrap Web Templates"/>
	
	<script src="./js/jquery-3.3.1.min.js"></script>
	<!-- //jquery -->	
	<script src="./bootstrap-5.0.2-dist/js/bootstrap.min.js"></script>
	<!-- Bootstrap js -->
	<link href="./bootstrap-5.0.2-dist/css/bootstrap.min.css" rel="stylesheet"/>
	<!-- Bootstrap css -->
	<link href="./css/style.css" rel="stylesheet" type="text/css" media="all" />
	<!-- Main css -->
	<link rel="stylesheet" type="text/css" href="./fontawesome-free-5.15.4/css/all.css">
	<!-- Font-Awesome-Icons-CSS -->
	<script src="./js/script.js"></script>
	<!-- script -->

	<!-- web fonts -->
	<link href="//fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&amp;subset=latin-ext" rel="stylesheet">
	<link href="//fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese"
	    rel="stylesheet">
	<!-- //web fonts -->
	<link type='image/x-icon' href='./images/logo.jpg' rel='shortcut icon'/>
	<!-- favicon -->
	
</head>

<body>
	<?php

	if(isset($_GET['manage'])){
		$tam = $_GET['manage'];
	}else{
		$tam = '';
	}

	if($tam=='danhmuc'){
		include('include/danhmuc.php');
	}elseif ($tam=='timkiem') {
		include('include/timkiem.php');
	}else{
		include('include/home.php'); 
	}
	?>
</body>
</html>