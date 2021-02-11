// geral
import formulario from 'src/pages/formularioComTable.vue'    

const token = sessionStorage.getItem("token");
const header = {
  headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token,
   }
}
const routes = [
  {
    path: '/admin/login',
    name:'login',
    component: Login, 
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/dash',
    children: [
      {
        // dash pagina principal
      },
      {
        path: 'formulario',
        name: 'formulario',
        component: formulario,
        beforeEnter: async (to, from, next) => {
          try {
            let verif = await verificaQuemEstarOnline(token);
            if(verif){
              return next();
            }else{
              next('/admin/login');
              return next(false); 
            }
          }catch(e){
            next('/admin/login');
          }
        }  
      },
    ]
  },
  { path: '*', component: NotFound }
]

export default routes
