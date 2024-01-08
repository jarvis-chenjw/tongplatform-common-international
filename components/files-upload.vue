<template>
    <div>
        <Upload
            ref="uploadfile"
            :accept="accept"
            :action="actionUrl"
            :before-upload="handleBeforeUpload"
            :data="otherParams"
            :default-file-list="defaultFile"
            :format="format"
            :headers="headers"
            :max-size="maxSize"
            :multiple="multiple"
            :name="filename"
            :on-error="handleError"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :show-upload-list="showUploadList">
            <i-button :disabled="disabled" :icon="buttonIco">{{ defautText }}</i-button>
        </Upload>
    </div>
</template>

<script>
import utils from "utils";
import oss from "../js/oss-utils";

const FAST_FILE_UPLOAD_PATH = "/rest/zuul/tongplatform/common/third-party-extranet/v1/attachment/upload-files";
const ACTION_URL = INNO_CHINA_CONSTANTS.UPLOAD_URL || FAST_FILE_UPLOAD_PATH;

export default {
    data() {

        return {
            headers: utils.getAuthClient(),
            uploadList: [],
            filename: INNO_CHINA_CONSTANTS.UPLOAD_URL ? "file" : "files",
            otherParams: {}
        }
    },
    props: {
        defaultFile: Array,
        actionUrl: {
            type: String,
            default: ACTION_URL
        },
        maxSize: {
            type: Number,
            defalut: 2048
        },
        format: {
            type: Array,
            default() {
                return ['xls', 'xlsx', 'doc', 'docx', "pdf", "txt"]
            }
        },
        multiple: {
            type: Boolean,
            default: false
        },
        maxCount: {
            type: Number,
            default: 5
        },
        defautText: {
            type: String,
            default: '选择文件'
        },
        accept: String,
        disabled: {
            type: Boolean,
            default: false
        },
        showUploadList: {
            type: Boolean,
            default: true
        },
        buttonIco: {
            type: String,
            default: "ios-cloud-upload-outline"
        },
        otherData: {}
    },
    methods: {

        /**
         * 删除文件
         */
        handleRemove(file, fileList) {
            this.uploadList = fileList;

            this.$emit("handle-remove", this.uploadList, file, this.otherData);
        },

        /**
         * 成功回调
         */
        handleSuccess(res, file, fileList) {

            if (INNO_CHINA_CONSTANTS.UPLOAD_URL) {
                res = {
                    content: [{
                        fileId: this.otherParams.key,
                        fileName: file.name,
                        filePath: INNO_CHINA_CONSTANTS.UPLOAD_URL + "/" + this.otherParams.key
                    }]
                }
                file.url = res.content[0].filePath;
                file.name = res.content[0].fileName;
                file.id = res.content[0].fileId;
                this.uploadList = fileList;
                this.$emit("handle-success", fileList, file, this.otherData);
                return;
            }

            if (res && res.content && res.content.length > 0) {
                file.url = res.content[0].filePath;
                file.name = res.content[0].fileName;
                file.id = res.content[0].fileId;

                this.uploadList = fileList;
                this.$emit("handle-success", fileList, file, this.otherData);
            } else if (res && res.content && res.content.fastResult) {

                file.url = res.content.fastResult.filePath;
                file.name = res.content.fastResult.fileName;
                file.id = res.content.fastResult.fileId;

                this.uploadList = fileList;
                this.$emit("handle-success", fileList, file, this.otherData);
            } else {
                this.$Message.error("上传失败，请重新上传");
            }

        },

        /**
         * 超过文件大小
         */
        handleMaxSize(file) {

            let fileSize = this.maxSize > 1024
                ? (parseFloat(this.maxSize / 1024).toFixed(2) + "M")
                : (this.maxSize + "KB");

            this.$Message.warning("请选择小于" + fileSize + "的文件");

            this.$emit("on-exceeded-size", file, this.otherData);
        },

        /**
         * 文件格式有误
         */
        handleFormatError(file) {

            this.$Message.warning("请上传正确的文件格式");

            this.$emit("on-format-error", file, this.otherData);
        },

        /**
         * 上传之前
         */
        handleBeforeUpload(files) {
            if (this.uploadList.length >= this.maxCount) {
                this.$Message.warning("最多上传" + this.maxCount + "个文件");
                return false;
            }

            this.$emit("before-upload", files, this.otherData);

            if (INNO_CHINA_CONSTANTS.UPLOAD_URL) {
//      			this.headers = underscore.deepExtend(this.headers, {"content-disposition" : "attachment;filename="+file.name+""});
                return new Promise((resolve) => {
                    oss.getUploadParams(files, (data) => {
                        this.otherParams = data;
                        resolve();

                    })

                })
            }
        },

        /**
         * 上传错误
         */
        handleError(file) {
            this.$Message.warning("上传失败，请重新上传");
            this.$emit("on-error", file, this.otherData);
        }
    },
    watch: {
        defaultFile: {
            handler: function (curVal) {
                for (let i = 0; i < curVal.length; i++) {
                    curVal[i].status = "finished";
                    curVal[i].percentage = "100";
                }
                this.uploadList = curVal;
            },
            deep: true
        }
    }
}
</script>