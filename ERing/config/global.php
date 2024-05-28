<?php
   
return [
  
    'player_upload' => storage_path('app/public/data/playerslist/'),
    'chieflist_upload' => storage_path('app/public/data/chieflist/'),
    'officials_upload' => storage_path('app/public/data/officialslist/'),
    'events_upload' => storage_path('app/public/data/eventslist/'),

    'player_qr' => storage_path('app\public\data\playerslist\qrcode').'\\',
    'chieflist_qr' => storage_path('app\public\data\chieflist\qrcode').'\\',
    'officialslist_qr' => storage_path('app\public\data\officialslist\qrcode').'\\',

    'size' => 100,
    'user_type' => ['User', 'Admin'],
]
  
?>