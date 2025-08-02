const template=document.createElement('template') ;
template.innerHTML=`
<a part="button">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
    <i class="fa-solid"></i>
    <img>
    <span><slot></slot></span>
</a>
` ;

const style=document.createElement('style') ;
style.innerHTML=`
:host
{
    display:flex ;
    width:fit-content ;
}

a 
{
    font-size:16px ;
    height:40px ;
    width:100% ;
    border:none ;
    outline:none ;
    border-radius:8px ;
    color:white ;
    text-wrap:nowrap ;
    position:relative ;
    cursor:pointer ;
    background:var(--COLOR-PRIMARY) ;
    transition:all .2s ;
    padding:0 12px ; 
    display:flex ;
    gap:12px ;
    align-items:center ;
    justify-content:space-between ;
    text-decoration:none ;
    min-width:40px ;
}

:host span
{
    white-space:nowrap ;
    display:inline-block ;
    overflow:hidden ;
    text-overflow:ellipsis ;
}
a:hover 
{
    background:var(--COLOR-PRIMARY-400) ;
}

a.small
{
    height:30px ;
    min-width:30px ;
    font-size:12px ;
    gap:8px ;
    padding:0 10px ; 
}

a.large
{
    height:50px ;
    min-width:50px ;
    font-size:18px ;
    gap:14px ;
    padding:0 18px ; 
}
:host i
{
    border-radius:8px ;
    display:flex ;
    align-items:center ;
    justify-content:center ;
    max-width:40px ;
    height:100% ;
    flex-shrink:0 ;
}
a.small i
{  
    max-width:30px ;
    max-height:30px ;
}
a.large i
{  
    max-width:50px ;
    max-height:50px ;
}

:host img
{
    max-height:30px ;
}
a.small img
{  
    max-height:25px ;
}
a.large img
{  
    max-height:40px ;
}
a.secondary
{
    background:var(--COLOR-PRIMARY-200) ;
    color:var(--COLOR-PRIMARY) ;
}
a.secondary:hover
{
    background:var(--COLOR-PRIMARY-300) ;
}

a.text
{
    background:transparent ;
    color:var(--COLOR-TEXT) ;
}
a.text:hover 
{
    background:var(--COLOR-BG)
}

a.disabled
{
    background:rgb(242, 242, 242) ;
    color:rgb(151, 151, 151) ;
    border:1px solid rgb(229, 229, 229) ;
    cursor:not-allowed ;
}
:host(.active) a
{
    background:var(--COLOR-BG) ;
}
:host(.active) a:hover
{
    background:var(--COLOR-BG-LIGHT) ;
}
:host(.notification):after
{
    content:'' ;
    display:block ;
    width:5px ;
    aspect-ratio:1 ;
    border-radius:50% ;
    position:absolute ;
    top:50% ;
    right:20px ;
    transform:translateY(-50%) ;
    background:var(--COLOR-PRIMARY) ;
    transition:all .3s ;
    pointer-events:none ;
}

:host(.iconOnly) a 
{ 
    padding:0 ; 
    gap:0 ;
    justify-content:center ;
}

:host(.notification.iconOnly):after
{
    top:5px !important ;
    right:12px !important  ;
    transform:none !important ;
}
` ;

class CCLButton extends HTMLElement
{
    constructor()
    {
        super() ;
    }

    connectedCallback()
    {
        this._root=this.attachShadow({mode:'open'}) ;
        this._root.append(template.content.cloneNode(true)) ;
        this._root.append(style.cloneNode(true)) ;

        const button=this._root.querySelector('a') ;
        const type=this.getAttribute('type') ;
        const size=this.getAttribute('size') ;
        button.className=(type?type:'') + ' ' + (size?size:'') ;

        const additionalCSS=document.createElement('style') ;
        let color=this.getAttribute('color') ;
        if (color)
        {
            color=JSON.parse(color) ;
            ["background", "text", "border", "hover-background", "hover-text", "hover-border"].forEach(function(colorType)
            {
                const colorValue=color[colorType] ;
                if (colorValue)
                {
                    switch (colorType)
                    {
                        case "background" :
                            additionalCSS.innerText+="a { background:"+colorValue+" !important ; }" ;
                            break ;
                        case "hover-background" :
                            additionalCSS.innerText+="a:hover { background:"+colorValue+" !important; }" ;
                            break ;
                        case "text" :
                            additionalCSS.innerText+="a { color:"+colorValue+" !important; }" ;
                            break ;
                        case "hover-text" :
                            additionalCSS.innerText+="a:hover { color:"+colorValue+" !important; }" ;
                            break ;
                        case "border" :
                            additionalCSS.innerText+="a { border:1px solid "+colorValue+" !important; }" ;
                            break ;
                        case "hover-border" :
                            additionalCSS.innerText+="a:hover { border:1px solid "+colorValue+" !important; }" ;
                            break ;
                    }
                }
            })
        }

        const icon=this._root.querySelector('i') ;
        const img=this._root.querySelector('img') ;
        const iconName=this.getAttribute('icon') ;
        const iconPosition=this.getAttribute('icon-position') ;
        
        if (iconName)
        {
            img.remove() ;
            icon.classList.add(iconName) ;

            if (iconPosition=='right')
            {
                icon.remove() ;
                button.append(icon) ;
            }
        }
        else
        {
            icon.remove() ;
            const src=this.getAttribute('src') ;
            if (src)
            {
                img.src=src ;
                img.alt="Button icon" ;

                if (iconPosition=='right')
                {
                    img.remove() ;
                    button.append(img) ;
                }
            }
            else
                img.remove() ;
        }
        if (this.innerHTML == '')
            this.classList.add('iconOnly') ;

        this._root.append(additionalCSS) ;
        
        const href=this.getAttribute('href') ;
        if (href)
            button.setAttribute('href', href) ;
        else
        {
            const eventName=this.getAttribute('event') ;
            if (eventName && typeof window[eventName] === 'function') 
                button.addEventListener('click', () => { window[eventName]()}) ;
        }
    }

    updateCSS(css)
    {
        const style=document.createElement('style') ;
        style.textContent=css ;
        this._root.appendChild(style) ;  
    }
}

customElements.define("ccl-button", CCLButton) ;

