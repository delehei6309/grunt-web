/*!grunt_test-1.0.0.js 18-02-08*/

"use strict";!function(){var e=new pagination.ItemPaginator({prelink:"/",current:3,rowsPerPage:200,totalResult:10020}),r=e.render();r+=(e=pagination.create("search",{prelink:"/",current:1,rowsPerPage:200,totalResult:10020})).render(),document.getElementById("paging").innerHTML=r}();