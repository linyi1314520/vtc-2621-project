// ========== VTC Notebook Selector 配置選配計算腳本 ==========

// 等網頁完全載入後才執行
document.addEventListener('DOMContentLoaded', function() {

    // 取得所有需要用到的 HTML 元素
    var baseModel = document.getElementById('base-model');
    var cpu = document.getElementById('cpu');
    var ram = document.getElementById('ram');
    var storage = document.getElementById('storage');
    var screen = document.getElementById('screen');
    var warranty = document.getElementById('warranty');
    var quantity = document.getElementById('quantity');

    var configSummary = document.getElementById('config-summary');
    var pricePerUnit = document.getElementById('price-per-unit');
    var resultQuantity = document.getElementById('result-quantity');
    var totalPrice = document.getElementById('total-price');
    var adviceText = document.getElementById('advice-text');

    // 取得所有 select 和 input 元素，幫佢哋加上監聽事件
    var allInputs = [baseModel, cpu, ram, storage, screen, warranty, quantity];

    for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].addEventListener('change', updateResult);
        allInputs[i].addEventListener('input', updateResult);
    }

    // 計算並更新結果的函數
    function updateResult() {

        // 讀取每個選項的值（value 是字串，用 parseInt 轉成數字）
        var basePrice = parseInt(baseModel.value);
        var cpuPrice = parseInt(cpu.value);
        var ramPrice = parseInt(ram.value);
        var storagePrice = parseInt(storage.value);
        var screenPrice = parseInt(screen.value);
        var warrantyPrice = parseInt(warranty.value);

        // 取得數量
        var qty = parseInt(quantity.value);
        if (qty < 1 || isNaN(qty)) {
            qty = 1;
            quantity.value = 1;
        }

        // 計算每台價格
        var perUnit = basePrice + cpuPrice + ramPrice + storagePrice + screenPrice + warrantyPrice;

        // 計算總價
        var total = perUnit * qty;

        // 建立配置摘要文字
        var summary = baseModel.options[baseModel.selectedIndex].text + ' | ' +
                      cpu.options[cpu.selectedIndex].text + ' | ' +
                      ram.options[ram.selectedIndex].text + ' | ' +
                      storage.options[storage.selectedIndex].text + ' | ' +
                      screen.options[screen.selectedIndex].text + ' | ' +
                      warranty.options[warranty.selectedIndex].text;

        // 更新畫面
        configSummary.textContent = summary;
        pricePerUnit.textContent = 'HK$' + perUnit.toLocaleString();
        resultQuantity.textContent = qty;
        totalPrice.textContent = 'HK$' + total.toLocaleString();

        // 產生建議文字
        adviceText.textContent = generateAdvice(perUnit, ramPrice, cpuPrice, screenPrice, basePrice);
    }

    // 產生建議的函數
    function generateAdvice(perUnit, ramPrice, cpuPrice, screenPrice, basePrice) {

        var advice = '';

        // 根據總價判斷用途
        if (perUnit < 5000) {
            advice += '📚 呢個配置適合作為「輕薄文書本」，適合商科、文科同學做文書處理、上網、睇影片。';
            advice += '不過如果你需要跑虛擬機或者寫大型程式，建議升級記憶體至 32GB。';
        } else if (perUnit < 8000) {
            advice += '💻 呢個配置係「中階全能本」，適合大部分 VTC 同學使用。';
            advice += '可以應付日常編程、文書工作，甚至可以輕度遊戲同簡單影片剪輯。';
            if (ramPrice < 600) {
                advice += ' 建議升級記憶體至 32GB，未來幾年會更耐用。';
            }
        } else if (perUnit < 15000) {
            advice += '🎮 呢個配置屬於「高性能本」，適合 IT、AI、工程、設計等需要高效能嘅學科。';
            advice += '可以流暢跑虛擬機、CAD、影片剪輯，亦可以玩大部分 3A 遊戲。';
            if (cpuPrice < 2000) {
                advice += ' 如果預算允許，可以考慮升級 CPU 以獲得更強嘅多核性能。';
            }
        } else if (perUnit < 25000) {
            advice += '🔥 呢個配置係「高端遊戲本 / 工作站級別」，適合 AI 訓練、3D 渲染、大型工程仿真。';
            advice += '可以 2K 高畫質暢玩所有 3A 大作，亦可以處理大型數據集。';
            if (ramPrice < 2000) {
                advice += ' 建議升級記憶體至 64GB 或以上，因為大型項目需要大量內存。';
            }
        } else {
            advice += '🚀 呢個配置係「旗艦級」！適合專業 AI 開發、4K 影片製作、VR 遊戲。';
            advice += '可以 4K 最高畫質 + 光追暢玩所有大作，性能絕對頂級。';
            advice += ' 不過要留意重量同續航力，呢類筆電通常較重。';
        }

        // 根據螢幕選擇追加建議
        if (screenPrice >= 4000) {
            advice += ' ✨ 你選擇咗高階螢幕，色準同畫質都會非常出色，適合設計同學。';
        } else if (screenPrice === 0) {
            advice += ' 📺 標準 FHD 螢幕夠用，但如果你做設計或剪片，建議升級螢幕。';
        }

        // 根據保修追加建議
        if (perUnit > 8000) {
            advice += ' 🛡️ 建議購買至少 2 年延長保修，因為高性能筆電維修成本較高。';
        }

        return advice;
    }

    // 頁面載入時立即執行一次，顯示初始結果
    updateResult();

});
