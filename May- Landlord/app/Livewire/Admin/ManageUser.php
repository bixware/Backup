<?php

namespace App\Livewire\Admin;

use App\Livewire\Layouts\AdminComponent;
use App\Traits\HasInfinityScroll;
use App\Traits\HasTabs;
use App\Models\Page;
use App\Models\User;
use App\Traits\UseOrderBy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Livewire\Attributes\Computed;

class ManageUser extends AdminComponent
{


    use HasInfinityScroll, UseOrderBy, HasTabs;



    public $activeTab = 'users';





    /**
     * Data source
     * @return array
     */
    #[Computed(true, 3600, true)]
    public function roles()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS :procType', [
            "procType" => 'roles'
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }






    /**
     * Data source
     * @return array
     */
    #[Computed(true, 3600, true)]
    public function pages()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS :procType', [
            "procType" => 'pages'
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }




    public function render()
    {
        return view('livewire.admin.manage-user', [
            'dataset' => $this->getData()
        ]);
    }




    /**
     * Data source
     * @return array
     */
    public function getData()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS :procType', [
            "procType" => $this->activeTab
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }

    public function createUser(array $data)
    {

        DB::beginTransaction();

        $pages = Page::whereIn('pageUID', $data['pageAccess'])->get();

        try {

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'phone' => !isset($data['phone']) ? '' : $data['phone'],
                'roleUID' => $data['role']
            ]);

            // $pages->map(function ($page) use ($data, $user) {

            //     $_menuName = $page->pageName;
            //     $role_id = $data['role'];
            //     $role = Role::where('roleUID', $role_id)->first();

            //     // * get menu template from admin menu
            //     $menu = Menu::where('menuName', $_menuName)
            //         ->where('menuURL', 'like', '%' . 'admin' . '%')
            //         ->first();

            //     // * getting the user menu template from admin
            //     $userMenu = UserMenu::where('menuUID', $menu?->menuUID)
            //         ->first();


            //     if ($page->isMainMenu == 1) {

            //         $insertedMenus = Menu::updateOrCreate([
            //             'menuName' => $menu?->menuName,
            //             "menuURL" => str_replace('admin', strtolower($role->roleName), $menu?->menuURL),
            //             "menuclass" => $menu?->menuclass,
            //             "menuIcon" => $menu?->menuIcon,
            //             "menuTitle" => $menu?->menuTitle,
            //             "parentMenu" => 0,
            //             "isActive" => 1,
            //             'userUID' => $user->userUID
            //         ]);

            //         UserMenu::updateOrCreate([
            //             'roleUID' => $role_id,
            //             'userUID' => $user?->userUID,
            //             'menuUID' => $insertedMenus?->menuUID,
            //             'isActive' => 1,
            //             'menuOrder' => $userMenu?->menuOrder
            //         ]);
            //     } else {

            //         // ! get the parent menu for the menu using the user id
            //         $parentMenu = Menu::where('menuUID', $menu->parentMenu)
            //             ->where('menuURL', 'like', '%' . 'admin' . '%')
            //             ->first();

            //         $userParentMenu = Menu::where('menuName', $parentMenu?->menuName)
            //             ->where('menuURL', 'like', '%' . 'admin' . '%')
            //             ->where('userUID', $user?->userUID)
            //             ->first();

            //         $insertedMenus = Menu::updateOrCreate([
            //             'menuName' => $menu?->menuName,
            //             "menuURL" => str_replace('admin', strtolower($role->roleName), $menu?->menuURL),
            //             "menuclass" => $menu?->menuclass,
            //             "menuIcon" => $menu?->menuIcon,
            //             "menuTitle" => $menu?->menuTitle,
            //             "parentMenu" => $userParentMenu?->menuUID,
            //             "isActive" => 1,
            //             'userUID' => $user->userUID
            //         ]);
            //     }
            // });


            $this->dispatch('user:created');
            DB::commit();
            return true;
        } catch (\Throwable $th) {
            // dd($th);
            $this->dispatch('user:error', message: $th->getMessage());
            DB::rollBack();
            return true;
        }
    }
}
