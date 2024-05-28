<html>
    <head>
        
<style>
  @page {
                margin: 0cm 0cm;
            }

            /** Define now the real margins of every page in the PDF **/
            body {
                margin-top: 2cm;
            
                margin-bottom: 2cm;
            }
            /* Center tables for demo */
table {
  margin: 0 auto;
  padding-bottom:3px;
  width:90%;
}

/* Default Table Style */
table {
  color: #333;
  background: white;
  border: 1px solid grey;
  border-collapse: collapse;
}


table td {
  border: 1px solid lightgrey;
}

            /** Define the header rules **/
            header {
                position: fixed;
                top: 0cm;
                left: 0cm;
                right: 0cm;
                height: 1.5cm;

                /** Extra personal styles **/
                background-color: #03a9f4;
                color: white;
                text-align: center;
                line-height: 1cm;
            }

            /** Define the footer rules **/
            footer {
                position: fixed; 
                bottom: 0cm; 
                left: 0cm; 
                right: 0cm;
                height: 2cm;

                /** Extra personal styles **/
                background-color: #03a9f4;
                color: white;
                text-align: center;
                line-height: 1.5cm;
            }
</style>
    </head>
    <body>
  
       <center><p style="color:red;font-size:20px"><?php if($moduleid == 1){ echo "Registration Portal Credential"; } elseif($moduleid == 2){ echo "Medical Portal Credentials"; }elseif($moduleid == 3){
			echo "Call Room Credentials"; }elseif($moduleid == 4){
			echo "On Field Credentials"; }elseif($moduleid == 5){
			echo "Podium Credentials"; }elseif($moduleid == 6){
			echo "Food Court Credentials"; }	else{
			echo "Complementary Credentials"; }		 		?></p></center>
    <table border="1">
        <tr style="width:100%">
            <td style="padding: 25px;"><img src="{{ asset('storage/data/credentialslist/qrcode') }}/{{$qrcode}}"></td>
            <td style="padding-left: 20px;padding-right: 30px;padding-bottom: 5px;width:100%;line-height:5px"><p><span style="font-weight:bolder">Username:</span> {{$username}}</p>
                <p><span style="font-weight:bolder">Password:</span> {{$password}}</p>
             
            </td>
            
        </tr>
    </table>
       
       
    </body>
</html>