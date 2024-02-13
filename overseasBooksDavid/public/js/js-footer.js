function hide() {
    document.getElementById("quienesSomos").style.display = "none";
    document.getElementById("trabajaConNosotros").style.display = "none";
    document.getElementById("contactoFooter").style.display = "none";
    document.getElementById("terminos").style.display = "none";
    document.getElementById("cookiesExplained").style.display = "none";
}

function pressButton(event) {
    
    let target = event.target.id;
    

    if (target != '' && target != 'quienesSomos' && target != 'trabajaConNosotros' && target != 'contactoFooter' && target != 'terminos' && target != 'cookiesExplained') {
        hide()
    }
    
    if (target == "quienes") {
        document.getElementById("quienesSomos").style.display = "grid"; 
        
    } else if (target == "trabajar") {
        document.getElementById("trabajaConNosotros").style.display = "grid"; 
        window.scrollTo(0,2800);
        
    } else if (target == "contactanos") {
        document.getElementById("contactoFooter").style.display = "grid"; 
        window.scrollTo(0,2800);
        
    } else if (target == "terminosYcondi") {
        document.getElementById("terminos").style.display = "grid"; 
        window.scrollTo(0,2800);
        
    }  else if (target == "cookiesFooter") {
        document.getElementById("cookiesExplained").style.display = "grid"; 
        window.scrollTo(0,2800);
       
    }
   
}





