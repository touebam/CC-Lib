const template=document.createElement('template') ;
template.innerHTML=`` ;

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

    background:var(--COLOR-BG-DARK) ;
    width:100% ;
    height:calc(var(--NAVBAR-HEIGHT) + 2 * var(--NAVBAR-PADDING)) ;
    padding:var(--NAVBAR-PADDING) ;
    display:flex ;
    align-items:center ;
    justify-content:space-between ;
    box-shadow:1px 0 5px rgba(0, 0, 0, 0.1) ;
}

ccl-navbar .wrapper
{
    height:100% ;
    display:flex ;
    align-items:center ;
    justify-content:space-between ;
    gap:4px ;
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
                {
                    wrapper.append(this.createElementBlock(item)) ;
                }
                this.append(wrapper) ;
            });
        }
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
                    aspect-ratio:1 ;
                    height:calc(100% - 6px) !important ;
                }
                ` ;
                customElements.whenDefined('ccl-button').then(() => {
                    elementBlock.updateCSS(cssLogo);
                });

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
                elementBlock.setAttribute('href', element.href) ;
                break ;
        }
        return elementBlock ;
    }
}

customElements.define("ccl-navbar", CCLNavbar) ;