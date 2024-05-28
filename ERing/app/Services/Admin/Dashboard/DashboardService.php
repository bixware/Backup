<?php

declare(strict_types=1);

namespace App\Services\Admin\Dashboard;

use App\Models\MMenu;
class DashboardService
{
    public  function getMenu($id)
	{
         return MMenu::getMenu($id);
	}
}
