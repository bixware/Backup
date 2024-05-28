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
    <header>
            T RING
    </header>

        
        @foreach($players as $player)
    <table border="1">
        <tr style="width:100%">
            <td style="padding: 25px;"><img src="http://localhost/ering_angular/backend/storage/app/public/data/playerslist/qrcode/{{$player->qrcode}}"><br><p style="text-align:center;font-weight:bolder">{{$player->uniqueid}}</p></td>
            <td style="padding-left: 20px;padding-right: 30px;padding-bottom: 5px;width:100%;line-height:5px"><p style="text-align:center;font-size:20px;font-weight:bolder;margin-top:-20px">{{$player->name}} - {{$player->location}}</p><p><span style="font-weight:bolder">Name:</span> {{$player->fname}} {{$player->lname}}</p>
                <p><span style="font-weight:bolder">Gender:</span> {{$player->gender}}</p>
                <p><span style="font-weight:bolder">DOB:</span> {{date("d-m-Y",strtotime($player->dob))}}</p>
                <p><span style="font-weight:bolder">Email ID:</span> {{$player->email}}</p>
                <p><span style="font-weight:bolder">Mobile Number:</span> {{$player->mobile}}</p>
                <!-- <p style="text-align:center;font-size:14px;font-weight:bolder;margin-bottom:-20px">Event Date: {{date("d-m-Y",strtotime($player->startdate))}} - {{date("d-m-Y",strtotime($player->enddate))}}</p> -->
            </td>
            <td style="padding: 25px;"><img src="http://localhost/ering_angular/backend/storage/app/public/data/eventlogo/{{$player->logo}}" style="width:100px;height:100px"></td>
        </tr>
    </table>
        @endforeach
        <!-- <footer>
            Copyright &copy; <?php echo date("Y");?> 
        </footer> -->
    </body>
</html>