module.exports =  {
    ajaxBase: function (url, type, async, data, callback) {
        data = data || {};

        $.ajax({
            url: url,
            type: type,
            data: data,
            cache: false,
            async: async,
            success: function (result) {
                callback && callback(result);
            },
            error: function (result) {
                console.log(result);
                var message = "", httpStatus = result.status, httpResponse = result.responseText;
                try{
                    httpResponse = JSON.parse(httpResponse);
                }catch(ex){
                    httpResponse = { message: httpResponse };
                }

                if (httpStatus >= 400 && httpStatus < 500) {
                    if(httpStatus === 401) {
                        return location.href = 'login.html';
                    } else if(httpStatus === 403){
                        message = httpResponse.message || '您没有操作权限';
                    } else if(httpStatus === 404){
                        message = httpResponse.message || '请求的路由不存在';
                    } else {
                        message = httpResponse.message;
                    }
                } else if (httpStatus >= 500) {
                    message = httpResponse.message || '网络异常,请重试';
                } else {
                    message = httpResponse.message;
                }
                
                callback && callback({
                    "status": "error",
                    "message": message,
                    "httpStatus": httpStatus,
                    "httpResponse": httpResponse.message
                });
                console.error(httpResponse);
            }
        });
    },

    ajaxGet: function (url, data, callback) {
        if(typeof data === 'function'){
            callback = data;
            data = null;
        }
        this.ajaxBase(url, 'get', true, data, callback);
    },

    ajaxGetSync: function (url, data, callback) {
        if(typeof data === 'function'){
            callback = data;
            data = null;
        }
        this.ajaxBase(url, 'get', false, data, callback);
    },

    ajaxPost: function (url, data, callback) {
        if(typeof data === 'function'){
            callback = data;
            data = null;
        }
        this.ajaxBase(url, 'post', true, data, callback);
    },

    ajaxPostSync: function (url, data, callback) {
        if(typeof data === 'function'){
            callback = data;
            data = null;
        }
        this.ajaxBase(url, 'post', false, data, callback);
    },

    searchRoles: function(callback){//查询角色
        this.ajaxGet('/api/dictionary/role',{}, function(result){
            if(result.status === 'success'){
                callback(result.data);
            }
        })
    },

    searchProvince: function(callback){//查询省份+城市
        this.ajaxGet('/api/dictionary/province',{}, function(result){
            if(result.status === 'success'){
                callback(result.data);
            }
        })
    },

    searchCity: function(callback){//查询城市
        this.ajaxGet('/api/dictionary/city',{}, function(result){
            if(result.status === 'success'){
                callback(result.data);
            }
        })
    },

    searchProjectCategory: function(callback){//查询项目类别
        this.ajaxGet('/api/dictionary/projectCategory',{},function(result){
            if(result.status === 'success'){
                callback && callback(result.data)
            }
        })
    },

    searchTaskCategory: function(callback){//查询任务类别
        this.ajaxGet('/api/dictionary/taskCategory',{},function(result){
            if(result.status === 'success'){
                callback && callback(result.data)
            }
        })
    },

    searchProjectStatus: function(callback){//查询项目状态
        var projectStatus = [
            {
                statusId: false,
                statusName: '未结束'
            },
            {
                statusId: true,
                statusName: '已结束'
            }
        ];
        callback && callback(projectStatus);
    },

    role: {//角色枚举
        Manager: 1,//项目经理
        Webmaster: 2,//站长
        Performer: 3,//执行
        Admin: 4//管理员
    },

    menuList: [//菜单
        { "menuId": 1, "menuOrder": 1, "menuName": "用户列表", "menuUri": "/userlist.html", "checkUri":["/createuser.html"], "className": "userlist", "children": null },
        { "menuId": 2, "menuOrder": 2, "menuName": "我的项目", "menuUri": "/projectlist.html", "checkUri":["/createproject.html"], "className": "projectlist", "children": null },
        { "menuId": 3, "menuOrder": 3, "menuName": "我的任务", "menuUri": "/tasklist.html", "checkUri":["/createtask.html"], "className": "tasklist", "children": null }
    ],

    setUser: function(user){//保存登陆的用户信息
        if(typeof user == 'object'){
            user = JSON.stringify(user);
        }
        localStorage.setItem('user', user);
    },

    getUser: function(){//获取登陆的用户信息
        let user = localStorage.getItem('user');
        if(user){
            user = JSON.parse(user);
        }
        return user;
    },

    isLogined: function(){//验证是否登陆了
        let user = localStorage.getItem('user');
        if(!user){
            sessionStorage.setItem('url_after_login', location.href);
            return false;
        }
        return true
    },

    gotoLoginPage: function(){//跳转到登陆页
        location.href = '/login.html';
    },

    afterLogin: function(userdata){//登陆之后
        let _ = this;
        let url_after_login = sessionStorage.getItem('url_after_login');

        let roleIds = userdata.roles.map(item =>{
            return item.roleId
        });
        userdata.roleIds = roleIds;
        localStorage.setItem('user', JSON.stringify(userdata))

        if(url_after_login){
            location.href = url_after_login;
        }else{
            //根据角色跳转
            if(roleIds.indexOf(_.role.Admin) != -1){
                location.href = '/userlist.html';
            } else if(roleIds.indexOf(_.role.Manager) != -1){
                location.href = '/projectlist.html';
            }else if(roleIds.indexOf( _.role.Webmaster) != -1){
                location.href = '/tasklist.html';
            }else if(roleIds.indexOf(_.role.Performer) != -1){
                location.href = '/tasklist.html';
            }
        }
    },

    afterLogout(){//退出登陆后
        localStorage.removeItem('user');
        sessionStorage.removeItem('url_after_login');
        location.href = '/login.html';
    }
}