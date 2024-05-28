<html>
<head>
<style>
html,body{
    height: 297mm;
    width: 210mm;
}
</style>
</head>
    <body>
     
        
        @foreach($players as $player)
		<?php
		$update = \App\Models\Players::where('eventid',$player->eventid)->where('uniqueid',$player->uniqueid)->update(['qrsts' => 1]);
		?>
		
		<center><img src="http://localhost/ering_angular/backend/storage/app/public/data/officialslist/qrcode/{{$player->qrcode}}" style="margin-top:10% !important;width:150mm;height:170mm"></center><br><p style="text-align:center;font-weight:bolder;font-size:80px;margin-top:6% !important;">{{$player->uniqueid}}</p>
		
	
        
        @endforeach
		<p style="margin-top10%">&nbsp;</p>
        <!-- <footer>
            Copyright &copy; <?php echo date("Y");?> 
        </footer> -->
    </body>
</html>