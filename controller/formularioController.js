import Vue from 'vue'
import axios from 'axios';

/*
* todos 
*/

Vue.prototype.$formulario_all = async () => {
    try {
      let res = await axios.get('formulario');
      return res.data;
    } catch (e) {
      throw e;
    }
}

/*
* cadastrar
*/

Vue.prototype.$formulario_store = async (f) => {
    try {
      let res = await axios.post('formulario',{
        nome: f.nome,
        email: f.email,
        telefone: f.fixo,
        celular: f.movel,
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
}

/*
* editar
*/

Vue.prototype.$formulario_update = async (f) => {
    try {
      let res = await axios.put('formulario/'+f.id,{
        nome: f.nome,
        email: f.email,
        telefone: f.fixo,
        celular: f.movel,
      });
      return res.data;
    } catch (e) {
      throw e;
    }
}

/*
* deletar 
*/

Vue.prototype.$formulario_delete = async (id) => {
    try {
      let res = await axios.delete('formulario/'+id,{
          
      });
      return res.data;
    } catch (e) {
      throw e;
    }
}