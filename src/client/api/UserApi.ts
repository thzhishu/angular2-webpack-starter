/**
 * 车门店 API
 * 前后端交互协议, 遵循以下约定:   1. 所有api都属于无状态接口   2. 除了/user/login,/_*_/sms,/user/register,/user/updatePwd接口，其他接口都要登录之后才能操作   3. 登录成功之后，后端每次都把token和shopId(当前门店)置入header,回传服务端   4. 客户端请求参数分两种:       1. 以form方式提交，可以附带store、pageNumber、pageSize参数       2. 以json方式提交，务必附带store、pageNumber、pageSize属性，如果没有值，为null   5. 服务端返回统一的json， 格式如下:       {        meta:{         code: 状态码         link: 链接         limit: 每页多少条         total:  总共多少条         current: 当前页         method: 方法         parameters: {  客户端的请求参数          startDate:开始时间          endDate:结束时间          ........:xxxx(请求参数都会在meta里面)                    },         store: { 客户端专用，保存交互状态的对象                  }         }        data:{ // 保存的数据，可能是array, object          object          list<object>          jsonArray        }        error:{           code:xxxxx (子状态码)           message:xxxxx        }       }            6. 公共状态(meta->code)约定如下:              500:             服务端处理失败， 返回json中存在error, meta对象， 不一定存在data对象          200:             成功， 返回json中有meta， data对象， 不存在error对象          401:             认证失败，用户的token过期或者token错误， 客户端需要引导用户重新登录          403:             授权失败， 一般出现在用户访问没有权限的资源, 返回json中存在error, meta对象          400:             参数错误,  客户端提交的参数不正确, 返回json中存在error, meta对象                 7. error的子状态码， 开发人员可以自行约定
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

import { Cookie } from 'services';  //tobeplus 缓存注入 header

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class UserApi {
    protected basePath = '/api/v1';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 登录之后修改密码， 通过原密码修改
     *
     * @param oldPassword 旧密码
     * @param password 新密码
     * @param rePassword 确认密码
     */
    public userChangePwdPost (oldPassword: string, password: string, rePassword: string, extraHttpRequestParams?: any ) : Observable<models.UserResponse> {
        const path = this.basePath + '/user/changePwd';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token')); //tobeplus 缓存注入 header
        headerParams.set('shopId', Cookie.load('shopId')); //tobeplus 缓存注入 header
    headerParams.set('clientType', Cookie.load('clientType')); //tobeplus 缓存注入 header
        let formParams = new URLSearchParams();

        // verify required parameter 'oldPassword' is not null or undefined
        if (oldPassword === null || oldPassword === undefined) {
            throw new Error('Required parameter oldPassword was null or undefined when calling userChangePwdPost.');
        }
        // verify required parameter 'password' is not null or undefined
        if (password === null || password === undefined) {
            throw new Error('Required parameter password was null or undefined when calling userChangePwdPost.');
        }
        // verify required parameter 'rePassword' is not null or undefined
        if (rePassword === null || rePassword === undefined) {
            throw new Error('Required parameter rePassword was null or undefined when calling userChangePwdPost.');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams.append('oldPassword',oldPassword);
        formParams.append('password',password);
        formParams.append('rePassword',rePassword);
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 401||response.status === 403) {                     window.location.href = '/#/login-min';                     return undefined;                 } else if (response.status === 204) {
                    return undefined;
                } else {
                    if (response.json().meta&&response.json().meta.code === 401) {   alert('您离开时间过长,需要重新登录');                         window.location.href = '/#/login-min';                     return undefined;}                     return response.json();
                }
            });
    }

    /**
     * 用户登录
     * 用户通过手机号，密码，验证码登录车门店系统。返回结构的lastShopId是最近选中门店id, 登录之后要选中该门店
     * @param mobile 登录手机号
     * @param password 登录密码
     * @param code 验证码
     */
    public userLoginPost (mobile: string, password: string, code: string, extraHttpRequestParams?: any ) : Observable<models.UserResponse> {
        const path = this.basePath + '/user/login';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token')); //tobeplus 缓存注入 header
        headerParams.set('shopId', Cookie.load('shopId')); //tobeplus 缓存注入 header
    headerParams.set('clientType', Cookie.load('clientType')); //tobeplus 缓存注入 header

        let formParams = new URLSearchParams();

        // verify required parameter 'mobile' is not null or undefined
        if (mobile === null || mobile === undefined) {
            throw new Error('Required parameter mobile was null or undefined when calling userLoginPost.');
        }
        // verify required parameter 'password' is not null or undefined
        if (password === null || password === undefined) {
            throw new Error('Required parameter password was null or undefined when calling userLoginPost.');
        }
        // verify required parameter 'code' is not null or undefined
        if (code === null || code === undefined) {
            throw new Error('Required parameter code was null or undefined when calling userLoginPost.');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams.append('mobile',mobile);
        formParams.append('password',password);
        formParams.append('code',code);
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 401||response.status === 403) {                     window.location.href = '/#/login-min';                     return undefined;                 } else if (response.status === 204) {
                    return undefined;
                } else {
                    if (response.json().meta&&response.json().meta.code === 401) {   alert('您离开时间过长,需要重新登录');                         window.location.href = '/#/login-min';                     return undefined;}                     return response.json();
                }
            });
    }

    /**
     * 用户登录
     * 注销登出， 删除token缓存， 数据库token设置为null
     */
    public userLogoutPost (extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/user/logout';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token')); //tobeplus 缓存注入 header
        headerParams.set('shopId', Cookie.load('shopId')); //tobeplus 缓存注入 header
    headerParams.set('clientType', Cookie.load('clientType')); //tobeplus 缓存注入 header

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 401||response.status === 403) {                     window.location.href = '/#/login-min';                     return undefined;                 } else if (response.status === 204) {
                    return undefined;
                } else {
                    if (response.json().meta&&response.json().meta.code === 401) {   alert('您离开时间过长,需要重新登录');                         window.location.href = '/#/login-min';                     return undefined;}                     return response.json();
                }
            });
    }

    /**
     * 我的账户
     *
     * @param token 用户的登录凭证
     */
    public userMeGet (extraHttpRequestParams?: any ) : Observable<models.MyAcountResponse> {
        const path = this.basePath + '/user/me';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token')); //tobeplus 缓存注入 header
        headerParams.set('shopId', Cookie.load('shopId')); //tobeplus 缓存注入 header
    headerParams.set('clientType', Cookie.load('clientType')); //tobeplus 缓存注入 header

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 401||response.status === 403) {
                    window.location.href = '/#/login-min';
                    return undefined;
                } else if (response.status === 401||response.status === 403) {                     window.location.href = '/#/login-min';                     return undefined;                 } else if (response.status === 204) {
                    return undefined;
                } else {
                    if (response.json().meta&&response.json().meta.code === 401) {   alert('您离开时间过长,需要重新登录');                         window.location.href = '/#/login-min';                     return undefined;}                     return response.json();
                }
            });
    }

    /**
     * 发送找回密码验证码
     *
     * @param mobile 手机号
     * @param rnd 4位随机数， 客户端生成
     * @param sign 签名, md5(phone+rnd+salt)， 其中salt&#x3D;thzs0708， 不符合签名的请求一律返回错误
     */
    public userPasswordSmsPost (mobile: string, rnd: string, sign: string, extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/user/password/sms';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token')); //tobeplus 缓存注入 header
        headerParams.set('shopId', Cookie.load('shopId')); //tobeplus 缓存注入 header
    headerParams.set('clientType', Cookie.load('clientType')); //tobeplus 缓存注入 header

        let formParams = new URLSearchParams();

        // verify required parameter 'mobile' is not null or undefined
        if (mobile === null || mobile === undefined) {
            throw new Error('Required parameter mobile was null or undefined when calling userPasswordSmsPost.');
        }
        // verify required parameter 'rnd' is not null or undefined
        if (rnd === null || rnd === undefined) {
            throw new Error('Required parameter rnd was null or undefined when calling userPasswordSmsPost.');
        }
        // verify required parameter 'sign' is not null or undefined
        if (sign === null || sign === undefined) {
            throw new Error('Required parameter sign was null or undefined when calling userPasswordSmsPost.');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams.append('mobile',mobile);
        formParams.append('rnd',rnd);
        formParams.append('sign',sign);
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 401||response.status === 403) {                     window.location.href = '/#/login-min';                     return undefined;                 } else if (response.status === 204) {
                    return undefined;
                } else {
                    if (response.json().meta&&response.json().meta.code === 401) {   alert('您离开时间过长,需要重新登录');                         window.location.href = '/#/login-min';                     return undefined;}                     return response.json();
                }
            });
    }

    /**
     * 用户注册
     *
     * @param mobile 手机号
     * @param password 密码
     * @param code 手机验证码
     * @param captcha 图形验证码
     */
    public userRegisterPost (mobile: string, password: string, code: string, captcha: string, extraHttpRequestParams?: any ) : Observable<models.UserResponse> {
        const path = this.basePath + '/user/register';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token')); //tobeplus 缓存注入 header
        headerParams.set('shopId', Cookie.load('shopId')); //tobeplus 缓存注入 header
    headerParams.set('clientType', Cookie.load('clientType')); //tobeplus 缓存注入 header

        let formParams = new URLSearchParams();

        // verify required parameter 'mobile' is not null or undefined
        if (mobile === null || mobile === undefined) {
            throw new Error('Required parameter mobile was null or undefined when calling userRegisterPost.');
        }
        // verify required parameter 'password' is not null or undefined
        if (password === null || password === undefined) {
            throw new Error('Required parameter password was null or undefined when calling userRegisterPost.');
        }
        // verify required parameter 'code' is not null or undefined
        if (code === null || code === undefined) {
            throw new Error('Required parameter code was null or undefined when calling userRegisterPost.');
        }
        // verify required parameter 'captcha' is not null or undefined
        if (captcha === null || captcha === undefined) {
            throw new Error('Required parameter captcha was null or undefined when calling userRegisterPost.');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams.append('mobile',mobile);
        formParams.append('password',password);
        formParams.append('code',code);
        formParams.append('captcha',captcha);
        formParams.append('registerChannal', 1); // by tobeplus 临时状态.区分 PC:1 or H5:2
        
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 401||response.status === 403) {                     window.location.href = '/#/login-min';                     return undefined;                 } else if (response.status === 204) {
                    return undefined;
                } else {
                    if (response.json().meta&&response.json().meta.code === 401) {   alert('您离开时间过长,需要重新登录');                         window.location.href = '/#/login-min';                     return undefined;}                     return response.json();
                }
            });
    }

    /**
     * 发送注册验证码， 注册验证码只能用在注册，后端放入reids，设置timeout，做单限制/单ip发送次数?
     *
     * @param mobile 手机号
     * @param rnd 4位随机数， 客户端生成
     * @param sign 签名, md5(phone+rnd+salt)， 其中salt&#x3D;thzs0708, 不符合签名的请求一律返回错误
     */
    public userRegisterSmsPost (mobile: string, rnd: string, sign: string, extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/user/register/sms';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token')); //tobeplus 缓存注入 header
        headerParams.set('shopId', Cookie.load('shopId')); //tobeplus 缓存注入 header
    headerParams.set('clientType', Cookie.load('clientType')); //tobeplus 缓存注入 header

        let formParams = new URLSearchParams();

        // verify required parameter 'mobile' is not null or undefined
        if (mobile === null || mobile === undefined) {
            throw new Error('Required parameter mobile was null or undefined when calling userRegisterSmsPost.');
        }
        // verify required parameter 'rnd' is not null or undefined
        if (rnd === null || rnd === undefined) {
            throw new Error('Required parameter rnd was null or undefined when calling userRegisterSmsPost.');
        }
        // verify required parameter 'sign' is not null or undefined
        if (sign === null || sign === undefined) {
            throw new Error('Required parameter sign was null or undefined when calling userRegisterSmsPost.');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams.append('mobile',mobile);
        formParams.append('rnd',rnd);
        formParams.append('sign',sign);
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 401||response.status === 403) {                     window.location.href = '/#/login-min';                     return undefined;                 } else if (response.status === 204) {
                    return undefined;
                } else {
                    if (response.json().meta&&response.json().meta.code === 401) {   alert('您离开时间过长,需要重新登录');                         window.location.href = '/#/login-min';                     return undefined;}                     return response.json();
                }
            });
    }

    /**
     * 切换门店时候调用该方法， 服务端保存用户选择的门店，下次登录默认显示该门店
     *
     * @param shopId 手机号
     */
    public userShopCurrentPost (shopId: string, extraHttpRequestParams?: any ) : Observable<models.CommonResponse> {
        const path = this.basePath + '/user/shop/current';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token')); //tobeplus 缓存注入 header
        headerParams.set('shopId', Cookie.load('shopId')); //tobeplus 缓存注入 header
    headerParams.set('clientType', Cookie.load('clientType')); //tobeplus 缓存注入 header

        let formParams = new URLSearchParams();

        // verify required parameter 'shopId' is not null or undefined
        if (shopId === null || shopId === undefined) {
            throw new Error('Required parameter shopId was null or undefined when calling userShopCurrentPost.');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams.append('shopId',shopId);
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 401||response.status === 403) {                     window.location.href = '/#/login-min';                     return undefined;                 } else if (response.status === 204) {
                    return undefined;
                } else {
                    if (response.json().meta&&response.json().meta.code === 401) {   alert('您离开时间过长,需要重新登录');                         window.location.href = '/#/login-min';                     return undefined;}                     return response.json();
                }
            });
    }

    /**
     * 不用登录系统, 通过手机验证码验明身份后修改密码。 通过凭证去修改密码， 服务端要验证凭证可靠性，和手机号关联, 5分钟timeout
     *
     * @param password 密码
     * @param rePassword 确认密码
     * @param sign /common/code/verify返回的sign
     */
    public userUpdatePwdPost (password: string, rePassword: string, sign: string, extraHttpRequestParams?: any ) : Observable<models.UserResponse> {
        const path = this.basePath + '/user/updatePwd';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        headerParams.set('token', Cookie.load('token')); //tobeplus 缓存注入 header
        headerParams.set('shopId', Cookie.load('shopId')); //tobeplus 缓存注入 header
    headerParams.set('clientType', Cookie.load('clientType')); //tobeplus 缓存注入 header

        let formParams = new URLSearchParams();

        // verify required parameter 'password' is not null or undefined
        if (password === null || password === undefined) {
            throw new Error('Required parameter password was null or undefined when calling userUpdatePwdPost.');
        }
        // verify required parameter 'rePassword' is not null or undefined
        if (rePassword === null || rePassword === undefined) {
            throw new Error('Required parameter rePassword was null or undefined when calling userUpdatePwdPost.');
        }
        // verify required parameter 'sign' is not null or undefined
        if (sign === null || sign === undefined) {
            throw new Error('Required parameter sign was null or undefined when calling userUpdatePwdPost.');
        }
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        formParams.append('password',password);
        formParams.append('rePassword',rePassword);
        formParams.append('sign',sign);
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formParams.toString();

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 401||response.status === 403) {                     window.location.href = '/#/login-min';                     return undefined;                 } else if (response.status === 204) {
                    return undefined;
                } else {
                    if (response.json().meta&&response.json().meta.code === 401) {   alert('您离开时间过长,需要重新登录');                         window.location.href = '/#/login-min';                     return undefined;}                     return response.json();
                }
            });
    }

}
