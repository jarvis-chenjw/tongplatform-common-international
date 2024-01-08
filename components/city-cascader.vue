<template>
    <Cascader v-model="value" :change-on-select="changeOnSelect" :clearable="clearable" :data="data" :disabled="disabled"
              :placeholder="placeholder" :size="size" :trigger="trigger"
              @on-change="changeValue"></Cascader>
</template>
<script>
import {Cascader} from 'view-design';
import cityData3 from '../js/city.data-3.js';

export default {
    components: {
        Cascader,
    },
    data() {
        return {
            value: this.cityValue || []
        }
    },
    props: {
        "cityValue": Array,
        "size": String,
        "placeholder": {
            type: String,
            default: "请选择城市"
        },
        "trigger": String,
        "changeOnSelect": Boolean,
        "disabled": {
            type: Boolean,
            default: false
        },
        "clearable": true,
        data: {
            type: Array,
            default: function () {

                return cityData3;
            }

        },
    },
    watch: {
//      	value(curVal, oldVal) {
//      		this.$emit('get-value', curVal);
//      	},
        cityValue(curVal) {
            this.value = curVal;
        }
    },
    methods: {
        changeValue(value, selectedData) {
            this.$emit('get-value', value, selectedData);
        }
    }

}
</script>
