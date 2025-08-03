const template=document.createElement('template') ;
template.innerHTML=`
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <div class="wrapper"></div>
    <div class="overlay"></div>
` ;

const templateLogoContent=document.createElement('template') ;
templateLogoContent.innerHTML=`
<div class="logoContent">
    <ccl-button id="menuButton" icon="fa-bars" type="text"></ccl-button>
    <div class="logo">
        <img src="" alt="">
        <div class="logoName"></div>
    </div>
</div>` ;
const templateSearchItem=document.createElement('template') ;
templateSearchItem.innerHTML=`
<li class="listItem">  
    <i class="fa-solid fa-magnifying-glass searchBtn"></i>
    <input type="text" placeholder="Search...">
    <span class="tooltip">Search</span>
</li>
` ;
const templateSubListItem=document.createElement('template') ;
templateSubListItem.innerHTML=`
<li class="listItem">  
    <a href="#">
        <i class="fa-solid"></i>
        <span class="linkName"></span>
        <i class="fa-solid fa-chevron-down arrow"></i>
    </a>
    <ul class="subList">
        <li><span class="linkName"></span></li>
    </ul>
</li>` ;

const templateSectionItem=document.createElement('template') ;
templateSectionItem.innerHTML=`
<li class="sectionItem">
    <span class="sectionName"></span>
    <span class="separator"></span>
</li>` ;
const templateListItem=document.createElement('template') ;
templateListItem.innerHTML=`
<li class="listItem">   
    <!--<a href="#">
        <i class="fa-solid"></i>
        <img src="" alt="">
        <span class="linkName"></span>
    </a>-->
    <ccl-button full-width="true" type="text">test</ccl-button>
    <span class="tooltip"></span>
</li>` ;
const templateProfileContent=document.createElement('template') ;
templateProfileContent.innerHTML=`
<div class="profileContent">
    <div class="profileDetails">
        <img src="" alt="Profile picture">
        <div class="profileInfos">
            <div class="name"></div>
            <div class="job"></div>
        </div>
    </div>
    <ccl-button id="logout" icon="fa-right-from-bracket" type="text"></ccl-button>
</div>` ;

