<!DOCTYPE html>
<html>
<head>
    <title>ERing</title>
    <style>
        #user , #company, #store, #branch {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 80%;
}

#user td, #user th, #company td, #company th, #store td, #store th, #branch td, #branch th{
  border: 1px solid #ddd;
  padding: 8px;
}



#user th , #company th, #store th, #branch th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  color: white;
}
</style>
</head>
<body>

<center><img src="https://console.ering.in/backend/public/assets/images/LogoLight.png" alt="https://console.ering.in/backend/public/assets/images/LogoLight.png" class="" style="height: 48px;"></center>

                    <p>Hi {{ $details['name'] }} ,</p>

    <p style="margin-left:10%;">Your Registration has been successful. You will receive credentials after Admin's Approval </p>
    <p>Thank you</p>

    <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <a href="https://ering.in" target="_blank" style="font-weight: bold;">ERing</a> © <?php echo date('Y'); ?>. All Rights Reserved                       
                    </div>
                </div>
            </div>
        </footer>
</body>
</html>
