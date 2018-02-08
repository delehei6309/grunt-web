class pagination {
    //构造函数
    constructor({el,totalRows,pageSize,pageNo,prevText,nextText,viewCount,align,pageChange}){
        this.el = el;
        this.totalRows = totalRows || 0;
        this.pageSize = pageSize || 10;
        this.pageNo = pageNo || 1;
        this.viewCount = viewCount || 5;
        this.querySelect = document.querySelector(el);
        
        this.prevText = (prevText || '«');
        this.nextText = (nextText || '»');
        this.pageChange = pageChange || null;

        this.align = align || null;

        this.pageLength = Math.ceil(this.totalRows/this.pageSize);
        this.start();
        //创建样式
        this.creatStyle();
    }
    start(){
        this.pageNo>this.pageLength ? this.pageNo = this.pageLength : null;


        this.dealPageNo();
    }
    //创建样式
    creatStyle(){
        let style = '[flex]{display:-webkit-box;display:-ms-flexbox;display:flex}[flex]>*{display:block}[flex]>[flex]{display:-webkit-box;display:-ms-flexbox;display:flex}[flex~="dir:left"]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}[flex~="dir:right"]{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;-webkit-box-pack:end}[flex~="dir:top"]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}[flex~="dir:bottom"]{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-webkit-box-pack:end}[flex~="main:left"]{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}[flex~="main:right"]{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}[flex~="main:justify"]{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}[flex~="main:center"]{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}[flex~="cross:top"]{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start}[flex~="cross:bottom"]{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end}[flex~="cross:center"]{-webkit-box-align:center;-ms-flex-align:center;align-items:center}[flex~="cross:baseline"]{-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline}[flex~="cross:stretch"]{-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}[flex~="box:first"]>*,[flex~="box:justify"]>*,[flex~="box:last"]>*,[flex~="box:mean"]>*{width:0;height:auto;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}[flex~="box:first"]>:first-child,[flex~="box:justify"]>:first-child,[flex~="box:justify"]>:last-child,[flex~="box:last"]>:last-child{width:auto;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0}[flex~="dir:bottom"][flex~="box:first"]>*,[flex~="dir:bottom"][flex~="box:justify"]>*,[flex~="dir:bottom"][flex~="box:last"]>*,[flex~="dir:bottom"][flex~="box:mean"]>*,[flex~="dir:top"][flex~="box:first"]>*,[flex~="dir:top"][flex~="box:justify"]>*,[flex~="dir:top"][flex~="box:last"]>*,[flex~="dir:top"][flex~="box:mean"]>*{width:auto;height:0;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}[flex~="dir:bottom"][flex~="box:first"]>:first-child,[flex~="dir:bottom"][flex~="box:justify"]>:first-child [flex~="dir:bottom"][flex~="box:justify"]>:last-child,[flex~="dir:bottom"][flex~="box:last"]>:last-child,[flex~="dir:top"][flex~="box:first"]>:first-child,[flex~="dir:top"][flex~="box:justify"]>:first-child,[flex~="dir:top"][flex~="box:justify"]>:last-child,[flex~="dir:top"][flex~="box:last"]>:last-child{height:auto;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0}[flex-box="0"]{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0}[flex-box="1"]{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:1;flex-shrink:1}[flex-box="2"]{-webkit-box-flex:2;-ms-flex-positive:2;flex-grow:2;-ms-flex-negative:2;flex-shrink:2}[flex-box="3"]{-webkit-box-flex:3;-ms-flex-positive:3;flex-grow:3;-ms-flex-negative:3;flex-shrink:3}[flex-box="4"]{-webkit-box-flex:4;-ms-flex-positive:4;flex-grow:4;-ms-flex-negative:4;flex-shrink:4}[flex-box="5"]{-webkit-box-flex:5;-ms-flex-positive:5;flex-grow:5;-ms-flex-negative:5;flex-shrink:5}[flex-box="6"]{-webkit-box-flex:6;-ms-flex-positive:6;flex-grow:6;-ms-flex-negative:6;flex-shrink:6}[flex-box="7"]{-webkit-box-flex:7;-ms-flex-positive:7;flex-grow:7;-ms-flex-negative:7;flex-shrink:7}[flex-box="8"]{-webkit-box-flex:8;-ms-flex-positive:8;flex-grow:8;-ms-flex-negative:8;flex-shrink:8}[flex-box="9"]{-webkit-box-flex:9;-ms-flex-positive:9;flex-grow:9;-ms-flex-negative:9;flex-shrink:9}[flex-box="10"]{-webkit-box-flex:10;-ms-flex-positive:10;flex-grow:10;-ms-flex-negative:10;flex-shrink:10}#pagination .page a,#pagination .page span{display:inline-block;padding:8px 12px;padding:.5rem .75rem;line-height:1.25;border:1px solid #dee2e6;cursor:pointer;color:#007bff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#pagination .page a:not(.page-item-active):hover,#pagination .page span:not(.page-item-active):hover{background-color:#dee2e6}#pagination .page .page-item-active{color:#fff;background-color:#007bff;border-color:#007bff;cursor:default}';
        let styleDom = document.createElement('style');
        console.log(styleDom);
        styleDom.innerHTML = style;
        document.querySelector('head').appendChild(styleDom);
    }
    /*get init(){
        return this.creatDom();
    }*/
    //Mothed
    //处理pageNo
    dealPageNo(){
        this.pageNoArray = [];
        let nob = parseInt(this.viewCount/2);
        let nob0 = this.pageNo;
        if(this.pageLength <= this.viewCount){
            nob0 = 1;
            for(let i=0;i<this.pageLength;i++){
                this.pageNoArray.push(nob0++);
            }
        }
        if(this.pageLength-this.viewCount === 1){
            if(this.pageNo>=Math.ceil(this.viewCount/2)){
                nob0 = 2;
                for(let i=0;i<this.viewCount;i++){
                    if(i===0){
                        this.pageNoArray.push('…');
                    }else{
                        this.pageNoArray.push(nob0);
                    }
                    nob0++; 
                }
            }else{
                nob0 = 1;
                for(let i=0;i<this.viewCount;i++){
                    if(i===(this.viewCount-1)){
                        this.pageNoArray.push('…');
                    }else{
                        this.pageNoArray.push(nob0);
                    }
                    nob0++; 
                }
            }
        }
        if(this.pageLength-this.viewCount >= 2){

            if(this.pageNo <= Math.ceil(this.viewCount/2)){
                nob0 = 1;
                for(let i=0;i<this.viewCount;i++){
                    if(i===(this.viewCount-1)){
                        this.pageNoArray.push('…');
                    }else{
                        this.pageNoArray.push(nob0);
                    }
                    nob0++;
                    
                }
            }else if(this.pageNo > (this.pageLength-Math.ceil(this.viewCount/2))){
                nob0 = this.pageLength-(this.viewCount-1);
                for(let i=0;i<this.viewCount;i++){
                    if(i===0){
                        this.pageNoArray.push('…');
                    }else{
                        this.pageNoArray.push(nob0);
                    }
                    nob0++;
                    
                }
            }else{
                nob0 -= nob;
                for(let i=0;i<this.viewCount;i++){
                    
                    if(i===0 || i===(this.viewCount-1)){
                        this.pageNoArray.push('…');
                    }else{
                        this.pageNoArray.push(nob0);
                    }
                    nob0++;
                    
                }
            }
            
        }
        
        this.creatDom();
    }
    //creatDom
    creatDom(){
        //console.log(this.querySelect.querySelector('.page'));
        let pageWrap = document.createElement('div');
        if(this.align){
            this.querySelect.setAttribute('flex',`main:${this.align}`);
        }
        pageWrap.setAttribute('class','page');
        let perBtn = document.createElement('span');
        perBtn.setAttribute('class','btn-prev page-item');
        perBtn.innerText = this.prevText;
        pageWrap.appendChild(perBtn);
        
        let a = null;
        
        this.pageNoArray.map(el=>{
            a = document.createElement('a');
            if(this.pageNo.toString() === (el).toString()){
                a.setAttribute('class','page-item page-item-active');
            }else{
                a.setAttribute('class','page-item');
            }
            a.innerText = (el);
            
            pageWrap.appendChild(a);
        });


        let nextBtn = document.createElement('span');
        nextBtn.setAttribute('class','btn-next page-item');
        nextBtn.innerText = this.nextText;
        pageWrap.appendChild(nextBtn);
        //清空
        this.querySelect.innerHTML = '';
        this.querySelect.appendChild(pageWrap);
        //添加事件
        let that = this;
        this.querySelect.querySelectorAll('.page-item').forEach(el=>{
            el.onclick = function(){
                if(this.className.indexOf('prev')>-1){
                    that.prevClick();
                }else if(this.className.indexOf('next')>-1){
                    that.nextClick();
                }else{
                    that.btnClick(this.innerText);
                }
            };
        });
        this.callBack();
    }
    //active-class
    btnClick(num){
        if((num === '…') || (this.pageNo.toString() === num.toString())){
            return false;
        }
        this.pageNo = num;
        this.dealPageNo();
    }
    prevClick(){
        if(this.pageNo > 1){
            this.pageNo -- ;
            this.dealPageNo();
        }
    }
    nextClick(){
        if(this.pageNo < this.pageLength){
            this.pageNo ++ ;
            this.dealPageNo();

        }
    }
    //changeClass
    callBack(){
        
        if(this.pageChange){
            this.pageChange(Number(this.pageNo));
        }
    }
    //update
    update({pageNo}){
        this.pageNo = pageNo;
        this.start();
    }
}