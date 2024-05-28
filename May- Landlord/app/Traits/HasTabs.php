<?php


namespace App\Traits;


/**
 * Livewire Page with Tabs
 */
trait HasTabs
{


    /**
     * Switching between tabs
     * @param mixed $tab
     * @return void
     */
    public function switchTab($tab): void
    {
        $this->activeTab = $tab;
        $this->dispatch('resetAll');
        $this->dispatch('reset:all');

        // recalculate the height while switching tabs
        $this->dispatch('tabChanged');
        $this->resetExcept('activeTab');
    }


    /**
     * Get the Current Tab
     * @return string
     */
    public function current(): string
    {
        return $this->activeTab;
    }
}
