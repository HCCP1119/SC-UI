import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        displayModel: {
            namespaced: true,
            state: {
                isDark: false,
                colorSwitch: true,
            },
            actions: {
                changeModel(context, value) {
                    context.commit("change", value);
                }
            },
            mutations: {
                change(state, value) {
                    state.isDark = value;
                    state.colorSwitch = !value;
                }
            }
        },
        editorNode: {
            namespaced: true,
            state: {
                note: {
                    label: '',
                    children: null,
                    id: "",
                    isEdit: false,
                    type: ''
                }
            },
            actions: {
                setNode(context, value) {
                    context.commit("set", value)
                },
                setLabel(context, value) {
                    context.commit("setLabel", value)
                }
            },
            mutations: {
                set(state, value) {
                    state.note = value;
                },
                setLabel(state, value) {
                    state.note.label = value;
                }
            }
        },
    }
})

export default store
