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
     
        <?php
		$userlist = explode(",",$userid);
		foreach($userlist as $userlists){
			$player = \App\Models\Players::join('events','players.eventid','=','events.id')
                ->where('players.eventid',$eventid)
                ->where('players.uniqueid',$userlists)
                ->first();
				$update = \App\Models\Players::where('eventid',$eventid)->where('uniqueid',$userlists)->update(['qrsts' => 1]);
		?>
        
		
		<center><img src="http://localhost/ering_angular/backend/storage/app/public/data/playerslist/qrcode/{{$player->qrcode}}" style="margin-top:10% !important;width:150mm;height:150mm"></center><br><p style="text-align:center;font-weight:bolder;font-size:50px;margin-top:6% !important;">{{$player->uniqueid}}</p>
		<br><p style="text-align:center;font-weight:bolder;font-size:50px;margin-top:-6% !important;">{{$player->bibno}}</p><br>
        
        
		<p style="margin-top10%">&nbsp;</p>
       <?php
		}
		?>
    </body>
</html>