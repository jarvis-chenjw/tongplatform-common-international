/**
 * 服务的配置
 * @author cyixiang@linewell.com
 * @since 2018-05-03
 */

import underscore from "underscore-extend";

// 通用接口配置
var commonServiceConfig = {

    // 获取上传参数
    GET_UPLOAD_TOKEN: "/tongplatform/common/third-party-extranet/v1/alioss/token-for-pc",

    LOGIN_CHECK: "/tongplatform/base/manage-user/v1/manage/login/",

    // 获取认证管理菜单未完成红点
    GET_MENU_TASK_COUNT: "/tongplatform/base/user-authentication/v1/auth/manage/pending-auth-num",

    // 获取菜单红点(包含认证管理菜单)
    GET_MENU_RED_POINT: "/tongplatform/base/manage-user/v1/manage/manageuser/red-point",

    // 裁剪接口
    UPLOAD_CUT: "/zuul/tongplatform/common/third-party-extranet/v1/attachment/upload-cut"

};


//模块对外提供的公共方法
//  var servicesConfig = $.extend(true, {},
//		commonServiceConfig
//  );
let servicesConfig = underscore.deepExtend(
    commonServiceConfig
);
export default servicesConfig;
