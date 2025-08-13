//////////////////////////////////////////////////////////
//オブジェクトの生成
var space = document.getElementById("space");   //カードの配置場所
var slider = document.getElementById("slider"); //スライダー
var count = document.getElementById("count");   //カードの枚数
var gen = document.getElementById("generate");   //生成

//イベントリスナ
//スライダの値が変更されたときの処理
slider.addEventListener("change", onCountChange, false);
slider.addEventListener("input", onCountChange, false);
gen.addEventListener("click", onGenerate, false);

//////////////////////////////////////////////////////////
//巻数

//スライダの値が変化したとき
function onCountChange() {
    count.textContent = slider.value;
}
        
//リセットされたとき
function onGenerate() {
    //カードを削除
    while (space.children[0]) 
        space.removeChild(space.children[0]);
    
    //新しくカードを登録
    //20までの乱数を発生させカードを生成
    var a = [0];
    for (let i = 0; i < slider.value; i++) {
        var rand = 0;
        while (a.includes(rand)) 
            rand = Math.floor(Math.random() * 20);
        a.push(rand);
        
        //カードの生成
        newGenerate(i, rand);
    }
}

//カードの生成
function newGenerate(index, value) {
    //新しくオブジェクトdivを生成し、spaceに追加
    var div = document.createElement("div");
    div.classList.add("card");
    div.textContent = value;
    space.appendChild(div);

    //カードの仕様
    var drag = false;   //dragされたか
    var size = 50;      //カードのサイズ
    var sx = 0;         //位置
    var sy = 0;
    var y = 50;         //カードの距離
    var x = 120 * index + 50;

    //カードの位置
    function setPosition() {
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (y > (space.clientHeight - size)) 
            y = space.clientHeight - size;
        if (x > (space.clientWidth - size)) 
            x = space.clientWidth - size;
        div.style.left = x + "px";
        div.style.top = y + "px";
    }
    
    //イベントリスナーの設定
    div.addEventListener("mousedown", function (e) {
        drag = true;
        sx = e.screenX;
        sy = e.screenY;  
    }, false);
            
    window.addEventListener("mousemove", function (e) {
        if (drag) {
            x += e.screenX - sx;
            y += e.screenY - sy;
            sx = e.screenX;
            sy = e.screenY;
            setPosition();
        }
    }, false);

    window.addEventListener("mouseup", function (e) {
        drag = false;
    }, false);
    
    window.addEventListener("resize", function (e) {
        exec();
    }, false);

    //カードの位置設定
    setPosition();
}


///////////////////////////////////////////////////////////
// main

//デフォルト枚数
slider.value = 5;

//スライダの数の取得
onCountChange();
//カードの生成
onGenerate();

// main end
