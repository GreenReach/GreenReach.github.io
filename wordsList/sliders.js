window.onclick = e => {
    if( e.srcElement.className == "slider_default" || e.srcElement.className == "slider_up")
        e.srcElement.className ="slider_down";
    else if( e.srcElement.className == "slider_down") 
        {e.srcElement.className ="slider_up"; console.log(e.target)}

} 