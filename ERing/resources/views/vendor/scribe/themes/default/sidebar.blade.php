<a href="#" id="nav-button">
    <span>
        MENU
        <img src="{!! $assetPathPrefix !!}images/navbar.png" alt="navbar-image" />
    </span>
</a>
<div class="tocify-wrapper">
    @if($metadata['logo'] != false)
        <img src="{{ $metadata['logo'] }}" alt="logo" class="logo"  width="100%"/>
    @endif

    @isset($metadata['example_languages'])
        <div class="lang-selector">
            @foreach($metadata['example_languages'] as $name => $lang)
                @php if (is_numeric($name)) $name = $lang; @endphp
                <button type="button" class="lang-button" data-language-name="{{ $lang }}">{{ $name }}</button>
            @endforeach
        </div>
    @endisset

    <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
    </div>

    <div id="toc">
        @foreach($headings as $h1)
            <ul id="tocify-header-{{ $h1['slug'] }}" class="tocify-header">
                <li class="tocify-item level-1" data-unique="{!! $h1['slug'] !!}">
                    <a href="#{!! $h1['slug'] !!}">{!! $h1['name'] !!}</a>
                </li>
                @if(count($h1['subheadings']) > 0)
                    <ul id="tocify-subheader-{!! $h1['slug'] !!}" class="tocify-subheader">
                        @foreach($h1['subheadings'] as $h2)
                            <li class="tocify-item level-2" data-unique="{!! $h2['slug'] !!}">
                                <a href="#{!! $h2['slug'] !!}">{!! $h2['name'] !!}</a>
                            </li>
                            @if(count($h2['subheadings']) > 0)
                                <ul id="tocify-subheader-{!! $h2['slug'] !!}" class="tocify-subheader">
                                    @foreach($h2['subheadings'] as $h3)
                                        <li class="tocify-item level-3" data-unique="{!! $h3['slug'] !!}">
                                            <a href="#{!! $h3['slug'] !!}">{!! $h3['name'] !!}</a>
                                        </li>
                                    @endforeach
                                </ul>
                            @endif
                        @endforeach
                    </ul>
                @endif
            </ul>
        @endforeach
    </div>


    <ul class="toc-footer" id="last-updated">
        <li>{{ $metadata['last_updated'] }}</li>
    </ul>
</div>
