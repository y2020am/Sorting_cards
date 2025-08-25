// Add JavaScript code for your web site here and call it from index.html.

//Algorithm
// 1 カードを生成する。
// 2 乱数を発生させ、カードに添付する。
// 3 カードのオブジェクトを生成する。
// 4 それぞれのカードにdrag & dropが可能なようにactionListenerを設ける。

/////////////////////////////////////////////////////////////////////////
//HTMLのObjectの取り出し
//
const stage = document.getElementById("stage");
const range = document.getElementById("countRange");
const countValue = document.getElementById("countValue");
const generateBtn = document.getElementById("generateBtn");

////////////////////////////////////////////////////////////////////////
// 関数
//

// 座標設定
//(x,y): 座標ピクセル単位   obj: カードオブジェクト
//ピクセルで位置を設定
function setPosition(obj, x, y){
  obj.dataset.x = x; 
  obj.dataset.y = y;
  obj.style.transform = `translate(${x}px, ${y}px)`;
}


// objectを生成してcardと名付ける
//num: ..枚目
function createCard(num){
  let card = document.createElement("div"); //divを新しいobjectとする。
  card.className = "card";                  //
  card.textContent = num;                   //番号をつける。
  enableDrag(card);                         //drag可能とする。
 
  return card;                    
}

    
// カードにつける乱数の生成
//n: 枚数 min,max: 最小値,最大値
function generateRandom(n, min, max){
  let nums = [];              //生成した乱数の保管リスト
  while(nums.length < n){     //生成した乱数の数だけ実行
    let r = Math.floor(Math.random()*(max-min+1)) + min;//乱数の発生
    if(!nums.includes(r))     //同じ数が無いか比較  
      nums.push(r);           //後となる数なのでリストに追加
  }
  return nums;
}

// ドラッグ処理
//カードをdrag & dropされたとき
//カードそれぞれにadctionListnerを設定しdrag & drop可能にする。  
// obj: カードのobject
function enableDrag(obj){

  let baseX;            //カードが置かれた位置(x,y)
  let baseY;
  let startX;           //移動位置(x,y)
  let startY;
  let dragging = false;   //dragされているか？


  //マウスでつかんだときの処理
  obj.addEventListener("pointerdown", function(e){
    e.preventDefault(); 											//モバイルでのスクロール防止
    dragging = true;                          //dragされた
    baseX = parseFloat(obj.dataset.x || "0"); //カードの位置を取得
    baseY = parseFloat(obj.dataset.y || "0"); //
    startX = e.clientX;                       //移動先の位置を取得
    startY = e.clientY;
    obj.setPointerCapture(e.pointerId);       //
    obj.classList.add("dragging");            //objectにdragされていることを指示
    obj.style.zIndex = Date.now();            //前面に配置指示
  })
  
  //マウスで掴んで移動したときの処理
  obj.addEventListener("pointermove", function(e){
    if(!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    setPosition(obj, baseX + dx, baseY + dy);
  })
  
  //マウスを離した、cancelしたときの処理
  obj.addEventListener("pointerup", onUp);
  obj.addEventListener("pointercancel", onUp);

  function onUp(e){
    dragging = false;
    obj.releasePointerCapture(e.pointerId);
    obj.classList.remove("dragging");
  }

}

//////////////////////////////////////////////////////////////////
// アクションリスナの設定
//
    
//カード枚数の取得
//スライダの値を取得
range.addEventListener("input", function(e){
  countValue.textContent = range.value; //  HTMLへ渡す

});

    
// 「生成ボタン」が押されたときの処理　カード生成
generateBtn.addEventListener("click", function(e){
  stage.innerHTML = "";                       //枚数部をクリアしておく

  let count = parseInt(range.value, 10);      //スライダから取得した値を10進数へ
  let numbers = generateRandom(count, 1, 20); //１−２０までの乱数の生成

  let x;          //カードの位置 (x, y)
  let y = 20;     //
  let gap = 20;   //カードとカードの隙間

  numbers.forEach(function(num, i){       //乱数で発生させた数を取り出す
    let card = createCard(num);           //カードの生成
    stage.appendChild(card);              //画面にカードを追加
    x = i * (card.offsetWidth + gap) + 10;// ｘ座標の計算
    setPosition(card, x, y);              // 横一列に並べる

  });
});

//program end