const style=document.createElement('style') ;
style.innerHTML=`
ccl-sidebar
{
    --TRANSITION-LONG:0.4s ;
    --TRANSITION-SHORT:0.3s ;

    --MARGIN-X:10px ;
    --MARGIN-Y:6px ;

    --SIDEBAR-WIDTH:58px ;
    --SIDEBAR-WIDTH-ACTIVE:240px ;
    position:relative ;
    height:100% ;
    width:var(--SIDEBAR-WIDTH) ;
    z-index:9999 ;
    transition:all var(--TRANSITION-SHORT) ease ;
    box-shadow:1px 0 5px rgba(0, 0, 0, 0.1) ;
    flex-shrink:0 ;
}

ccl-sidebar.active
{
    width:var(--SIDEBAR-WIDTH-ACTIVE) ;
}

ccl-sidebar .wrapper
{
    height:100% ;
    width:100% ;
    display:flex ;
    flex-direction:column ;
    position:relative ;
    background:var(--COLOR-BG-DARK) ;
    transition:all var(--TRANSITION-SHORT) ease ;
    z-index:9999 ;
}
ccl-sidebar .logoContent
{
    display:flex ;
    align-items:center ;
    justify-content:space-between ;
    margin:var(--MARGIN-Y) var(--MARGIN-X) ;
}

ccl-sidebar .logoContent .logo
{
    color:var(--COLOR-TEXT) ;
    display:flex ;
    height:50px ;
    align-items:center ;
    opacity:0 ;
    transition:all var(--TRANSITION-SHORT) ;
    width:0 ;
}
ccl-sidebar.active .logoContent .logo
{
    opacity:1 ;
    width:100% ;
    overflow:hidden ;
    flex-grow:1 ;
    margin-right:4px ;
    padding:2px 8px ;
    border-radius:8px ;
    cursor:pointer ;
}
ccl-sidebar.active .logoContent .logo:hover
{
    background:var(--COLOR-BG) ;
    text-decoration:underline ;
}
ccl-sidebar .logoContent .logo img
{
    margin-right:5px ;
    max-width:100% ;
    max-height:100% ;
}

ccl-sidebar .logoContent .logo .logoName
{
    font-size:1.3rem ;
    font-weight:600 ;
    white-space:nowrap ;
    display:inline-block ;
    overflow:hidden ;
    text-overflow:ellipsis ;
    max-width:100% ;
}

ccl-sidebar #btn
{
    color:var(--COLOR-TEXT) ;
    font-size:1.3rem ;
    height:40px ;
    aspect-ratio:1 ;
    display:flex ;
    align-items: center ;
    justify-content: center;
    border-radius:8px ;
    cursor:pointer ;
    transition:all var(--TRANSITION-SHORT) ease ;
}

ccl-sidebar #btn:hover
{
    background:var(--COLOR-BG) ;
}
ccl-sidebar.active #btn
{
    position:relative ;
    left:auto ;
    transform:none ;
}

ccl-sidebar ul.navList
{
    height:0 ;
    flex-grow:1 ;
    display:flex ;
    flex-direction:column ;
    align-items:center ;
    gap:4px ;
    margin-top:10px ;
    padding-bottom:20px ;
    overflow-y:clip ;
}

ccl-sidebar.active ul.navList
{
    overflow-y:auto ;
    scrollbar-width:auto ;
    scrollbar-color:var(--COLOR-BG-LIGHT) var(--COLOR-BG-DARK) ;
}
ccl-sidebar.active ul.navList::-webkit-scrollbar
{
    width:2vw ;
}
ccl-sidebar.active ul.navList::-webkit-scrollbar-thumb
{
    background-color:var(--COLOR-BG-LIGHT) ;
}
ccl-sidebar.active ul.navList::-webkit-scrollbar-track
{
    background-color:var(--COLOR-BG-DARK) ;
}
ccl-sidebar ul.navList li.listItem
{
    position:relative ;
    height:40px ;
    flex-shrink:0 ;
    width:100% ;
    list-style:none ;
    transition:all var(--TRANSITION-SHORT) ease ;
}

ccl-sidebar ul.navList li.listItem:has(.searchBtn)
{
    width:calc(100% - 2 * var(--MARGIN-X)) ;
    padding:0 ;
}

ccl-sidebar:not(.active) ul.navList li.listItem .arrow
{
    display:none ;
}
ccl-sidebar ul.navList li.listItem .arrow
{
    transition:all var(--TRANSITION-SHORT) ease ;
}
ccl-sidebar ul.navList li.listItem.open .arrow
{
    transform:rotateZ(180deg) ;
}

ccl-sidebar.active ul.navList li.listItem.open
{
    padding-top:4px ;
    padding-bottom:8px ;
    height:fit-content ;
}
ccl-sidebar ul.navList li.listItem.open
{
    background:var(--COLOR-BG) ;
    height:fit-content ;
}

ccl-sidebar.active ul.navList li.listItem ul.subList
{
    opacity:0 ;
}
ccl-sidebar.active ul.navList li.listItem.open ul.subList
{
    opacity:1 ;
    padding-left:40px ;
}

ccl-sidebar:not(.active) ul.navList li.listItem ul.subList
{
    opacity:0 ;
    color:var(--COLOR-TEXT) ;
    background-color:var(--COLOR-BG) ;
    position:absolute ;
    left:100% ;
    top:-10px ;
    margin-top:0 ;
    padding:var(--MARGIN-X) ;
    border-radius:0 6px 6px 0 ;
    transition:all var(--TRANSITION-LONG) ease ;
    border:1px solid var(--COLOR-BORDER) ;
    border-left:none ;
    pointer-events:none ;
}

ccl-sidebar:not(.active) ul.navList li.listItem:hover ul.subList
{
    opacity:1 ;
    top:0 ;
    pointer-events:all ;
}

ccl-sidebar ul.navList li.listItem ul.subList li:has(.linkName)
{
    margin-bottom:4px ;
}
ccl-sidebar ul.navList li.listItem ul.subList .linkName
{
    color:var(--COLOR-TEXT) ;
    opacity:1 ;
}
ccl-sidebar.active ul.navList li.listItem ul.subList .linkName
{
    display:none ;
}
ccl-sidebar ul.navList li.listItem ul.subList li 
{
    list-style:none ;
}
ccl-sidebar ul.navList li.listItem ul.subList li.subListItem a
{
    font-size:.8rem ;
    padding:5px ;
    color:var(--COLOR-TEXT-LIGHT) ;
    transition:all var(--TRANSITION-SHORT) ease ;
    cursor:pointer ;
    min-height:0 ;
}
ccl-sidebar ul.navList li.listItem ul.subList li.subListItem a:hover
{
    color:var(--COLOR-TEXT) ;
} 
ccl-sidebar ul.navList li.sectionItem
{
    color:var(--COLOR-TEXT) ;
    list-style:none ;
    font-weight:700 ;
    padding:0 var(--MARGIN-X) ;
    margin-top:calc(var(--MARGIN-Y) * 1.33) ;
    margin-bottom:var(--MARGIN-Y) ;
    width:100% ;
    position:relative ;
    margin-top:20px ;
}
ccl-sidebar ul.navList li.sectionItem .sectionName
{
    text-wrap:nowrap ;
    transition:all var(--TRANSITION-SHORT) ;
    opacity:0 ;
    border-top:none ;
    width:100% ;
    display:block ;
}
ccl-sidebar.active ul.navList li.sectionItem .sectionName
{
    opacity:1 ;
    border-top:1px solid var(--COLOR-TEXT-LIGHT) ;
    padding-top:15px ;
}
ccl-sidebar ul.navList li.sectionItem .separator
{
    border-top:1px solid var(--COLOR-TEXT-LIGHT) ;
    display:block ;
    transition:all var(--TRANSITION-SHORT) ease ;
    position:absolute ;
    top:50% ;
    width:calc(100% - 2 * var(--MARGIN-X)) ;
}

ccl-sidebar.active ul.navList li.sectionItem .separator
{
    opacity:0 ;
    transition-delay:0s ;
}

ccl-sidebar ul.navList li.listItem:has(.searchBtn) .tooltip
{
    left:calc(100% + var(--MARGIN-X)) ;
}
ccl-sidebar ul.navList li.listItem .tooltip
{
    position:absolute ;
    text-wrap:nowrap ;
    left:100% ;
    top:calc(50% - 10px) ;
    transform:translateY(-50%) ;
    border-radius:6px ;
    height:35px ;
    width:fit-content ;
    padding:0 8px ;
    background:var(--COLOR-BG) ;
    color:var(--COLOR-TEXT) ;
    line-height:35px ;
    text-align:center ;
    border-radius:0 6px 6px 0 ;
    transition:0s ;
    opacity:0 ;
    pointer-events:none ;
    display:flex ;
    align-items:flex-end ;
    border:1px solid var(--COLOR-BORDER) ;
    border-left:none ;
}
ccl-sidebar.active ul.navList li.listItem .tooltip
{
    display:none ;
}
ccl-sidebar ul.navList li.listItem:hover .tooltip
{
    transition:all var(--TRANSITION-LONG) ease ;
    top:50% ;
    opacity:1 ;
}

ccl-sidebar ul.navList li.listItem input
{
    position:absolute ;
    height:100% ;
    width:100% ;
    left:0 ;
    top:0 ;
    border-radius:8px ;
    outline:none ;
    border:none ;
    background:var(--COLOR-BG) ;
    font-size:1rem ;
    color:var(--COLOR-TEXT) ;
}

ccl-sidebar.active ul.navList li.listItem input
{
    padding-left:42px ;
}
ccl-sidebar:not(.active) ul.navList li.listItem input::placeholder
{
    color:transparent ;
}
ccl-sidebar ul.navList li.listItem i.searchBtn
{
    position:relative ;
    z-index:1 ;
    color:var(--COLOR-TEXT) ;
    font-size:1.4rem ;
    cursor:pointer ;
}

ccl-sidebar ul.navList li.listItem a
{
    color:var(--COLOR-TEXT) ;
    display:flex ;
    align-items:center ;
    text-decoration:none ;
    margin:0 var(--MARGIN-X) ;
    border-radius:8px ;
    transition:all var(--TRANSITION-LONG) ease ;
    white-space:nowrap ;
    min-height:40px ;
}
ccl-sidebar:not(.active) ul.navList li.listItem a
{
    width:40px ;
}
ccl-sidebar ul.navList li.listItem a.active
{
    background:var(--COLOR-BG) ;
}
ccl-sidebar ul.navList li.listItem a.notification:after
{
    content:'' ;
    display:block ;
    width:7px ;
    aspect-ratio:1 ;
    border-radius:50% ;
    position:absolute ;
    top:5px ;
    right:12px ;
    background:var(--COLOR-PRIMARY) ;
}
ccl-sidebar.active ul.navList li.listItem a.notification:after
{
    width:5px ;
    top:50% ;
    right:20px ;
    transform:translateY(-50%) ;
}
ccl-sidebar ul.navList li.listItem a:hover
{
    background:var(--COLOR-BG) ;
}
ccl-sidebar ul.navList li.listItem .linkName
{
    flex-grow:1 ;
    opacity:0 ;
    pointer-events:none ;
}
ccl-sidebar.active ul.navList li.listItem .linkName
{
    opacity:1 ;
    pointer-events:auto ;
    display:inline-block ;
    white-space:nowrap;
    overflow:hidden ;
    text-overflow:ellipsis ;
    max-width:100% ;
}
ccl-sidebar ul.navList i
{
    height:40px ;
    aspect-ratio:1 ;
    border-radius:8px ;
    display:flex ;
    align-items:center ;
    justify-content:center ;
    margin-right:5px ;
}
ccl-sidebar ul.navList i.letter
{
    background:var(--COLOR-BG) ;
    height:34px ;
    margin:3px ;
    margin-right:8px ;
}

ccl-sidebar ul.navList .listItem img
{
    height:30px ;
    aspect-ratio:1 ;
    border-radius:8px ;
    display:flex ;
    align-items:center ;
    justify-content:center ;
    margin-right:10px ;
    margin-left:5px ;
}

ccl-sidebar .profileContent
{
    position:relative ;
    color:var(--COLOR-TEXT) ;
    bottom:0 ;
    left:0 ;
    width:100% ;
    padding:5px 6px ;
    height:60px ;
    display:flex ;
    justify-content:space-between ;
    align-items:center ;
    background:var(--COLOR-BG-DARK) ;
}
ccl-sidebar.active .profileContent
{
    background:var(--COLOR-BG) ; 
}

ccl-sidebar .profileContent .profileDetails
{
    width:0 ;
    overflow:hidden ;
    flex-grow:1 ;
    margin-right:4px ;
    display:flex ;
    align-items:center ;
    opacity:0 ;
    pointer-events:none ;
    white-space:nowrap ;
    transition:all var(--TRANSITION-SHORT) ;
    padding:6px 10px ;
    border-radius:8px ;
    cursor:pointer ;
}

ccl-sidebar .profileContent .profileDetails:hover 
{
    background:var(--COLOR-BG-DARK) ;
}
ccl-sidebar.active .profileContent .profileDetails
{
    opacity:1 ;
    pointer-events:auto ;
}

ccl-sidebar .profileContent .profileDetails img
{
    height:40px ;
    aspect-ratio:1 ;
    object-fit:cover ;
    border-radius:8px ;
}

ccl-sidebar .profileContent .profileInfos
{
    margin-left:10px ;
}
ccl-sidebar .profileContent .profileInfos .name
{
    font-size:1rem ;
    font-weight:600 ;
}
ccl-sidebar .profileContent .profileInfos .job
{
    font-size:0.7rem ;
}

ccl-sidebar #logout
{ 
    position:absolute ;
    left:50% ;
    transform:translateX(-50%) ;
    display:flex ;
    align-items: center ;
    justify-content: center;
    height:40px ;
    aspect-ratio:1 ;
    font-size:1.3rem ;
    border-radius:12px ;
    text-align:center ;
    transition:all var(--TRANSITION-LONG) ease ;
    cursor:pointer ;
}

ccl-sidebar.active #logout
{
    position:relative ;
    left:auto ;
    transform:none ;
}
ccl-sidebar.active #logout:hover
{
    background:var(--COLOR-BG-DARK) ;
}
ccl-sidebar #logout:hover
{
    background:var(--COLOR-BG) ;
}

ccl-sidebar.displayOverlay.active
{
    width:var(--SIDEBAR-WIDTH) ;
    overflow:visible ;
}
ccl-sidebar.displayOverlay.active .wrapper
{
    width:var(--SIDEBAR-WIDTH-ACTIVE) ;
}
ccl-sidebar.displayOverlay .overlay
{
    z-index:5 ;
    display:block ;
    width:100vw ;
    height:100vh ;
    position:absolute ;
    top:0 ;
    left:0 ;
    transition:all var(--TRANSITION-SHORT) ease ;
    pointer-events:none ;
}
ccl-sidebar.displayOverlay.active .overlay
{
    background:var(--COLOR-OVERLAY) ;
    pointer-events:auto ;
}
@media (max-width:700px)
{
    ccl-sidebar.active:not(.hideOverlay)
    {
        width:var(--SIDEBAR-WIDTH) ;
        overflow:visible ;
    }
    ccl-sidebar.active:not(.hideOverlay) .wrapper
    {
        width:var(--SIDEBAR-WIDTH-ACTIVE) ;
    }
    ccl-sidebar:not(.hideOverlay) .overlay
    {
        z-index:5 ;
        display:block ;
        width:100vw ;
        height:100vh ;
        position:absolute ;
        top:0 ;
        left:0 ;
        transition:background var(--TRANSITION-SHORT) ease ;
        pointer-events:none ;
    }
    ccl-sidebar.active:not(.hideOverlay) .overlay
    {
        background:var(--COLOR-OVERLAY) ;
        pointer-events:auto ;
    }
}
` ;

