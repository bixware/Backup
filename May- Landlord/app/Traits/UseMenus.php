<?php

namespace App\Traits;

use App\Models\Menu;
use App\Models\UserMenu;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

trait UseMenus
{


    /**
     * Getting the menus
     * @return \App\Models\UserMenu
     */
    public function menuBuilder(): Builder
    {
        return UserMenu::orderBy('menuOrder', 'asc')
            ->where('isActive', 1)
            ->where('menuOrder', '!=', '0')
            ->where('roleUID', auth()->user()->roleUID);
    }

    /**
     * Users menus
     * @return \Illuminate\Database\Eloquent\Collection|array<Builder>
     */
    public function userMenus()
    {
        return $this->menuBuilder()
            ->get(['menuUID', 'menuOrder']);
    }



    /**
     * Getting the menus from the database
     * Will be cache once fetched
     * @return mixed
     */
    // #[Computed(persist: true, seconds: 3600, cache: true)]
    public function _menus()
    {
        // caching the data
        return Cache::remember('menus' . auth()->user()->userUID, 20000, function () {
            // Main data
            return $this->userMenus()->map(function ($menu) {

                return collect([
                    'menu' => Menu::where('isActive', 1)
                        ->where('menuUID', $menu->menuUID)
                        // ->where('userUID', auth()->user()->userUID)
                        ->first(['menuName', 'menuURL', 'menuTitle', 'menuIcon', 'parentMenu']),

                    'subMenus' => Menu::where('isActive', 1)
                        ->where('parentMenu', $menu->menuUID)
                        // ->where('userUID', auth()->user()->userUID)
                        ->get(['menuName', 'menuURL', 'menuTitle', 'menuIcon', 'parentMenu']),
                ]);
            })->toArray();
        });
    }


    /**
     * Summary of tabs
     * @return array
     */
    public function _tabs()
    {
        // Current Url
        $url = explode(url('/'), url()->current());
        $url = is_null($url[1]) ? '/' : $url[1];

        // Getting the mai menu
        $mainMenu = Menu::where('isActive', 1)
            // ->where('userUID', auth()->user()->userUID)
            ->where('menuURL', $url)
            ->first();
        // dd($mainMenu);

        // Getting the sub menus
        $subMenus = Menu::orderBy('menuUID', 'asc')
            // ->where('userUID', auth()->user()->userUID)
            ->where('parentMenu', $mainMenu?->menuUID)
            ->where('isActive', 1)
            ->get();

        // if has parent menus
        $parentMenu = Menu::orderBy('menuUID', 'asc')->where('isActive', 1)
            // ->where('userUID', auth()->user()->userUID)
            ->where('menuUID', $mainMenu?->parentMenu)
            ->first();

        // if has sibling menus
        $sideMenus = !is_null($parentMenu) ? Menu::orderBy('menuUID', 'asc')->where('isActive', 1)
            // ->where('userUID', auth()->user()->userUID)
            ->where('parentMenu', $parentMenu?->menuUID)
            ->get() : [];

        // This could be messy
        return [
            'url' => $url,
            'menu' => $mainMenu,
            'subMenus' => $subMenus,
            'parent' => $parentMenu,
            'siblings' => $sideMenus
        ];
    }
}