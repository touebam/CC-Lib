const template=document.createElement('template') ;
template.innerHTML=`Hello World !` ;

const style=document.createElement('style') ;
style.innerHTML=`` ;

class CCLBase extends HTMLElement
{
    constructor()
    {
        super() ;
    }

    connectedCallback()
    {
        this._root=this.attachShadow({mode:'open'}) ;
        this._root.append(template.content.cloneNode(true)) ;
        this._root.append(style) ;
    }
}

customElements.define("ccl-base", CCLBase) ;