export default () => {
  if (typeof window !== "undefined") {
    (function(e, t, a) {
        // 每次点击出现的样式修改 （todo 不懂的样式名scale，alpha）
        function update() {
            // 爱心
            for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (
                s[e].y--,
                    s[e].scale += .004,
                    s[e].alpha -= .013,
                    s[e].el.style.cssText = "left:" + s[e].x + "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale + "," + s[e].scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");
            // 文字
            for (var i = 0; i < texts.length; i++) {
                texts[i].alpha <= 0 ? (t.body.removeChild(texts[i].el), texts.splice(i, 1)) : (
                    texts[i].y--,
                        texts[i].alpha -= .01,
                        texts[i].el.style.cssText = "left:" + texts[i].x + "px;top:" + texts[i].y + "px;opacity:" + texts[i].alpha + ";z-index:99999;position:fixed;color:" + texts[i].color
                );
            }
            // vuePress内嵌函数，可以实现动画
            requestAnimationFrame(update)
        }
        // 鼠标点击函数，触发更新
        function handleClick() {
            var t = "function" == typeof e.onclick && e.onclick;
            
            e.onclick = function(e) {
              // 过滤指定元素
              let mark = true;
              EXCLUDECLASS && e.path && e.path.forEach((item) =>{
                if(item.nodeType === 1) {
                  typeof item.className === 'string' && item.className.indexOf(EXCLUDECLASS) > -1 ? mark = false : ''
                }
              })
              
              if(mark) {
                t && t(),
                o(e)
              }
            }
        }
        // 随机显示的文字
        const words = ['愤怒', '憎恨', '恐怖', '绝望', '恶意'];
        const getWords = () => words[Math.floor(Math.random() * words.length)];
        // 定义鼠标点击出现的内容
        function o(e) {
            var a = t.createElement("div");
            a.className = "heart",
            s.push({
                el: a,
                x: e.clientX - 5,
                y: e.clientY - 5,
                scale: 1,
                alpha: 1,
                color: COLOR
            }),
            t.body.appendChild(a);

            // 创建一个新的 div 元素来显示文本
            var textDiv = t.createElement("div");
            textDiv.className = "heart-text";
            textDiv.innerHTML = getWords();  // 调用 getWords 获取文本
            textDiv.style.color = COLOR;  // 设置文本颜色
            texts.push({
                el: textDiv,
                x: e.clientX - 2,
                y: e.clientY - 30,
                alpha: 1,
                color: COLOR
            });
            t.body.appendChild(textDiv);
        }

        function addStyle(e) {
            var a = t.createElement("style");
            a.type = "text/css";
            try {
                a.appendChild(t.createTextNode(e))
            } catch(t) {
                a.styleSheet.cssText = e
            }
            t.getElementsByTagName("head")[0].appendChild(a)
        }

        // 爱心和文本的参数数组
        var s = [];
        var texts=[];

        e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
        function(e) {
            setTimeout(e, 1e3 / 60)
        };
            // 设置爱心heart的样式
        addStyle(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}");

        handleClick();
        update()
    })(window, document)
  }
}