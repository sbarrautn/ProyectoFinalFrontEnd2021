const app = new Vue({
    el: '#app',
    data: {
        titulo: 'Holaaa',
        frutas: [
            {Nombre: 'Manzana', Cantidad:20},
            {Nombre: 'Pera', Cantidad:0},
            {Nombre: 'Mandarina', Cantidad:16},
            {Nombre: 'Mango', Cantidad:3},
        ]        
    }
})
import DaySpanVuetify from 'dayspan-vuetify'

Vue.use( DaySpanVuetify, {
  // options is vue definition, the resulting reactive component is stored in components as this.$dayspan or Vue.$dayspan
  data: {
    // data or computed to override
  },
  computed: {
    // data or computed to override
  },
  methods: {
    // methods to override
  }
});