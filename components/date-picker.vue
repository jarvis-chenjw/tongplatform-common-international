<template>
    <div class="mul-date-piker">
        <DatePicker v-model="dateValue[0]" :clearable="false" :editable="false" :options="startOptions"
                    :style="{width : datePickerWidth}" :type="dateType" :value="dateValue[0]" @on-change="getValue"
                    @on-open-change="openChange"></DatePicker>
        <span
            style="display: inline-block;vertical-align: top;line-height: 32px;font-size: 14px;color: #80848f;">至</span>
        <DatePicker v-model="dateValue[1]" :clearable="false" :editable="false" :options="endOptions"
                    :style="{width : datePickerWidth}" :type="dateType" :value="dateValue[1]" @on-change="getValue"
                    @on-open-change="openChange"></DatePicker>
        <template v-if="showQuickWay">
            <Button :class="{active: type == 'today'}" @click="selectDate('today')">今天</Button>
            <Button :class="{active: type == 'sevenDay'}" @click="selectDate('sevenDay')">最近七天</Button>
            <Button :class="{active: type == 'oneMonth'}" @click="selectDate('oneMonth')">一个月</Button>
            <Button :class="{active: type == 'threeMonth'}" @click="selectDate('threeMonth')">三个月</Button>
        </template>
    </div>
</template>
<script>
import {DatePicker, Button} from 'view-design';
import utils from "../js/utils.js";

utils.dateExtend();

//  获取时间返回
var selectDate = function (type) {
    var start = new Date(new Date().Format("yyyy/MM/dd") + " 00:00:00");	// 今天00:00:00的UTC
    var end = new Date(new Date().Format("yyyy/MM/dd") + " 23:59:59");	// 今天23:59:59的UTC
    switch (type) {
        case "today" :
            start.setTime(start.getTime());
            break;
        case "sevenDay" :
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            break;
        case "oneMonth" :
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            break;
        case "threeMonth" :
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            break;
    }
    return [start, end];
};
export default {
    data() {
        return {
            dateValue: ["", ""],
            type: this.defaultType
        }
    },
    computed: {
        startOptions: function () {
            let that = this;
            return {
                disabledDate(date) {

                    // 初始状态起始时间选择器可选
                    if (that.dateValue[1] === "") {
                        return false;
                    }
                    return date > that.dateValue[1];
                }
            }

        },
        endOptions: function () {
            let that = this;
            return {
                disabledDate(date) {
                    var timeStr = new Date(date).getTime() + 86399000;
                    return new Date(timeStr) < that.dateValue[0];
                }
            }

        }
    },
    props: {
        defaultTime: Array,
        defaultType: {
            type: String,
            default: ""
        },
        showQuickWay: {
            type: Boolean,
            default: true

        },
        datePickerWidth: {

            type: String,
            default: "112px"
        },
        dateType: {

            type: String,
            default: "date"
        }
    },
    components: {
        DatePicker,
        Button
    },
    mounted: function () {

//			if(!(this.defaultTime && this.defaultTime.length)) {
        //this.dateValue = selectDate("threeMonth");
        //this.getValue(this.dateValue);
//  		}
    },
    methods: {

        /**
         * 快捷选择
         * @param {Object} type
         */
        selectDate: function (type) {
            this.dateValue = selectDate(type);
            this.getValue(this.dateValue);
            this.type = type;
        },

        /**
         * 改变时间事件
         */
        getValue(date) {
            if (this.dateType == "datetime") {
                // 开始时间00:00:00的UTC
                var startUTC = new Date(this.dateValue[0]);

                // 结束时间23:59:59的UTC(后台需要隔天的00:00:00需要多加1000毫秒)
                var endUTC = new Date(this.dateValue[1]);
            } else {
                // 开始时间00:00:00的UTC
                var startUTC = new Date(new Date(this.dateValue[0]).Format("yyyy/MM/dd") + " 00:00:00");

                // 结束时间23:59:59的UTC(后台需要隔天的00:00:00需要多加1000毫秒)
                var endUTC = new Date(new Date(new Date(this.dateValue[1]).Format("yyyy/MM/dd") + " 23:59:59").getTime() + 1000);
            }
            this.$emit("show-date", [startUTC.getTime(), endUTC.getTime()]);
        },

        /*
         * 打开、关闭日历事件
         */
        openChange(e) {
            if (e) {
                this.type = '';
            }

        }
    },
    watch: {

        /**
         * 监听回填时间
         */
        defaultTime(val, oldVal) {

            this.dateValue = [new Date(parseInt(val[0])), new Date(parseInt(val[1]))];
            this.type = '';
        }

    }
}
</script>