document.addEventListener("readystatechange",function(){
	if(document.readyState === "complete"){
		var audio=document.querySelector('audio');
		var playpausebtn=document.querySelector('#btn');
		var vol=document.querySelector("#vol");
		var volPosition=document.querySelector("#vol-position");
		var mute=document.querySelector("#mute");
		var state=document.querySelector("#state");
		var statePosition=document.querySelector("#state-position");
		var tips=document.querySelector("#tips");
		var next=document.querySelector("#next");
		var next_bt=document.querySelector(".next_bt");
		var prev_bt=document.querySelector(".prev_bt");
		var cycle_single_bt=document.querySelector(".cycle_single_bt");
		var cycle_bt=document.querySelector(".cycle_bt");
		var ordered_bt=document.querySelector(".ordered_bt");
		var unordered_bt=document.querySelector(".unordered_bt");
		var album_pic=document.querySelector(".album_pic");
		var music_op=document.querySelector(".music_op");
        var mli=divsonglist.firstElementChild.children;
        var player_bar=document.querySelector(".player_bar");
        var time_shows=document.querySelector(".time_show");
		//Music data
		var music=[
		{name:"When We Were Young",src:"./music_data/001.mp3",person:"Adele",duration:"5:42",imgsrc:"./image/1.jpg"},
		{name:"As Long As You Love Me",src:"./music_data/002.mp3",person:"Backstreet Boys",duration:"3:42",imgsrc:"./image/2.jpg"},
		{name:"What Do You Mean",src:"./music_data/003.mp3",person:"Justin Bieber",duration:"3:27",imgsrc:"./image/3.jpg"},
		{name:"Sugar",src:"./music_data./004.mp3",person:"Maroon 5",duration:"3:55",imgsrc:"./image/1.jpg"},
		{name:"Wrecking Ball",src:"./music_data/005.mp3",person:"Miley Cyrus",duration:"3:41",imgsrc:"./image/2.jpg"},
		{name:"Coming Home",src:"./music_data/006.mp3",person:"Skylar Grey",duration:"3:59",imgsrc:"./image/3.jpg"},
		{name:"Billionaire",src:"./music_data/007.mp3",person:"Travie McCoy",duration:"3:30",imgsrc:"./image/1.jpg"},
		{name:"Mylove",src:"./music_data/008.mp3",person:"WestLife",duration:"3:30",imgsrc:"./image/1.jpg"}
		];
		var number;
		var PLAYWAY=4;
		var creatList=function(){
			var lis="";
			for(var i=0;i<music.length;i++){
				lis+='<li data-src="'+music[i].src+'" class="aa"><strong class="music_name">'+music[i].name+'</strong><strong class="singer_name">'+music[i].person+'</strong><strong class="play_time">'+music[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_0038RM350w8m1V" mid="0038RM350w8m1V"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></li>';
			 } 
			divsonglist.firstElementChild.innerHTML=lis;
			document.querySelector(".music_num").innerHTML=music.length;
            for(var i=0;i<mli.length;i++){
                mli[i].index=i;
                mli[i].onclick=function(e){
                    audio.src=this.getAttribute("data-src");
                    console.log(audio.src);
                    audio.play();
                    number=this.index;
                    document.querySelector(".music_op").style.display="block";
                    onsongchange();
                }
                mli[i].onmouseover=function(){
                    this.classList.add("play_hover");
                }
                mli[i].onmouseout=function(){
                    this.classList.remove("play_hover");
                }
            }
            //删除单曲
            var del=document.querySelectorAll(".btn_del");
            for(var i=0;i<del.length;i++){
                del[i].index=i;
                del[i].onclick=function(e){
                    e.stopPropagation();
                        var newarr=[];
                        for(var i=0;i<music.length;i++){
                            if(i!=this.index){
                                newarr.push(music[i]);
                            }
                        }
                    music=newarr;
                    if(this.index>number){
                        creatList();
                        onsongchange();
                    }
                    if(this.index==number){
                        //this.index==music.length这个判断条件为什么length不减一？
                        if(this.index==music.length){
                            creatList();
                            uireset();
                        }else{
                            audio.src=music[number].src;
                            audio.play();
                            creatList();
                            onsongchange();
                        } 
                    }
                    if(this.index<number){
                        creatList();
                        number-=1;
                        onsongchange();
                    }
                }
            }
		}
		creatList();
		var onsongchange=function(){
			for(var i=0;i<mli.length;i++){
				mli[i].className="";
			}
			mli[number].className="play_current";
			document.querySelector(".music-name").innerHTML=music[number].name;
			document.querySelector(".singer_name").innerHTML=music[number].person;
			document.querySelector("#ptime").innerHTML=music[number].duration;
			album_pic.firstElementChild.src=music[number].imgsrc;
		}
        
		//播放、暂停按钮
		btnplay.onclick=function(){
			if(audio.paused){
				audio.play();
			}else{
				audio.pause();
			}
		}
		//改变播放按钮样式（事件驱动型）
		audio.onplay=function()
		{
			btnplay.className="pause_bt";
		}
		audio.onpause=function()
		{
			btnplay.className="play_bt";
		}
		//调节音量
		spanvolume.onclick=function(e)
		{
			var ev=e||window.event;
			audio.volume=ev.offsetX/spanvolume.offsetWidth;
		}
        //音量拖动
        spanvolumeop.onmousedown = function(e) {
            e.preventDefault();
            document.onmousemove = function(e) {
                var v = (e.clientX - spanvolume.getBoundingClientRect().left) / spanvolume.offsetWidth;
                if (v >= 0 && v <= 1) {
                    audio.volume = v;
                }
            }
            document.onmouseup = function() {
                document.onmousemove = null ;
                document.onmouseup = null ;
            }
        }
        spanvolumeop.onclick = function(e) {
            e.stopPropagation();
        }
        ; 
		//音量改变事件
		audio.onvolumechange=function()
		{
			spanvolumeop.style.left=audio.volume*100+"%";
			spanvolumebar.style.width=audio.volume*100+"%";
			if(audio.volume==0){
			   spanmute.className="volume_mute";
			}
			else{
				spanmute.className="volume_icon";
			}
		}
		//调节原点点击不产生任何操作
		spanvolumeop.onclick=function(e){
			var ev=e||window.event;
			ev.stopPropagation();
			return false;
		}
		//闭包封锁全局变量
		spanmute.onclick=(function(){
			var oldVolume;
			return function(){
				if(audio.volume !==0){
					oldVolume=audio.volume;
					audio.volume=0;
				}
				else{
					audio.volume=oldVolume;
				}
			}
		})();
		//播放进度
		audio.ontimeupdate=function(){
			var rate=this.currentTime/this.duration;
			spanprogress_op.style.left=rate*100+"%";
			spanplaybar.style.width=rate*100+1+"%";
			if(audio.ended){
				if(PLAYWAY=="1"){
					if(number==music.length-1){return;}
					nextsong();
				}else if(PLAYWAY=="2"){
					randomsong();
				}else if(PLAYWAY=="3"){
					audio.play();
				}else if(PLAYWAY=="4"){
					nextsong();
				}
			}
		}
		spanplayer_bgbar.onclick=function(ev){
			var ev=ev||window.event;
			var rate=(ev.offsetX-spanprogress_op.offsetWidth/2)/spanplayer_bgbar.offsetWidth;
			spanprogress_op.style.left=rate*100+"%";
			audio.currentTime=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
		}
		spanprogress_op.onclick=function(ev){
			var ev=ev||window.event;
			ev.stopPropagation();
			return false;
		}
		spanplaybar.onclick=function(ev){
			var ev=ev||window.event;
			var rate=(ev.offsetX-spanprogress_op.offsetWidth/2)/spanplayer_bgbar.offsetWidth;
			spanprogress_op.style.left=rate*100+"%";
			audio.currentTime=ev.offsetX/spanplayer_bgbar.offsetWidth*audio.duration;
		}
        //拖动设置播放时间
        spanprogress_op.onmousedown = function(e) {
            e.preventDefault();
            audio.pause();
            document.onmousemove = function(e) {
                var t = e.clientX / spanplayer_bgbar.offsetWidth;
                if (t >= 0 && t <= 1) {
                    audio.currentTime = audio.duration * t;
                }
            }
            document.onmouseup = function() {
                audio.play();
                document.onmousemove = null ;
                document.onmouseup = null ;
            }
        }
        //划上进度条显示时间
        //时间转换函数
        var times=function(time){
        	if(isNaN(time)){return '--:--';}
            var fen=parseInt(time/60);
            var miao=parseInt(time%60);
            fen=(fen<10)?("0"+fen):fen;
            miao=(miao<10)?("0"+miao):miao;
            return fen+":"+miao;
        }
        spanplayer_bgbar.parentElement.onmouseover=function(e){
            time_shows.style.display="block";
            var l=e.offsetX-(time_shows.offsetWidth/2);
            time_shows.style.left=l+"px";
            var time=e.offsetX/this.offsetWidth*audio.duration;
            time_show.innerHTML=times(time); 
        }
        spanplayer_bgbar.parentElement.onmouseout=function(){
            time_shows.style.display="none";
        }
        spanplayer_bgbar.parentElement.onmousemove=function(e){
            var ll=e.clientX-(time_shows.offsetWidth/2);
            time_shows.style.left=ll+"px";
            var time=e.clientX/this.offsetWidth*audio.duration;
            time_show.innerHTML=times(time); 
        }
        
		//下一曲
		var nextsong=function(){
			if(number===undefined){return;}
            if(PLAYWAY=="2"){
                var num;
                do{
                    num=Math.floor(Math.random()*music.length);
                }while(num==number);
                number=num;
                audio.src=music[number].src;
                audio.play();
                onsongchange();
            }else{
                number+=1;
                number=number>=music.length?0:number;
                audio.src=music[number].src;
                audio.play();
                onsongchange();
            }
		}
		var presong=function(){
			if(number===undefined){return;}
            if(PLAYWAY=="2"){
                var num;
                do{
                    num=Math.floor(Math.random()*music.length);
                }while(num==number);
                number=num;
                audio.src=music[number].src;
                audio.play();
                onsongchange();
            }else{
                number-=1;
                number=number<0?music.length-1:number;
                audio.src=music[number].src;
                audio.play();
                onsongchange();
            }
		}
		var randomsong=function(){
			if(number===undefined){return;}
			var num;
			do{
				num=Math.floor(Math.random()*music.length);
			}while(num==number);
			number=num;
			audio.src=music[number].src;
			audio.play();
			onsongchange();
		}
		next_bt.onclick=function(){
			nextsong();
		}
		prev_bt.onclick=function(){
			presong();
		}
		btnPlayway.onclick=function(){
			divselect.style.display="block";
		}
		//展开播放列表
		setbofangmoshi=function(num){
			divselect.style.display="none";
			PLAYWAY=num;
			var data={
				1:"ordered_bt",//顺序播放
				2:"unordered_bt",//随机播放
				3:"cycle_single_bt",//单曲循环
				4:"cycle_bt"//列表循环
			}
			btnPlayway.className=data[num];
		}
		//行内样式用getAttribute获取不到，直接写style.属性名就可以了
		spansongnum1.onclick=function(){
			if(divplayframe.style.opacity==0){
				divplayframe.style.opacity=1;
			}
			else{
				divplayframe.style.opacity=0; 
			}	
		}
		btnclose.onclick=function(){
			divplayframe.style.display="none";
		}
		//清空列表
		clear_list.onclick=function(){
			music="";
			creatList();
			uireset();
		}
		//重置样式
		var uireset=function(){
			document.querySelector(".music-name").innerHTML="听我想听的歌！";
			document.querySelector(".singer_name").innerHTML="QQ音乐";
			document.querySelector(".play_date").innerHTML="";
			document.querySelector(".music_op").style.display="none";
			document.querySelector(".album_pic").firstElementChild.src="./image/cover_mine_130.jpg";
			audio.src="";
			spanprogress_op.style.left=0+"%";
			spanplaybar.style.width=0+"%";
		}
		//点击展开或隐藏音乐播放空间
		btnfold.onclick=function(){
			var lefts=this.getBoundingClientRect().left;
			if(lefts>0){
				divplayer.style.left=-lefts+"px";
				divplayer.classList.add("m_player_folded");
			}else{
				divplayer.style.left=0;
				divplayer.classList.remove("m_player_folded");
			}
			
		}
	}
})