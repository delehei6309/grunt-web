/**
 * Created by hekk on 2017/5/28.
 */
//设置页面标题
export let setTitle = (title) => {
    setTimeout(function () {
        //利用iframe的onload事件刷新页面
        document.title = title || '金疙瘩';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }, 0);
};


import $api from './api';

import  config from './config';
let baofooUrl = config.baofooUrl;
let baofooCallUrl = config.baofooCallUrl;
let merchant_id = config.merchant_id;
let terminal_id = config.terminal_id;


// baofoo 充值
export let submitRecharge = (params) => {
    let {userId, orderBillCode, amount, returnUrl} = params;
    let backUrl = window.location.origin + '/land-recharge-result.html';
    returnUrl = `${baofooCallUrl}/baofoo/notification/recharge`;
    let pageUrl = `${config.apiUrl}/baofoo/h5/notification/recharge?backUrl=${backUrl}`;
    $api.post('/baofoo/rechargeParam', {
        amount,
        userId,
        orderId: orderBillCode,
        returnUrl,
        pageUrl,
        feeTakenOn: 1,
        fee: 0
    }).then(resp => {
        if (resp.code == 200) {
            merchant_id = resp.data.merchantId || merchant_id;
            terminal_id = resp.data.terminalId || terminal_id;
            let xml = resp.data.requestParams;
            let sign = resp.data.sign;
            let form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.setAttribute('action', baofooUrl + 'cerPayRecharge.do');
            form.setAttribute('name', 'baofoo');
            let input = document.createElement('input');
            input.setAttribute('name', 'merchant_id');
            input.setAttribute('type', 'hidden');
            input.value = merchant_id;
            form.appendChild(input);
            input = document.createElement('input');
            input.setAttribute('name', 'terminal_id');
            input.setAttribute('type', 'hidden');
            input.value = terminal_id;
            form.appendChild(input);
            input = document.createElement('input');
            input.setAttribute('name', 'requestParams');
            input.setAttribute('type', 'hidden');
            input.value = xml;
            form.appendChild(input);
            input = document.createElement('input');
            input.setAttribute('name', 'sign');
            input.setAttribute('type', 'hidden');
            input.value = sign;
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        }
    })


};
//
export let submitAuthorization = (pUserId) => {
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', baofooUrl + 'inAccredit.do');
    //form.setAttribute('name', 'baofoo');
    let input = document.createElement('input');
    input.setAttribute('name', 'merchant_id');
    input.setAttribute('type', 'hidden');
    input.value = merchant_id;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'terminal_id');
    input.setAttribute('type', 'hidden');
    input.value = terminal_id;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'user_id');
    input.setAttribute('type', 'hidden');
    input.value = pUserId;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'service_url');
    input.setAttribute('type', 'hidden');
    input.value = baofooCallUrl + '/baofoo/notification/auth';
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'page_url');
    input.setAttribute('type', 'hidden');
    input.value = config.apiUrl + '/baofoo/h5/notification/auth';
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

};

// 输入框校验,提现和充值
export let currencyInputValidate = (input) => {
    if (!input) {
        return '';
    }
    let t = input.toString();
    if (t[0] == '0' || t[0] == '.') {
        return '';
    }
    if (isNaN(input)) {
        return ''
    }
    return t.replace(/\.\d{3,}/, (match) => {
        return match.substring(0, 3);
    })
};
import requestHybrid from './hybrid';
import $device from './device';
export let logout = () => {

    if ($device.kingold) {
        requestHybrid({
            tagname: 'forward',
            param: {
                target: 'login',
                targetUrl: window.location.origin + '/login'
            }
        });
    } else {
        let logoutIndex = window.sessionStorage.getItem('logoutIndex');
        if (logoutIndex) {/* 首页（未登录）点击需登录页。登录后自动跳至需登录页。*/
            window.sessionStorage.setItem('logoutUrl', logoutIndex);
        } else {
            window.sessionStorage.setItem('logoutUrl', encodeURIComponent(window.location.href));
        }
        window.location.replace('/login');
    }
};
// 刷新app个人信息
export let refreshApp = () => {
    if ($device.kingold && $device.kingoldVersion >= '1.0.5') {
        requestHybrid({
            tagname: 'refreshUserInfo',
            param: {}
        });
    }
};
let $operation = {
    setTitle
}
export default $operation;
export let remainTime = (end, now) => {
    let remainTime = (end - now) / 1000;
    if (isNaN(remainTime)) {
        return ''
    }
    if (remainTime < 0) {
        return '1分过期'
    }
    let day = Math.floor(remainTime / 3600 / 24);
    if (day > 0) {
        return day + '天过期'
    }
    let hours = Math.floor(remainTime / 60 / 60);
    if (hours > 0) {
        return hours + '小时过期'
    }
    let minutes = Math.floor(remainTime / 60);
    if ((remainTime / 60) < 1) {
        return '1分过期'
    }
    if (minutes > 0) {
        return minutes + '分过期'
    }
    return ''
};
let makeRandom = (len) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = possible.length;
    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * length));

    return text;
}
import {local} from './store';
export let getUuid = () => {
    if (local.getItem('randomUuid')) {
        return local.getItem('randomUuid');
    }
    let randomUuid = makeRandom(16);
    local.setItem('randomUuid', randomUuid);
    return randomUuid;

};
export let getDeviceID = () => {
    if (local.getItem('deviceID')) {
        return local.getItem('deviceID');
    }
    let deviceID = makeRandom(32);
    local.setItem('deviceID', deviceID);
    return deviceID;
};
import md5 from 'md5';
export let getAuthKey = (url) => {
    let key = md5(url + 'slat');
    return key;
};
export let addHive = (action = 1, label = 'login_btn_login', code) => {
    if (!code) {
        return false;
    }
    let time = new Date().getTime();
    let userUuid = local.getItem('userUuid') || '0';
    let wifi = '0';
    let hive = `${time},${userUuid},${wifi},${action},${code}`;
    let hives = local.getItem('post_hives') || [];
    hives.push(hive);
    local.setItem('post_hives', hives);
};

