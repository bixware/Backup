<?php

namespace App\Livewire\Admin;

use App\Livewire\Layouts\AdminComponent;
use App\Models\Menu;
use App\Models\Page;
use App\Models\Role;
use App\Models\User;
use App\Models\UserMenu;
use App\Traits\HasInfinityScroll;
use App\Traits\HasTabs;
use App\Traits\UseOrderBy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Livewire\Attributes\Computed;
use PhpParser\Node\Stmt\Foreach_;

class Settings extends AdminComponent
{
    use HasInfinityScroll, UseOrderBy, HasTabs;

    public $activeTab = 'users';
    public $selectRoleUID;
    public $CheckboxPageUID = [];
    public $pageAccess = [];

    public $userUID;


    // public function mount($userUID)
    // {
    //     $this->userUID = $userUID;
    // }

    /**
     * Get the Users Pages
     * @param string $userId
     * @return array
     */
    public function _user_pages($userId): array
    {
        $data =  DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS :procType, :userUID', [
            "procType" => 'pageAccess',
            'userUID' => $userId
        ], perPage: $this->perPage, orderBy: $this->orderBy);

        return $data->map(function ($item) {
            return $item->page;
        })->toArray();
    }









    #[Computed(true, 3600, true)]
    public function roles()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS :procType, :userUID', [
            "procType" => 'roles',
            'userUID' => null
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }

    #[Computed(true, 3600, true)]
    public function pages()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS :procType, :userUID', [
            "procType" => 'pages',
            'userUID' => null
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }




    public function createUser(array $data)
    {
        DB::beginTransaction();
        $pages = Page::whereIn('pageUID', $data['pageAccess'])->get();

        try {
            $user = User::Create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'phone' => !isset($data['phone']) ? '' : $data['phone'],
                'roleUID' => $data['role']
            ]);

            $pages->map(function ($page) use ($data, $user) {
                $_menuName = $page->pageName;
                $role_id = $data['role'];
                $role = Role::where('roleUID', $role_id)->first();

                $menu = Menu::where('menuName', $_menuName)
                    ->where('menuURL', 'like', '%' . 'admin' . '%')
                    ->first();

                $userMenu = UserMenu::where('menuUID', $menu?->menuUID)
                    ->first();

                if ($page->isMainMenu == 1) {

                    $insertedMenus = Menu::updateOrCreate([
                        'menuName' => $menu?->menuName,
                        "menuURL" => str_replace('admin', strtolower($role->roleName), $menu?->menuURL),
                        "menuclass" => $menu?->menuclass,
                        "menuIcon" => $menu?->menuIcon,
                        "menuTitle" => $menu?->menuTitle,
                        "parentMenu" => 0,
                        "isActive" => 1,
                        'userUID' => $user->userUID
                    ]);

                    UserMenu::updateOrCreate([
                        'roleUID' => $role_id,
                        'userUID' => $user?->userUID,
                        'menuUID' => $insertedMenus?->menuUID,
                        'isActive' => 1,
                        'menuOrder' => $userMenu?->menuOrder
                    ]);
                } else {
                    $parentMenu = Menu::where('menuUID', $menu->parentMenu)
                        ->where('menuURL', 'like', '%' . 'admin' . '%')
                        ->first();

                    $userParentMenu = Menu::where('menuName', $parentMenu?->menuName)
                        ->where('menuURL', 'like', '%' . 'admin' . '%')
                        ->where('userUID', $user?->userUID)
                        ->first();

                    $insertedMenus = Menu::updateOrCreate([
                        'menuName' => $menu?->menuName,
                        "menuURL" => str_replace('admin', strtolower($role->roleName), $menu?->menuURL),
                        "menuclass" => $menu?->menuclass,
                        "menuIcon" => $menu?->menuIcon,
                        "menuTitle" => $menu?->menuTitle,
                        "parentMenu" => $userParentMenu?->menuUID,
                        "isActive" => 1,
                        'userUID' => $user->userUID
                    ]);
                }
            });

            $this->dispatch('user:created');
            DB::commit();
            return true;
        } catch (\Throwable $th) {
            $this->dispatch('user:error', message: $th->getMessage());
            DB::rollBack();
            return true;
        }
    }

    public function editUser($data)
    {

        // dd($data);
        try {
            $userUID = $data['userUID'];

            // Retrieve the user's data
            $userData = User::where('userUID', $userUID)->first();
            $pages = Page::whereIn('pageUID', $data['pageAccess'])->get();
            // dd($pages);
            // Update user information
            // $userData->update([
            //     'name' => $data['name'],
            //     'email' => $data['email'],
            //     'password' => Hash::make($data['password']),
            //     'phone' => $data['phone'] ?? '',
            //     'roleUID' => $data['role']
            // ]);

            // Get user menus
            $userMenus = UserMenu::where('userUID', $userUID)->get();
            // Get menu for the user
            $menus = Menu::where('userUID', $userUID)->get();

            foreach ($menus as $menu) {
                Menu::where('userUID', $menu->userUID)->delete();
            }

            // Delete existing user menus and associated X user menus
            foreach ($userMenus as $userMenu) {
                UserMenu::where('userUID', $userMenu->userUID)->delete();
            }


            $pages->map(function ($page) use ($data, $userUID) {
                $_menuName = $page->pageName;
                //dd($page);
                $role_id = $data['role'];
                $role = Role::where('roleUID', $role_id)->first();

                $menu = Menu::where('menuName', $_menuName)
                    ->where('menuURL', 'like', '%' . 'admin' . '%')
                    ->first();


                $userMenu = UserMenu::where('menuUID', $menu?->menuUID)
                    ->first();

                if ($page->isMainMenu == 1 || $page->isMainMenu == 0) {

                    if ($page->pageName == 'Change Password' || $page->pageName == 'Delete Page') {

                        $insertedMenus = Menu::updateOrCreate([
                            'menuName' => $menu->menuName,
                            "menuURL" => str_replace('admin', strtolower($role->roleName), $menu->menuURL),
                            "menuclass" => $menu->menuclass,
                            "menuIcon" => $menu->menuIcon,
                            "menuTitle" => $menu->menuTitle,
                            "parentMenu" =>  $menu->menuUID,
                            "isActive" => 1,
                            'userUID' => $userUID
                        ]);
                    } else {

                        $insertedMenus = Menu::updateOrCreate([
                            'menuName' => $menu->menuName,
                            "menuURL" => str_replace('admin', strtolower($role->roleName), $menu->menuURL),
                            "menuclass" => $menu->menuclass,
                            "menuIcon" => $menu->menuIcon,
                            "menuTitle" => $menu->menuTitle,
                            "parentMenu" => 0,
                            "isActive" => 1,
                            'userUID' => $userUID
                        ]);
                    }

                    UserMenu::updateOrCreate([
                        'roleUID' => $role_id,
                        'userUID' => $userUID,
                        'menuUID' => $insertedMenus->menuUID,
                        'isActive' => 1,
                        'menuOrder' => $userMenu?->menuOrder  // Assuming no specific menu order provided
                    ]);
                } else {

                    $parentMenu = Menu::where('menuUID', $menu->parentMenu)
                        ->where('menuURL', 'like', '%' . 'admin' . '%')
                        ->first();

                    $userParentMenu = Menu::where('menuName', $parentMenu->menuName)
                        ->where('menuURL', 'like', '%' . 'admin' . '%')
                        ->where('userUID', $userUID)
                        ->first();


                    $insertedMenus = Menu::updateOrCreate([
                        'menuName' => $menu->menuName,
                        "menuURL" => str_replace('admin', strtolower($role->roleName), $menu->menuURL),
                        "menuclass" => $menu->menuclass,
                        "menuIcon" => $menu->menuIcon,
                        "menuTitle" => $menu->menuTitle,
                        "parentMenu" => $userParentMenu->menuUID,
                        "isActive" => 1,
                        'userUID' => $userUID
                    ]);
                }
            });


            $this->dispatch('user:updated', $data['userUID']);

            return true;
        } catch (\Throwable $th) {

            $this->dispatch('user:error', ['message' => $th->getMessage()]);

            return true;
        }
    }




    public function getData()
    {

        $tmp = [];

        $users = DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS :procType, :userUID', [
            "procType" => $this->activeTab,
            'userUID' => null
        ], perPage: $this->perPage, orderBy: $this->orderBy)->toArray();

        foreach ($users as $usr) {
            $usr = (array) $usr;
            $user_page = (object)[...$usr, "pages" => [...$this->_user_pages($usr['userUID'])]];
            $tmp = [...$tmp, $user_page];
        }

        return collect($tmp);
    }



    public function render()
    {

        // dd($this->getData());
        // dd($this->userUID);
        // dd($this->_user_pages(63));
        return view('livewire.admin.settings', [
            'dataset' => $this->getData(),
            'pageAccess' => $this->pageAccess,
        ]);
    }
}