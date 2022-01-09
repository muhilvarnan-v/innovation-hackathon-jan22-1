header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Access-Control-Allow-Origin");
       
    // Folder Path For Ubuntu
    // $folderPath = "/var/www/upload-react/";
    // Folder Path For Window
    $folderPath = "upload-react/";
   
    $file_tmp = $_FILES['file']['tmp_name'];
    $file_ext = strtolower(end(explode('.',$_FILES['file']['name'])));
    $file = $folderPath . uniqid() . '.'.$file_ext;
    move_uploaded_file($file_tmp, $file);
   
   return json_encode(['status'=>true]);
?>