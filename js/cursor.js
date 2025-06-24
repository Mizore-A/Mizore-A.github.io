document.addEventListener('DOMContentLoaded', function() {
  // 创建主光标元素
  const mainCursor = document.createElement('div');
  mainCursor.className = 'custom-cursor-main';
  document.body.appendChild(mainCursor);
  
  // 创建同心圆元素
  const auraCursor = document.createElement('div');
  auraCursor.className = 'custom-cursor-aura';
  document.body.appendChild(auraCursor);
  
  // 鼠标位置跟踪
  let mouseX = 0;
  let mouseY = 0;
  
  // 光环位置跟踪
  let auraX = 0;
  let auraY = 0;
  
  // 点击状态跟踪
  let isClicking = false;
  
  // 初始位置设为屏幕中心
  const initX = window.innerWidth / 2;
  const initY = window.innerHeight / 2;
  
  mainCursor.style.left = `${initX}px`;
  mainCursor.style.top = `${initY}px`;
  auraCursor.style.left = `${initX}px`;
  auraCursor.style.top = `${initY}px`;
  
  // 记录鼠标位置
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // 主光标立即跟随
    mainCursor.style.left = `${mouseX}px`;
    mainCursor.style.top = `${mouseY}px`;
  });
  
  // 点击效果 - 修复版本
  document.addEventListener('mousedown', () => {
    isClicking = true;
    auraCursor.classList.add('click-effect');
  });
  
  document.addEventListener('mouseup', () => {
    isClicking = false;
    auraCursor.classList.remove('click-effect');
  });
  
  // 移出窗口时隐藏光标
  document.addEventListener('mouseleave', () => {
    mainCursor.style.opacity = '0';
    auraCursor.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    mainCursor.style.opacity = '1';
    auraCursor.style.opacity = '1';
  });
  
  // 光环跟随动画 - 核心延时效果
  const animateAura = () => {
    // 计算光环与鼠标的距离
    const dx = mouseX - auraX;
    const dy = mouseY - auraY;
    
    // 使用缓动函数实现平滑跟随 (0.15是跟随速度)
    auraX += dx * 0.15;
    auraY += dy * 0.15;
    
    // 应用新位置
    auraCursor.style.left = `${auraX}px`;
    auraCursor.style.top = `${auraY}px`;
    
    // 根据移动速度调整光环大小 - 产生弹性效果
    const distance = Math.sqrt(dx * dx + dy * dy);
    const scale = 1 + Math.min(distance * 0.002, 0.2); // 最大放大20%
    
    // 只有在没有点击时才应用弹性缩放
    if (!isClicking) {
      auraCursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
    
    // 继续动画循环
    requestAnimationFrame(animateAura);
  };
  
  // 启动跟随动画
  animateAura();
});