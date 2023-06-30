async function init(canvasID) {
    // 适配器
    const adapter = await navigator.gpu.requestAdapter()
    // 图形设备
    const device = await adapter.requestDevice();

    const canvas = document.getElementById('canvas')

    const context = canvas.getContext('webgpu');
        
    const devicePixelRatio = window.devicePixelRatio || 1;
    // 画布绘制大小
    const presentationSize = [ canvas.clientWidth * devicePixelRatio, canvas.clientHeight * devicePixelRatio, ];
    // 获取输出图像格式 硬件相关
    const presentationFormat = context.getPreferredFormat(adapter);
    // 为上下文设置参数
    context.configure({
        device,
        format: presentationFormat,
        size: presentationSize,
    });

    return {
        device,
        context
    }
}