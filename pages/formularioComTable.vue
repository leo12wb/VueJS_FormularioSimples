<template>
  <div>
    <div class="row" style="padding-left: 16px; padding-right: 16px">
      <div class="col-md-10">
        <h4>Gerenciar Formulario</h4>
      </div>
    </div>

    <div class="row" style="padding-left: 16px; padding-right: 16px; padding-bottom: 20px" v-if="ativarform == 0">
      <div class="col-md-12">
        <button
          type="button"
          class="btn btn-primary btn-fill float-left"
          @click.prevent="ativarForm"
        >
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Cadastrar
          novo Formulario
        </button>
      </div>
    </div>

    <div class="col-md-12" v-if="ativarform == 1">
      <div class="row">
        <div class="col-md-8">
          <div class="form-group">
            <label class="control-label">Nome:</label>
            <input
              type="text"
              placeholder="Nome"
              maxlength="100"
              class="form-control"
              v-model="f.nome"
              ref="nome"
              v-on:blur="f.nome = capitalize_palavras(f.nome)"
              @keypress="letras_acento($event)"
            />
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-group">
            <label class="control-label">Email:</label>
            <input
              type="text"
              placeholder="Email"
              maxlength="100"
              class="form-control"
              v-model="f.email"
              v-on:blur="validacaoEmail(f.email)"
              ref="email"
            />
          </div>
        </div>

        <div class="col-md-12">
           <p style="color:#ec1919;">{{this.msg}}</p>
        </div>

        <div class="col-md-12"></div>
        <div class="col-md-3">
          <div class="form-group">
            <label class="control-label">Telefone fixo:</label>
            <the-mask
              class="form-control"
              type="text"
              placeholder="Telefone fixo"
              v-model="f.fixo"
              :mask="['(##) ####-####']"
            />
          </div>
        </div>

        <div class="col-md-3">
          <div class="form-group">
            <label class="control-label">Celular:</label>
            <the-mask
              class="form-control"
              type="text"
              placeholder="Celular"
              v-model="f.movel"
              :mask="['(##) #####-####']"
            />
          </div>
        </div>

        <div class="col-md-12" style="margin-bottom: 20px; margin-top: 50px">
          <button
            type="button"
            class="btn btn-success btn-fill float-left"
            style="margin-right: 5px;"
            @click.prevent="cadastrar"
          >
            Cadastrar
          </button>

          <button
            type="button"
            class="btn btn-danger btn-fill float-left"
            @click.prevent="cancelar"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>


    <div class="col-md-12" v-if="ativarform == 0" >
      <vue-good-table 
        :columns="columns"
        :rows="formularioList"
        :lineNumbers="false"
        :search-options="{
          enabled: true,
          placeholder: 'Pesquisar',
        }"
        :pagination-options="{
              enabled: true,
              mode: 'records',
              mode: 'pages',
              perPage: 10,
              position: 'bottom',
              perPageDropdown: [5, 10, 15, 30],
              dropdownAllowAll: false,
              nextLabel: 'Próximo',
              prevLabel: 'Anterior',
              rowsPerPageLabel: 'Linhas por página',
              ofLabel: 'de',
              pageLabel: 'pagina', 
              allLabel: 'All',
        }"
        >
          <template slot="table-row" slot-scope="props" >
              
              <span v-if="props.column.field == 'action'">
                <button class="btn btn-primary" @click="editarOption(props.row)" data-toggle="tooltip" title="Editar"
                  style="margin-right:5px;">
                    <i class="fa fa-pencil-square-o"></i>
                </button>

                <button class="btn btn-danger" @click="deletarOption(props.row.id)" data-toggle="tooltip" title="Deletar">
                      <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </span>
              <span v-else>
                 <span v-if="props.column.field != 't'">
                   {{props.formattedRow[props.column.field]}}
                 </span>  
              </span>
          </template>
      </vue-good-table> 

    </div>  
  </div>
</template>


<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import { TheMask } from "vue-the-mask";
import axios from "axios";
import "src/controller/formularioController.js";
import "src/validar.js";

export default {
  name: "paciente",
  components: {
    VueGoodTable,
    TheMask,
  },
  props: {},
  data() {
    return {
      columns: [
        {
          label: "Nome",
          field: "nome",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Ações",
          field: "action",
          sortable: false,
        },
        {
          label: "id",
          field: "id",
          hidden: true,
        },
      ],
      formularioList: [],
      f: {
        id: null,
        nome: "",
        email: "",
        fixo: null,
        movel: null,
      },
      msg: null,
      ativarform: 0,
    };
  },

  methods: {
    // filtros
    letras_acento(event) {
      this.$somente_letras_acento_com_espaco(event);
    },
    validaEmail(email) {
      this.$validacaoEmail(email);
    },
    async validacaoEmail(email){
      let data = await this.$validacaoEmail(email);
        
      if(!data){ 
        this.$refs.email.focus();
        this.msg = "Não é um Email valido!";
      }else{
        this.msg = null;
      }

    },

    // funcoes basicas
    ativarForm() {
      this.ativarform = 1;
      //quando abrir o formulario ele da focus no nome 
      setTimeout(() => {
        this.$refs.nome.focus();
      }, 20);
    },

    cancelar(){
      this.limparCampos();
      this.ativarform = 0;
    },

    limparCampos(){
      this.f.id= null;
      this.f.nome = "";
      this.f.email= "";
      this.f.fixo= null;
      this.f.movel= null;
    },

    // transforma primeira letra em maiuscula todas as palavras da frase.
    capitalize_palavras(string) {
      return string.replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
      });
    },

    // funcoes de comunicação com API  - cadastro ...

    async cadastrar() {
      try {
        
          let data = await this.$formulario_store(this.pac);

          if (data) {
            this.$alert("Cadastrado com sucesso!");
          } else {
            this.$alert(
              "Ops! algo estranho ocorreu tente cadastrar novamente!"
            );
          }

          this.limparCampos();
          this.listandoItens();
      } catch (e) {
        //console.log(e);
        if (e.response.status == 402) {
          this.$alert("Problemas na validação! ");
        }
      }
    },

    //editar

    async editarOption(row) {
      try {
        this.ativarCadastro = 1;
        this.f.id = row.id;
        let data = await this.formulario_show(this.f.id);
        this.f.nome = data.nome;
        this.f.email= data.email;
        this.f.fixo= data.fixo;
        this.f.movel= data.movel;

      } catch (e) {
        console.log(e);
      }
    },

    async editar() {
      try {
          let data = await this.$formulario_update(this.f);

          if (data) {
            this.$alert("Editado com sucesso!");
          } else {
            this.$alert(
              "Ops! algo estranho ocorreu tente cadastrar novamente!"
            );
          }

          this.limparCampos();
          this.listandoItens();
      } catch (e) {
        //console.log(e);
        if (e.response.status == 402) {
          this.$alert("Problemas na validação! ");
        }
      }
    },

    //deletar

    async deletarOption(id) {
      this.$confirm("Deseja Deletar?").then(() => {
        this.deletar(id);
      });
    },

    async deletar(id) {
      try {
        let data = await this.$formulario_delete(id);
        if (data) {
          this.$alert("Deletado com sucesso!");
        }

        this.listandoItens();
      } catch (e) {
        console.log(e);
      }
    },

    // lista

    async listandoItens() {
      try {
        let data = await this.$formulario_all();
        this.formularioList = [];
        this.formularioList = data.reverse();
      } catch (e) {console.log(e);}
    },
  },
  beforeMount() {
    try {
      this.listandoItens();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


