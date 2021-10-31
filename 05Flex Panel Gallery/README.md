在JS30挑战中，有不少项目都存在bug，其中第四个项目弹性布局照片墙项目，当连续双击点击某一个板块时，将出现照片不变大但两侧字已经滑进来的情况，如图：

![1635672850(1).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ea1f45406c24fe3b44bf6a04a3448c2~tplv-k3u1fbpfcp-watermark.image?)

这是因为官方对两侧字体的滑入用了一个transitionend事件，连续点击时，由于click事件对应的flex过渡还未完成便开始了下一次过渡，实际上只发生了一次flex过渡完成事件，因此两侧的字也会跟随着该过渡完成而滑出。对此，我一开始在GitHub上找到一种解决办法，就是将transitionend事件取消，全部放入click事件中，并用过渡延时对应时间来实现该过程，详情可到该处寻找：https://github.com/soyaine/JavaScript30/blob/master/05%20-%20Flex%20Panel%20Gallery/README.md

该方法基本可以无差别的实现想要的效果，但本人认为通过延时过渡并不是一个完美的解决方法，因为想实现的效果就是文字在照片变大后后面弹出，如果在照片放大的过程中出现了卡顿，则文字还是有可能提前出现（个人猜测，没有具体出现过）。

因此我想到的办法是，从变化的逻辑出发，因为连续点击鼠标时，会触发两次click事件，并在最终完成flex过渡时触发一次transitionend事件。由该陈述推断，一来一回的点击本应触发两次，实际却只触发一次，这是矛盾的，那么就可以通过两个标记将两种事件联系起来，用逻辑判断来决定结果：即你触发两次，我也应该有两次才对，如果我只有一次，那么就不应该执行该操作。

这是显而易见的，因此就要去选对两种事件独一无二且互不干扰的标记，在这里我选择flex样式的值作为click事件的标记，因为每次点击后，flex值会先进行变化再发生过渡效果，即flex值与过渡效果无关；而对于transitionend事件，我选择创建一个布尔值来保持字体是否应该滑入的状态，即true表示需要滑入，false表示需要滑出，由于每张照片都有该事件，那么可以将该布尔值作为照片元素对象(panel)的属性进行保存。

```js
panel.forEach(panel => {
    //false表示需要滑出，但作为初始值表示已经处于滑出的状态
    panel.value = flase;  
    panel.addEventListener('click', trans)
    panel.addEventListener('transitionend', transEnd);
};

//transitionend事件对应的回调函数
function transformEnd(event){
    const [flexStr, ,] = getComputedStyle(this).flex.split(' ');  //获取元素样式中的flex声明值
    if (event.propertyName.includes('flex')) {
      this.value = !this.value;  //改变是否滑入的状态，这是关键
      //若flex值为5，表示此时照片已经变大，同时检查this.value是否为true，若为true则应该滑入
      if (flexStr === '5') {
        this.value && this.classList.add('open-active');  
        //不要忘了如果此时值不对应，应该纠正过来，确保下次能够正确执行
        this.value = true;  
      }
      //若flex值为1，表示此时照片已经缩小，同时检查this.value是否为false，若为false则应该滑出
      else if (flexStr === '1') {
        this.value || this.classList.remove('open-active');
        this.value = false;
      }
    }
}
```

检查此时初始化后，照片处于缩小状态，如果连续双击鼠标，flex样式值会先变成5再变成1，结束过渡时，会执行如下代码：

```js
this.value = !this.value;

else if (flexStr === '1') {
    this.value || this.classList.remove('open-active');
    this.value = false;
  }
```
value属性值变成true，因此`this.classList.remove('open-active')`;将不会得到执行，修复了bug，并在最后纠正该错误，将value值修改为false，确保下一次能够正常运行。同理照片变大状态下双击，也可以通过上述逻辑修复该bug。
