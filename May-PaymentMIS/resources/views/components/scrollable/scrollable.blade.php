{{-- Table auto scrollable --}}
<div wire:key="{{ base64_encode('hello-world') }}" x-data="{

    height: '45vh',

    getHeight() {
        // get the footer position
        const footer = document.querySelector('.footer')
        //  get table position
        const table = this.$refs.mainTable
        return ((footer.offsetTop - table.offsetTop) - 30)
    },

    getWidth() {
        const table = $refs.mainTable
        return table.clientWidth + 'px';
    }

}" class="w-100" x-init="() => {
    @this.on('resetAll', (data) => {
        @this.loadMore()
    })
}" :style="{ overflowX: 'scroll', maxHeight: 'calc(100vh - 350px)', minHeight: '45vh', height: getHeight() > 1 ? getHeight() + 'px' : '45vh' }">

    {{-- main table goes in here --}}
    <table x-ref="mainTable" class="table table-info">
        {{ $slot }}
    </table>
    {{-- scroll trigger --}}
    <div :style="{width: getWidth()}" class="mb-3" x-data="{
        observe() {
            const observer = new IntersectionObserver(items => {
                items.forEach(item => {
                    if(item.isIntersecting) {
                        // calls a function called load more
                        @this.loadMore();
                    }
                })
            })
            // obsrve this div
            observer.observe(this.$el);
        }
    }" x-init="observe()">
    </div>

    @if(count($dataset) == 0) <p class="text-center mb-3">No data available</p>
    @endif

    {{-- Spinner --}}
    <x-spinner.index />
</div>
