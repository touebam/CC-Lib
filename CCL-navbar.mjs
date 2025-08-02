const template=document.createElement('template') ;
template.innerHTML=`
    <ccl-button id="navbarMenuButton" icon="fa-bars" type="text"></ccl-button>
` ;

const templateCollapsedContainer=document.createElement('template') ;
templateCollapsedContainer.innerHTML=`
    <ccl-button id="navbarCloseButton" icon="fa-close" type="text"></ccl-button>
` ;

const templateLogo=document.createElement('template') ;
templateLogo.innerHTML=`
<div class="logo">
    <img src="" alt="">
    <div class="logoName"></div>
</div>` ;

const style=document.createElement('style') ;
style.innerHTML=`
ccl-navbar
{
    --NAVBAR-HEIGHT:50px ;
    --NAVBAR-PADDING:6px ;

    position:relative ;
    background:var(--COLOR-BG-DARK) ;
    width:100% ;
    height:calc(var(--NAVBAR-HEIGHT) + 2 * var(--NAVBAR-PADDING)) ;
    padding:var(--NAVBAR-PADDING) ;
    display:flex ;
    align-items:center ;
    justify-content:space-between ;
    box-shadow:1px 0 5px rgba(0, 0, 0, 0.1) ;
    overflow-x:hidden ;
}

ccl-navbar .wrapper
{
    height:100% ;
    display:flex ;
    align-items:center ;
    justify-content:space-between ;
    gap:4px ;
    opacity:1 ;
    transition:all .3s ;
}
ccl-navbar .wrapper > :not(.fixed)
{
    opacity:1 ;
    transition:all .3s ;
}
#navbarMenuButton
{
    display:none ;
}
ccl-navbar.collapsed #navbarMenuButton
{
    display:flex ;
    align-items:center ;
    position:absolute ;
    top:0 ;
    bottom:0 ;
    right:12px ;
}
ccl-navbar.collapsed
{
    padding-right:60px ;
}
ccl-navbar.collapsed .wrapper:not(:has(.fixed)),
ccl-navbar.collapsed .wrapper > :not(.fixed)
{
    opacity:0 ;
    pointer-events:none ;
}

ccl-navbar.collapsed .collapsedContainer.displayed
{
    transform:translateY(0) ;
}

.collapsedContainer
{
    background:var(--COLOR-OVERLAY) ;
    position:fixed ;
    top:0 ;
    left:0 ;
    z-index:99999 ;
    width:100% ;
    transition:all .3s ;
    transform:translateY(-100%) ;
    display:flex ; 
    flex-direction:column ;
    gap:4px ;
    align-items:center ;
    padding:36px 6px ;
}
.collapsedContainer #navbarCloseButton
{
    position:absolute ;
    top:12px ;
    right:12px ;
}
` ;

class CCLNavbar extends HTMLElement
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

        this.collapsedContainer=document.createElement('div') ;
        this.collapsedContainer.classList.add('collapsedContainer') ;
        this.collapsedContainer.append(templateCollapsedContainer.content.cloneNode(true)) ;
        console.log(this.collapsedContainer) ;
        
        let items=this.getAttribute('items') ;
        if (items)
        {
            items=JSON.parse(items) ;

            items.forEach(item => {
                const wrapper=document.createElement('div') ;
                wrapper.className='wrapper' ;
                
                if (item.length)
                {
                    item.forEach(element => {
                        wrapper.append(this.createElementBlock(element)) ;
                    })
                }
                else
                    wrapper.append(this.createElementBlock(item)) ;
                this.append(wrapper) ;
            }) ;
        }
        this.append(this.collapsedContainer) ;
        const uniqueTags=[...new Set(
            Array.from(this.querySelectorAll('*'))
                .map(el => el.tagName.toLowerCase())
                .filter(tag => tag.includes('-'))
        )] ;

        Promise.all(uniqueTags.map(tag => customElements.whenDefined(tag))).then(() => 
        {
            let totalWidth=0 ;
            this.querySelectorAll('.wrapper').forEach(wrapper => totalWidth+=wrapper.getBoundingClientRect().width) ;

            let fixedWidth=0 ;
            this.querySelectorAll('.fixed').forEach(el => fixedWidth+=el.getBoundingClientRect().width) ;

            const margin=200 ;
            const threshold=totalWidth - fixedWidth + margin ;
            
            const updateNavbarState=() => 
            {
                const currentWidth=this.getBoundingClientRect().width ;
                if (currentWidth <= threshold)
                    this.classList.add('collapsed') ;
                else
                    this.classList.remove('collapsed') ;
            } ;

            const observer=new ResizeObserver(updateNavbarState) ;
            observer.observe(this) ;

            updateNavbarState() ;
        }) ;

        const openBtn=this.querySelector('#navbarMenuButton') ;
        const closeBtn=this.querySelector('#navbarCloseButton') ;
        const cssMenuButton=`
            :host i
            {
                font-size:1.3rem ;
            }
        ` ;
        openBtn.addEventListener('click', () => {
            this.collapsedContainer.classList.add('displayed');
        });
        closeBtn.addEventListener('click', () => {
            this.collapsedContainer.classList.remove('displayed');
        });

        customElements.whenDefined('ccl-button').then(() => {
            openBtn.updateCSS(cssMenuButton) ;
            closeBtn.updateCSS(cssMenuButton) ;
        }) ;
    }

    createElementBlock(element) 
    {
        let elementBlock ;
        switch (element.type) 
        {
            case 'logo' :
                elementBlock=document.createElement('ccl-button') ;
                elementBlock.innerText=element.name ;
                elementBlock.setAttribute('type', 'text') ;
                elementBlock.setAttribute('event', element.eventLogo) ;
                if (element.src)
                    elementBlock.setAttribute('src', element.src) ;
                else if (element.icon)
                    elementBlock.setAttribute('icon', element.icon) ;
                else
                    elementBlock.setAttribute('icon', 'fa-'+element.name.substring(0, 1).toLowerCase()) ;
                const cssLogo=`
                a
                {
                    padding:0 8px !important ;
                    gap:6px !important ;
                }

                i
                {
                    background:var(--COLOR-BG) ;
                    aspect-ratio:1 ;
                    height:calc(100% - 6px) !important ;
                }
                ` ;
                customElements.whenDefined('ccl-button').then(() => {
                    elementBlock.updateCSS(cssLogo) ;
                }) ;

                break ;
            case 'button' :
                elementBlock=document.createElement('ccl-button') ;
                elementBlock.innerText=element.label ;
                elementBlock.setAttribute('event', element.event) ;
                break ;
            case 'link' :
            default :
                elementBlock=document.createElement('ccl-button') ;
                elementBlock.setAttribute('type', 'text')
                elementBlock.innerText=element.label ;
                if (element.href!=undefined)
                    elementBlock.setAttribute('href', element.href) ;
                break ;
        }
        
        if (element.fixed==true)
            elementBlock.classList.add('fixed') ;
        else
            this.collapsedContainer.append(elementBlock.cloneNode(true)) ;
        return elementBlock ;
    }
}

customElements.define("ccl-navbar", CCLNavbar) ;