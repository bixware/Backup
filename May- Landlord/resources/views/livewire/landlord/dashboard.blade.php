<x-app.landlord-layout :menus="$this->menus" :tabs="$this->tabs">
    <div>

        <h3 style="padding-left: 10px; color: black;" class="mt-3">Dashboard Page</h3>

        <div class="mt-5">
            <x-scrollable.scrollable :dataset="$dataset">
                <x-scrollable.scroll-head>

                    <tr class="bggrey" style="background: gray !important">
                        @foreach ($dataset as $data)
                        <th style="background: lightgray !important" class="left">{{ $data->Category }}</th>
                        @endforeach
                    </tr>

                </x-scrollable.scroll-head>
                <x-scrollable.scroll-body>
                    <tr style="text-align:center !important;">
                        @foreach ($dataset as $data)
                        <td>{{ $data->Value }}</td>

                        @endforeach

                    </tr>
                </x-scrollable.scroll-body>
            </x-scrollable.scrollable>
        </div>

    </div>
</x-app.landlord-layout>
