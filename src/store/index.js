import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    displayModel:{
      namespaced:true,
      state:{
        isDark:false,
      },
      actions:{
        changeModel(context,value){
          context.commit("change",value);
        }
      },
      mutations:{
        change(state,value){
          state.isDark = value;
        }
      }
    },
  }
})

export default store