class CCLSidebar extends HTMLElement
{
    constructor()
    {
        super() ;
    }

    connectedCallback()
    {
        import('./CCL-button.mjs') ;
        this.append(style.cloneNode(true)) ;
        this.append(template.content.cloneNode(true)) ;

        const wrapper=this.querySelector('.wrapper') ;
        const overlay=this.querySelector('.overlay') ;
        overlay.addEventListener('click', () => this.closeSidebar()) ;

        const hoverToggle=this.getAttribute('hover-toggle') ;
        if (typeof hoverToggle=="string" && hoverToggle!="false") 
        {
            this.addEventListener('mouseenter', () => this.openSidebar()) ;
            this.addEventListener('mouseleave', () => this.closeSidebar()) ;
            this.addEventListener('mousemove', (event) => 
            {
                if (event.target.className=='overlay')
                    this.closeSidebar() ;
            }) ;
        }
        else
        {
            const active=this.getAttribute('active') ;
            if (typeof active=="string" && active!="false") 
            {
                this.classList.add('active') ;
            }
            this.addEventListener('wheel', () =>
            {
                this.openSidebar() ;
            }) ;
        }

        const displayOverlay=this.getAttribute('overlay') ;
        if (typeof displayOverlay=="string")
        {
            if (displayOverlay!="false") 
                this.classList.add('displayOverlay') ;
            else
                this.classList.add('hideOverlay') ;
        }

        const logoContent=templateLogoContent.content.cloneNode(true) ;
        const btn=logoContent.querySelector('#menuButton') ;
        const cssMenuButton=`
            :host i
            {
                font-size:1.3rem ;
            }
        ` ;
        customElements.whenDefined('ccl-button').then(() => {
            btn.updateCSS(cssMenuButton);
        });

        
        btn.addEventListener('click', (event) => this.toggleSidebar()) ;

        const logoWrapper=logoContent.querySelector('.logo') ;
        let logo=this.getAttribute('logo') ;
        if (logo)
        {
            logo=JSON.parse(logo) ;
            
            const img=logoContent.querySelector('img') ;
            img.src=logo.src ;
            img.alt=logo.logoName ? ("Logo " + logo.name) : "Main Logo" ;

            const logoName=logoContent.querySelector('div.logoName') ;
            logoName.innerText=logo.name ? logo.name : '' ;

            if (typeof window[logo.eventLogo]==='function')
                logoWrapper.addEventListener('click', () => window[logo.eventLogo]()) ;
        }
        else
            logoWrapper.remove() ;
        wrapper.append(logoContent) ;

        let items=this.getAttribute('items') ;
        if (items)
        {
            items=JSON.parse(items) ;
            const navList=document.createElement('ul') ;
            navList.classList.add('navList') ;
            items.forEach(item =>
            {
                switch (item.type)
                {
                    case 'sectionItem' : 
                        const sectionItem=templateSectionItem.content.cloneNode(true) ;

                        const sectionName=sectionItem.querySelector('span.sectionName') ;
                        sectionName.innerText=item.label ? item.label : '' ;

                        item.html=sectionItem ;
                        break ;
                    case 'searchItem' : 
                        const searchItem=templateSearchItem.content.cloneNode(true) ;
                        
                        const btn=searchItem.querySelector('i') ;
                        btn.addEventListener('click', (event) => this.openSidebar()) ;
                        
                        item.html=searchItem ;
                        break ;
                    case 'subListItem' :
                        const subListItem=templateSubListItem.content.cloneNode(true) ;
                        
                        const sbi=subListItem.querySelector('i') ;
                        sbi.classList.add(item.icon) ;

                        const sbLinkName=subListItem.querySelector('span.linkName') ;
                        sbLinkName.innerText=item.label ;

                        const suba=subListItem.querySelector('a') ;
                        suba.addEventListener('click', (event) => this.toggleSubList(event)) ;

                        const subListWrapper=subListItem.querySelector('.listItem') ;
                        if (item.open=="true")
                            subListWrapper.classList.add('open') ;

                        const subList=subListItem.querySelector('.subList') ;
                        const subListName=subList.querySelector('.linkName') ;
                        subListName.innerText=item.label ;
                        item.subList.forEach(link =>
                        {
                            const li=document.createElement('li') ;
                            li.classList.add('subListItem') ;

                            const a=document.createElement('a') ;
                            if (link.href)
                            {
                                a.href=link.href ;
                                if (link.target)
                                {
                                    a.target=link.target ;
                                }
                            }
                            else
                            {
                                a.addEventListener('click', () => 
                                {
                                    const func=new Function(link.event) ; 
                                    func() ;
                                }) ;
                            }
                            a.innerText=link.label ;
                            li.append(a) ;

                            subList.append(li) ;
                        }) ;

                        item.html=subListItem ;
                        break ;
                    case 'listItem' :
                    default :
                        const listItem=templateListItem.content.cloneNode(true) ;
                        const button=listItem.querySelector('ccl-button') ;
                        button.classList.add(this.classList.contains('active')?'sidebar-open':'iconOnly') ;

                        const css=`
                        :host(.sidebar-open)
                        { 
                            display:flex ; 
                            margin:0 10px !important ; 
                            width:auto ;
                        }
                        :host a
                        {
                            gap:0 ;
                            padding:0 ;
                            justify-content:flex-start !important ;
                        }
                        :host i
                        {
                            width:40px ;
                        }
                        :host(.sidebar-open) i
                        {
                            margin-right:5px ;
                        }
                        :host img
                        {
                            padding:5px ;
                            height:30px ;
                            aspect-ratio:1 ;
                            margin-right:5px ;
                            border-radius:8px ;
                        }
                        :host(.iconOnly)
                        { 
                            display:flex ; 
                            margin:0 10px !important ; 
                        }
                        :host(.iconOnly) span
                        {
                            background:red !important ;
                            width:0 ;
                        }
                        ` ;
                        
                        if (item.notification=='true')
                            button.classList.add('notification') ;
                        if (item.active=='true')
                            button.classList.add('active') ;
                        
                        customElements.whenDefined('ccl-button').then(() => {
                            button.updateCSS(css);
                        });

                        if (item.src)
                            button.setAttribute('src', item.src) ;
                        else
                            if (item.icon)
                                button.setAttribute('icon', item.icon) ;
                            else
                                button.setAttribute('icon', 'fa-'+item.label.substring(0, 1).toLowerCase()) ;

                        button.innerText=item.label ;
                        if (item.href)
                        {
                            button.setAttribute('href', item.href) ;
                            if (item.target)
                                button.setAttribute('target', item.target)
                        }
                        else
                            button.addEventListener('click', () => 
                            {
                                const func=new Function(item.event) ; 
                                func() ;
                            }) ;

                        const tooltip=listItem.querySelector('.tooltip') ;
                        tooltip.innerText=item.label ;
                        
                        item.html=listItem ;
                        break ;
                }
                navList.append(item.html)
            }) ;
            wrapper.append(navList)
        }

        let profile=this.getAttribute('profile') ;
        if (profile)
        {
            profile=JSON.parse(profile) ;
            const profileContent=templateProfileContent.content.cloneNode(true) ;
            
            const img=profileContent.querySelector('img') ;
            img.src=profile.src ;

            const name=profileContent.querySelector('.name') ;
            name.innerText=profile.name ;

            const job=profileContent.querySelector('.job') ;
            job.innerText=profile.job ;
            
            const profileDetails=profileContent.querySelector('.profileDetails') ;
            if (typeof window[profile.eventProfile]==='function')
                profileDetails.addEventListener('click', () => window[profile.eventProfile]()) ;

            const logout=profileContent.querySelector('#logout') ;
            customElements.whenDefined('ccl-button').then(() => {
                logout.updateCSS(cssMenuButton);
            });
            if (typeof window[profile.eventLogout]==='function')
                logout.addEventListener('click', () => window[profile.eventLogout]()) ;
            wrapper.append(profileContent) ;
        }
    }
    setButtonsClasslist()
    {
        const isActive=this.classList.contains('active') ;
        this.querySelectorAll('.navList ccl-button').forEach(function(button) 
        {
            button.classList.remove('sidebar-open', 'iconOnly') ;
            button.classList.add(isActive ? 'sidebar-open' : 'iconOnly') ;
        });
    }
    toggleSidebar()
    {
        this.classList.toggle('active') ;
        this.setButtonsClasslist()
    }
    openSidebar()
    {
        this.classList.add('active') ;
        this.setButtonsClasslist()
    }
    closeSidebar()
    {
        this.classList.remove('active') ;

        const input=this.activeElement ;
        if (input)
            input.blur() ;
        this.setButtonsClasslist()
    }
    toggleSubList(event)
    {
        this.openSidebar() ;
        const listItem=event.target.closest('.listItem') ;
        listItem.classList.toggle('open') ;
    }
}

customElements.define("ccl-sidebar", CCLSidebar) ;