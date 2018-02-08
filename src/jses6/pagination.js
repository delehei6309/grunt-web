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
        
    }
    start(){
        this.pageNo>this.pageLength ? this.pageNo = this.pageLength : null;


        this.dealPageNo();
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