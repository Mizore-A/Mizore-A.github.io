// 全屏切换函数
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    // 跨浏览器全屏请求
    const element = pdfContainer;
    
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { 
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { 
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) { 
      element.msRequestFullscreen();
    }
    
    // 添加视觉反馈
    element.classList.add('fullscreen');
    fullscreenBtn.innerHTML = '<i class="icon">⛶</i> 退出全屏';
    successMsg.style.display = 'block';
  } else {
    // 跨浏览器退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { 
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { 
      document.msExitFullscreen();
    }
    
    // 移除视觉反馈
    element.classList.remove('fullscreen');
    fullscreenBtn.innerHTML = '<i class="icon">⛶</i> 全屏查看';
    successMsg.style.display = 'none';
  }
}

// 添加全屏状态变化监听
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
  const fullscreenElement = 
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;
  
  if (!fullscreenElement) {
    pdfContainer.classList.remove('fullscreen');
    fullscreenBtn.innerHTML = '<i class="icon">⛶</i> 全屏查看';
    successMsg.style.display = 'none';
  }
}