import Vue from 'vue'
import axios from 'axios';
/*
* somente letras com acentos e com espaço
*/

Vue.prototype.$somente_letras_acento_com_espaco = async ($event) => {
  //espaço
  if($event.charCode === 32){
    return true
  } 

  if(!/[a-záéíóúàèìòùãõâêîôûäëïöüç]/i.test($event.key)){  
    $event.preventDefault(); 
  } else {
    return true
  }
}

/*
* somente letras e numeros sem acentos sem espaco
*/

Vue.prototype.$somente_letras_e_numeros = async ($event) =>{
  if (($event.charCode > 64 && $event.charCode < 91) || ($event.charCode > 96 && $event.charCode < 123) || $event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
    return true
  }else{
    $event.preventDefault(); 
  }
}

/*
* somente numeros sem espaco
*/

Vue.prototype.$somente_numeros = async ($event) =>{
  if ($event.charCode === 0 || /\d/.test(String.fromCharCode($event.charCode))) {
    return true
  }else{
    $event.preventDefault(); 
  }
}

/*
* somente letras sem acento com espaco
*/

Vue.prototype.$somente_letras_espaco = async ($event) =>{
  //espaço
  if($event.charCode === 32){
    return true
  } 

  if (($event.charCode > 64 && $event.charCode < 91) || ($event.charCode > 96 && $event.charCode < 123)) {
    return true
  }else{
    $event.preventDefault(); 
  }
}

/*
* somente letras sem acento sem espaco
*/

Vue.prototype.$somente_letras_sem_espaco = async ($event) =>{
  if (($event.charCode > 64 && $event.charCode < 91) || ($event.charCode > 96 && $event.charCode < 123)) {
    return true
  }else{
    $event.preventDefault(); 
  }
}


Vue.prototype.$validacaoEmail = async (email,campo_vazio) =>{
  campo_vazio = (typeof campo_vazio !== 'undefined') ? campo_vazio : true;
 
  if (email) {
    if (email.indexOf("@") >= 0) {
      if (email.indexOf(".") >= 0) {
        // Email valido!;
        return true;
      } else {
        // Não é um Email valido!
        return false;
      }
    } else {
      // Não é um Email valido!
      return false;
    }
  } else {
    // O campo Email está Vazio!

    if(campo_vazio){
      return false;
    }else{
      return true;
    }
  }
}
