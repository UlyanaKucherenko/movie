import "uikit/dist/css/uikit.min.css";
import "../scss/fils/_vue-start";

import {data} from './vue-page/vueData';

Vue.component("todo-item",{
template:`
  <li>
    <h2>{{  title }}</h2>
    <p>{{  text }}</p>
    <span>{{ testData }}</span>
  </li>`,
  props:{
   /* listItem:{
      type: Object,
      default(){
        return {
          name: 'Defaul',
          text: 'Defaul'
        }
      }
    }*/

    title: {
      type:String,
      default:"Defaul title"
    },
    text: {
      type:String,
      default:"Defaul text"
    },
    idx: {
      type: Number
    }
  },

  data(){
    return{
      testData: this.idx
    }
    
  },

  beforeCreate(){
    console.log('beforeCreate')
  },

  create(){
    console.log('create')
  },
  beforeMount(){
    console.log('beforeMount')
  },
  mounted(){
    console.log('mounted')
  },
  beforeUpdate(){
    console.log('beforeUpdate')
  },
  updated(){
    console.log('updated')
  },
  beforeDestroy(){
    console.log('beforeDestroy')
  },
  destroyed(){
    console.log('destroyed')
  },
});


const app = new Vue({
    el: '#app',
    data: data,

    methods: {
        toggleText() {
            this.showText = !this.showText;
        }
    },

    computed: {
        nodifedMassege() {
            return this.showText ? ` ${this.message}$$$` : ` ${this.message}`
        }
    }
  });
