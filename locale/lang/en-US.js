import underscore from "underscore-extend";
import baseJson from './base-en-US';

const systemUS = {
    bumenminngcheng: 'Department Name',
    beizhu: 'Remarks',
    querenshanchu: 'confirm deletion',
    shanchuchenggong: 'Delete successful',
    tianjiabumen: 'Add Department',
    bianjibumen: 'Editing Department',
    bumenrenyuanliebiao: 'Department Personnel List',
    quanxianguanli: 'Permission management',
    yonghuguanli: 'user management',
    suoshubumen: 'Department',
    qingshuruxingming: 'Please enter your name',
    qingshurushoujihaoma: 'Please enter your phone number',
    qingshurumima: 'Please enter password',
    qingzaicishurumima: 'Please enter your password again',
    zaicishurumimaqueren: 'Enter password again to confirm',
    qingxuanzequyubianma: 'Please select the region code',
    liangcishurudemimabuyizhi: 'The passwords entered twice are inconsistent',
    qingshurubumenmingcheng: 'Please enter the department name',
    xiangyouhuadongwanchengyanzheng: 'Swipe right to complete verification',
    qingxiangyouhuadonghuakuai: 'Please slide the slider to the right',
    qingshuruzhishaoliuweimima: 'Please enter a password of at least 6 characters',
    dangqianweibeishouquanpingtaiquanxian: 'Currently not authorized platform permissions',
    qiehuanyingyong: 'Switch applications',
    xinzengrenyuan: 'New personnel added',
}


const enUsData = underscore.deepExtend(
    baseJson,
    systemUS,
);
export default enUsData;

