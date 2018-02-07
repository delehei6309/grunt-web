(()=>{
    /*axios.post('http://koa-dev.zj-hf.cn:3000/login', {
        mobile: 'admin',
        password: '123456'
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });*/
    var paginator = new pagination.ItemPaginator({prelink:'/', current: 3, rowsPerPage: 200, totalResult: 10020});
    var html = paginator.render();
    paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
    html += paginator.render();
    document.getElementById("paging").innerHTML = html;
})();