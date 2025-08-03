const template=document.createElement('template') ;
template.innerHTML=`
<div class="inputBox">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
    <div class="icon">
        <i class="fa-solid"></i>
    </div>
    <input type="text">
    <span class="placeholder"></span>
</div>
` ;

const style=document.createElement('style') ;
style.innerHTML=`
.inputBox
{
    position:relative ;
    display:flex ;

    width:100% ;
    height:fit-content ;
    border:1px solid var(--COLOR-BORDER) ;
    background:var(--COLOR-BG) ;
    border-radius:8px ;
}

.inputBox textarea
{
    resize:none ;
    height:100px ;
    padding-top:16px !important ;
}
.inputBox input
{
    height:45px ;
    border-radius:8px ;
}
.inputBox input,
.inputBox textarea
{
    width:0 ;
    flex-grow:1 ;
    outline:none ;
    color:var(--COLOR-TEXT) ;
    font-size:1em ;
    border:none ;
    background:transparent ;
    box-sizing:border-box ;
    padding:0 8px ;
    padding-top:8px ;
    font-family:inherit ;
}
.inputBox .icon ~ input
{
    padding:0 5px ;
    padding-top:8px ;
    border-radius:0 8px 8px 0 ;
}
    
.inputBox .icon
{
    width:45px ;
    background:var(--COLOR-PRIMARY) ;
    display:flex ;
    align-items:center ;
    justify-content:center ;
    color:white ;
    border-radius:8px 0 0 8px ;
    pointer-events:none ;
    transition:.3s ;
}

.inputBox .placeholder
{
    position:absolute ;
    top:12px ;
    color:var(--COLOR-TEXT-LIGHT) ;
    font-size:1em ;
    pointer-events:none ;
    transition:.3s ;
    padding-left:8px ;
}
.inputBox .icon ~ .placeholder
{
    padding-left:50px ;
}
    
.inputBox input:focus ~ .placeholder,
.inputBox input:not(.empty) ~ .placeholder,
.inputBox textarea:focus ~ .placeholder,
.inputBox textarea:not(.empty) ~ .placeholder
{
    top:0% ;
    transform:translateY(0) ;
    font-size:.75em ;
}
` ;

class CCLInput extends HTMLElement
{
    constructor()
    {
        super() ;
    }

    connectedCallback()
    {
        //TODO ajouter des conditions / erreurs (value ?)
        this._root=this.attachShadow({mode:'open'}) ;
        this._root.append(template.content.cloneNode(true)) ;
        this._root.append(style.cloneNode(true)) ;

        const placeholder=this._root.querySelector('.placeholder') ;
        const placeholderText=this.getAttribute('placeholder') ;
        if (placeholderText!='')
            placeholder.innerHTML=placeholderText ;
        else
            placeholder.remove() ;

        let input=this._root.querySelector('input') ;
        const type=this.getAttribute('type') ;
        if (type=='textarea')
        {
            const textarea=document.createElement('textarea') ;
            console.log(textarea) ;
            input.replaceWith(textarea) ;
            input=textarea ;
        }
        else
        {
            if (type==null)
                type='text' ;
            input.setAttribute('type', type) ;
        }
        input.classList.add('empty') ;
        const required=this.getAttribute('required') ;
        if (required!=undefined)
            input.setAttribute('required', true) ;

        const name=this.getAttribute('name') ;
        if (name!=null)
            input.setAttribute('name', name) ;

        const icon=this._root.querySelector('.icon i') ;
        const iconNames=this.getAttribute('icon') ;
        if (iconNames)
            iconNames.split(' ').forEach(iconName => icon.classList.add(iconName)) ;
        else
            icon.parentNode.remove() ;
        const updatePlaceholderClass = () => 
        {
            if (input.value.trim() !== '') 
                input.classList.remove('empty') ;
            else 
                input.classList.add('empty') ;
        } ;

        input.addEventListener('input', updatePlaceholderClass) ;
        input.addEventListener('blur', updatePlaceholderClass) ;
        updatePlaceholderClass() ;
    }
}

customElements.define("ccl-input", CCLInput) ;