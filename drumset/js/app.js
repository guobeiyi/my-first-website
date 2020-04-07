"use strict";



  function removeTransition(event) {
	  if (event.propertyName !== 'transform') return; // 过滤其中一种事件
    event.target.classList.remove('playing'); // 移除高亮的样式
  }

  function playSound(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`); // 根据触发按键的键码，获取对应音频
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`); // 获取页面对应按钮 DIV 元素
    if (!audio) return; // 处理无效的按键事件

    key.classList.add('playing'); // 改变样式
    audio.currentTime = 0; // 每次播放之后都使音频播放进度归零
    audio.play(); // 播放相应音效
	setTimeout(function(){
	    key.classList.remove('playing'); // 改变样式
	},500)
  }

  const keys = Array.from(document.querySelectorAll('.key')); // 获取页面所有按钮元素
  keys.forEach(key => key.addEventListener('transitionend', removeTransition)); // 添加 transition 事件监听
  window.addEventListener('keydown', playSound);