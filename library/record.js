let press;
var wave;
var rec;
let mybtn = document.querySelector("#btn")
let imgBx = document.querySelector("#substitudeBx")
let loadingHTML = '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
let verifyHTML = '<strong>声纹识别</strong>'
let verifySuccess = '<strong>识别成功</strong>'
let verifyFail = '<strong>识别失败</strong>'
let mode = 1
let usrname = '俸福睿'
let greeting1 = '<strong class="txt">' 
let greeting2 = ' 同学 <br>欢迎进入图书馆学习</strong>'
mybtn.addEventListener("mousedown", pressingDown, false);
mybtn.addEventListener("mouseup", notPressingDown, false);
mybtn.addEventListener("touchstart", pressingDown, false);
mybtn.addEventListener("touchend", notPressingDown, false);
function pressingDown(e) {
    press = true;
    recStart();
    // e.preventDefault();
}
function notPressingDown(e) {
    press = false;
    recStop();
    recOpen();
    mybtn.innerHTML = loadingHTML
    setTimeout(function(){
        if(mode){
            mybtn.innerHTML=verifySuccess
            imgBx.innerHTML=greeting1 + usrname + greeting2
        }
        else{
            mybtn.innerHTML=verifyFail
            setTimeout(function () { 
                alert("识别失败，请重试") 
                location.reload()
            }, 200)
        }
    },3000);
}

function endOfRecord() { 
    alert("识别成功")
}

var recOpen = function (success) {//一般在显示出录音按钮或相关的录音界面时进行此方法调用，后面用户点击开始录音时就能畅通无阻了
    rec = Recorder({
        type: "mp3", sampleRate: 16000, bitRate: 16 //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
        , onProcess: function (buffers, powerLevel, bufferDuration, bufferSampleRate, newBufferIdx, asyncEnd) {
            //录音实时回调，大约1秒调用12次本回调
            //可利用extensions/waveview.js扩展实时绘制波形
            //可利用extensions/sonic.js扩展实时变速变调，此扩展计算量巨大，onProcess需要返回true开启异步模式
            wave.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate);//输入音频数据，更新显示波形
        }
    });

    //var dialog=createDelayDialog(); 我们可以选择性的弹一个对话框：为了防止移动端浏览器存在第三种情况：用户忽略，并且（或者国产系统UC系）浏览器没有任何回调，此处demo省略了弹窗的代码
    rec.open(function () {//打开麦克风授权获得相关资源
        //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
        //rec.start() 此处可以立即开始录音，但不建议这样编写，因为open是一个延迟漫长的操作，通过两次用户操作来分别调用open和start是推荐的最佳流程

        success && success();
    }, function (msg, isUserNotAllow) {//用户拒绝未授权或不支持
        //dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
        console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
    });
};

function recStart() {//打开了录音后才能进行start、stop调用
    set = {
        elem: "#btn" //自动显示到dom，并以此dom大小为显示大小
        //或者配置显示大小，手动把waveviewObj.elem显示到别的地方
        // , width: 0 //显示宽度
        // , height: 0 //显示高度

        //以上配置二选一

        , scale: 2 //缩放系数，应为正整数，使用2(3? no!)倍宽高进行绘制，避免移动端绘制模糊
        , speed: 8 //移动速度系数，越大越快

        , lineWidth: 3 //线条基础粗细

        //渐变色配置：[位置，css颜色，...] 位置: 取值0.0-1.0之间
        , linear1: [0, "rgba(150,96,238,1)", 0.2, "rgba(170,79,249,1)", 1, "rgba(53,199,253,1)"] //线条渐变色1，从左到右
        , linear2: [0, "rgba(209,130,255,0.6)", 1, "rgba(53,199,255,0.6)"] //线条渐变色2，从左到右
        , linearBg: [0, "rgba(255,255,255,0.2)", 1, "rgba(54,197,252,0.2)"] //背景渐变色，从上到下
    }

    wave = Recorder.WaveView(set);
    rec.start();
};

/**结束录音**/
function recStop() {
    rec.stop(function (blob, duration) {
        console.log(blob, (window.URL || webkitURL).createObjectURL(blob), "时长:" + duration + "ms");
        rec.close();//释放录音资源，当然可以不释放，后面可以连续调用start；但不释放时系统或浏览器会一直提示在录音，最佳操作是录完就close掉
        rec = null;
        recOpen();
        //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传

        /*** 【立即播放例子】 ***/
        // var audio = document.createElement("audio");
        // audio.controls = true;
        // document.body.appendChild(audio);
        //简单利用URL生成播放地址，注意不用了时需要revokeObjectURL，否则霸占内存
        audio.src = (window.URL || webkitURL).createObjectURL(blob);
        audio.play();
    }, function (msg) {
        console.log("录音失败:" + msg);
        rec.close();//可以通过stop方法的第3个参数来自动调用close
        rec = null;
    });
};

