<template>
  <v-card
  eager
  >
    <v-card-title v-if="searchPorperyt">
      {{this.title}}
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        eager
        v-model="search"
        append-icon="mdi-magnify"
        label="Arama"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :v-model="selectedArray"
       eager
      :loading="loading"
      :headers="headers"
      :items="items"
      :search="search"
      :show-expand="showExpand"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :item-key="keyOfItem"
      @item-expanded="loadDetails"
      :hide-default-footer="paginationShow"
      :disable-pagination="disablePagination"
      :server-items-length="itemsLength"
      :options.sync="options"
      :footer-props="footerProps"
      :showSelect="showSelect"
      :single-select="singleSelect"
      @click:row="rowClick"
      @item-selected="itemselected"
    >
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">
        <slot name="expanded"></slot>
      </td>
    </template>
    <template v-for="slot in slots" v-slot:[`item.${slot.slotName}`]="{ item }">
      <slot :name="slot.slotName" :degisken="item"></slot>
    </template>

     <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            v-if="detailEnabled"
            small
            @click="detItem(item)">mdi-eye</v-icon>
         <v-icon
            small
            v-if="showEditBtn"
            @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon
            small
            v-if="showDeleteBtn"
            @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
</v-data-table>
  </v-card>
</template>
<script>
/*eslint-disable*/
import _ from 'lodash';
  export default {
    props:{     
    headers: {
      type: Array,
      default: null
    },
    slots:{
      type:Array,
      default:null
    },
    items: {
      type: Array,
      default: function () { return [] }
    },
    title:{
      type:String,
      default:null
    },
    showExpand:{
      type:Boolean,
      default:false
    },
    singleExpand:{
      type:Boolean,
      default:false
    },
    keyOfItem:{
      type:String,
      default:null
    },
    loading:{
      type:Boolean,
      default:false
    },
    searchPorperyt:{
      type:Boolean,
      default:true
    },
    paginationShow:{
      type:Boolean,
      default:false
    },
    disablePagination:{
      type:Boolean,
      default:false
    },
    detailEnabled:{
      type:Boolean,
      default:false
    },
    itemsLength:{
      type:Number,
      default:0,
    },
    showSelect:{
      type:Boolean,
      default:false
    },
    singleSelect:{
      type:Boolean,
      default:true
    },
    showDeleteBtn:{
      type:Boolean,
      default:true
    },
    showEditBtn:{
      type:Boolean,
      default:true
    }
    },
    data () {
      return {
        selectedArray:[],
        search: '', 
        expanded:[],
        footerProps: {'items-per-page-options': [5, 10,15, 100]},
        options: {
          page:1,
          itemsPerPage:5,
        },
      }
    },
    watch:{
       options: {
        handler () {
            this.$emit("handle-options",this.options,this.search)
        },
        deep: true,
        },

        search: _.debounce(function(){
           this.options.page=1;
           this.$emit("handle-options",this.options,this.search)
        }, 300)

    },
    methods:{
        itemselected(selection){
           this.$emit('clicked-row',selection.item)
           console.log(selection.item)
        },
        rowClick(item, row){
         //row.select(true);
        },
        loadDetails(val){
          this.$emit('row-click', val.item)
        },

        editItem(val){
            this.$emit('clicked-edit', val)
        },
        deleteItem(val){
            this.$emit('clicked-delete', val)
        },
        detItem(val){
          this.$emit('clicked-detail', val)
        }
    }
  }
</script>