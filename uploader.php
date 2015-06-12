<?php
	$target_path = "uploads/";

	$target_path = $target_path . $_FILES['insertImage']['name']; 

	if($_FILES['insertImage']['error'] > 0) {
	  echo "There was an error uploading the file, please try again!";		
	} else {
	  echo "Upload: " . $_FILES["insertImage"]["name"] . "<br />";
	  echo "Type: " . $_FILES["insertImage"]["type"] . "<br />";
	  echo "Size: " . ($_FILES["insertImage"]["size"] / 1024) . " Kb<br />";
	  echo "Temp file: " . $_FILES["insertImage"]["tmp_name"] . "<br />";

	  if (file_exists($target_path . $_FILES["insertImage"]["name"])) {
	  	echo $_FILES["insertImage"]["name"] . " already exists!";
	  } else {
	  	move_uploaded_file($_FILES["insertImage"]["tmp_name"],
	  		$target_path);
	  	echo "Stored in: " . $target_path;
	  }
	  
	}
?>
<html>
	<body>
		<script type="text/javascript" src="js/uploader.js"></script>
		<br />
		<input id="afterUpload" type="button" value="Done! Return to typing" />
	</body>
</html>
