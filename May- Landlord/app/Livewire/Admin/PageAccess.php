<?php

namespace App\Livewire\Admin;

use App\Livewire\Layouts\AdminComponent;
use App\Models\Menu;
use App\Traits\HasInfinityScroll;
use App\Traits\HasTabs;
use App\Models\Page;
use App\Models\Role;
use App\Models\User;
use App\Models\UserMenu;
use App\Traits\UseOrderBy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Livewire\Attributes\Computed;

class PageAccess extends AdminComponent
{

    use HasInfinityScroll, UseOrderBy, HasTabs;


    public $activeTab = 'users';

    public $pageAccess = [];

    public $userUID;


    /**
     * Get the Users Pages
     * @param string $userId
     * @return array
     */
    public function _user_pages($roleId)
    {
        $data = DB::withOrderBySelect('Landlord_PROC_SELECT_ITUSER_PAGEACCESS :procType, :roleUID', [
            "procType" => 'pageAccess',
            'roleUID' => $roleId
        ], perPage: $this->perPage, orderBy: $this->orderBy);

        if (!is_array($data)) {
            $data = json_decode(json_encode($data), true);
        }

        return collect($data)->map(function ($item) {
            return [
                'menuName' => $item['menuName'],
                'menuUID' => $item['menuUID'],
                'isActive' => $item['isActive'],
            ];
        })->toArray();
    }



    /**
     * Data source
     * @return array
     */
    #[Computed(true, 3600, true)]
    public function roles()
    {
        return DB::withOrderBySelect('Landlord_PROC_SELECT_ITUSER_PAGEACCESS :procType, :roleUID', [
            "procType" => 'roles',
            'roleUID' => null
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }






    /**
     * Data source
     * @return array
     */
    #[Computed(true, 3600, true)]
    public function pages()
    {
        return DB::withOrderBySelect('Landlord_PROC_SELECT_ITUSER_PAGEACCESS :procType, :roleUID', [
            "procType" => 'pages',
            'roleUID' => null
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }

    public function editUser($data)
    {

        try {
            $userUID = $data['userUID'];


            $userData = User::where('userUID', $userUID)->first();


            $pages = Menu::whereIn('menuUID', $data['pageAccess'])->get();


            $pages->map(function ($page) use ($data, $userUID) {
                $_menuName = $page->menuName;
                $role_id = $data['role'];


                $role = Role::where('roleName', $role_id)->first();
                $roleUID = $role->roleUID;


                $menu = Menu::where('menuName', $_menuName)->first();


                $userMenu = UserMenu::where('menuUID', $menu?->menuUID)
                    // ->where('userUID', $userUID)
                    ->first();
                // dd($userMenu);

                if ($page->isMainMenu == 1 || $page->isMainMenu == 0) {
                    if ($menu->isActive == 1) {
                        Menu::where([['roleUID', $roleUID], ['menuUID', $menu->menuUID]])->update([
                            "isActive" => 0
                        ]);
                    } else {
                        Menu::where([['roleUID', $roleUID], ['menuUID', $menu->menuUID]])->update([
                            "isActive" => 1
                        ]);
                    }

                    if ($userMenu->isActive == 1) {

                        $data = UserMenu::where([['roleUID', $roleUID], ['menuUID', $menu->menuUID]])->update([
                            'isActive' => 0
                        ]);
                    } else {
                        $data = UserMenu::where([['roleUID', $roleUID], ['menuUID', $menu->menuUID]])->update([
                            'isActive' => 1
                        ]);
                    }
                    // dd($data);
                }
            });


            $this->dispatch('user:updated', $data['userUID']);
            return true;
        } catch (\Throwable $th) {
            // dd($th->getMessage());
            $this->dispatch('user:error', ['message' => $th->getMessage()]);

            return false;
        }
    }


    // /**
    //  * Data source
    //  * @return array
    //  */
    // public function getData()
    // {
    //     return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ITUSER_PAGEACCESS :procType', [
    //         "procType" => $this->activeTab
    //     ], perPage: $this->perPage, orderBy: $this->orderBy);
    // }

    // public function getData()
    // {
    //     $tmp = [];

    //     // Execute the stored procedure query and convert the result to an array
    //     $users = DB::withOrderBySelect('Landlord_PROC_SELECT_ITUSER_PAGEACCESS :procType, :roleUID', [
    //         "procType" => $this->activeTab,
    //         'roleUID' => null
    //     ], perPage: $this->perPage, orderBy: $this->orderBy);

    //     // Convert the result to an array if necessary
    //     $usersArray = json_decode(json_encode($users), true);

    //     foreach ($usersArray as $usr) {
    //         $usrArray = (array) $usr;

    //         // Ensure _user_pages result is an array and handle null cases
    //         $userPages = $this->_user_pages($usrArray['roleUID']);
    //         if (!is_array($userPages)) {
    //             $userPages = json_decode(json_encode($userPages), true);
    //         }

    //         // Merge user data with their pages
    //         $user_page = (object) array_merge($usrArray, ["pages" => $userPages]);
    //         $tmp[] = $user_page;
    //     }

    //     return collect($tmp);
    // }
    public function getData()
    {

        $tmp = [];

        $users = DB::withOrderBySelect('Landlord_PROC_SELECT_ITUSER_PAGEACCESS :procType, :roleUID', [
            "procType" => $this->activeTab,
            'roleUID' => null
        ], perPage: $this->perPage, orderBy: $this->orderBy)->toArray();

        foreach ($users as $usr) {
            $usr = (array) $usr;
            $user_page = (object)[...$usr, "pages" => [...$this->_user_pages($usr['roleUID'])]];
            $tmp = [...$tmp, $user_page];
        }

        return collect($tmp);
    }


    public function render()
    {
        return view('livewire.admin.page-access', [
            'dataset' => $this->getData(),
            'pageAccess' => $this->pageAccess,
        ]);
    }
    // public function createUser(array $data)
    // {

    //     DB::beginTransaction();

    //     $pages = Page::whereIn('pageUID', $data['pageAccess'])->get();

    //     try {

    //         $user = User::create([
    //             'name' => $data['name'],
    //             'email' => $data['email'],
    //             'password' => Hash::make($data['password']),
    //             'phone' => !isset($data['phone']) ? '' : $data['phone'],
    //             'roleUID' => $data['role']
    //         ]);


    //         $this->dispatch('user:created');
    //         DB::commit();
    //         return true;
    //     } catch (\Throwable $th) {
    //         // dd($th);
    //         $this->dispatch('user:error', message: $th->getMessage());
    //         DB::rollBack();
    //         return true;
    //     }
    // }
}
