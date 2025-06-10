/**
 * 语言数据对象
 * 包含中英文翻译对照
 */
const langData = {
    // 页面标题和导航
    "title": {
        "zh": "健康营养追踪",
        "en": "Nutrition Tracker"
    },
    "subtitle": {
        "zh": "三分练，七分吃",
        "en": "30% workout, 70% diet"
    },
    "date-selector": {
        "zh": "日期选择",
        "en": "Select Date"
    },
    "goals-settings": {
        "zh": "目标设置",
        "en": "Set Goals"
    },
    
    // 弹窗标题
    "modal-date": {
        "zh": "日期选择",
        "en": "Date Selection"
    },
    "modal-goals": {
        "zh": "营养目标设置",
        "en": "Nutrition Goals"
    },
    "modal-weight": {
        "zh": "体重历史记录",
        "en": "Weight History"
    },
    
    // 日期控制
    "prev-date": {
        "zh": "上一天",
        "en": "Previous Day"
    },
    "next-date": {
        "zh": "下一天",
        "en": "Next Day"
    },
    "today": {
        "zh": "今天",
        "en": "Today"
    },
    
    // 目标设置
    "protein-goal-label": {
        "zh": "蛋白质目标 (克):",
        "en": "Protein Goal (g):"
    },
    "carbs-goal-label": {
        "zh": "碳水化合物目标 (克):",
        "en": "Carbohydrates Goal (g):"
    },
    "fat-goal-label": {
        "zh": "脂肪目标 (克):",
        "en": "Fat Goal (g):"
    },
    "save-goals": {
        "zh": "保存目标",
        "en": "Save Goals"
    },
    "calorie-summary": {
        "zh": "根据您的目标，每日总卡路里摄入量应为",
        "en": "Based on your goals, daily calorie intake should be"
    },
    "calories": {
        "zh": "大卡",
        "en": "calories"
    },
    "calorie-formula": {
        "zh": "计算公式：蛋白质(g) × 4 + 碳水化合物(g) × 4 + 脂肪(g) × 9",
        "en": "Formula: Protein(g) × 4 + Carbs(g) × 4 + Fat(g) × 9"
    },
    
    // 卡片标题
    "nutrition-overview": {
        "zh": "今日营养摄入",
        "en": "Today's Nutrition"
    },
    "nutrition-distribution": {
        "zh": "营养成分分布",
        "en": "Nutrition Distribution"
    },
    "meal-tracking": {
        "zh": "今日餐食记录",
        "en": "Today's Meals"
    },
    "weight-tracking": {
        "zh": "体重记录",
        "en": "Weight Tracking"
    },
    "nutrition-tips": {
        "zh": "三大营养素介绍",
        "en": "Macronutrients Guide"
    },
    
    // 营养素标签
    "protein": {
        "zh": "蛋白质",
        "en": "Protein"
    },
    "carbs": {
        "zh": "碳水化合物",
        "en": "Carbs"
    },
    "fat": {
        "zh": "脂肪",
        "en": "Fat"
    },
    "calories-unit": {
        "zh": "卡路里",
        "en": "calories"
    },
    
    // 图表标签
    "current-intake": {
        "zh": "当前摄入",
        "en": "Current Intake"
    },
    "target-intake": {
        "zh": "目标摄入",
        "en": "Target Intake"
    },
    
    // 营养分布提示
    "ideal-distribution": {
        "zh": "理想分布: 蛋白质 25-30%, 碳水化合物 45-55%, 脂肪 20-30%",
        "en": "Ideal distribution: Protein 25-30%, Carbs 45-55%, Fat 20-30%"
    },
    
    // 餐食标签
    "breakfast": {
        "zh": "早餐",
        "en": "Breakfast"
    },
    "lunch": {
        "zh": "午餐",
        "en": "Lunch"
    },
    "dinner": {
        "zh": "晚餐", 
        "en": "Dinner"
    },
    "snack": {
        "zh": "加餐",
        "en": "Snacks"
    },
    
    // 添加食物表单
    "add-breakfast": {
        "zh": "添加早餐食物",
        "en": "Add Breakfast Item"
    },
    "add-lunch": {
        "zh": "添加午餐食物",
        "en": "Add Lunch Item"
    },
    "add-dinner": {
        "zh": "添加晚餐食物",
        "en": "Add Dinner Item"
    },
    "add-snack": {
        "zh": "添加加餐食物",
        "en": "Add Snack Item"
    },
    "food-name": {
        "zh": "食物名称",
        "en": "Food Name"
    },
    "protein-g": {
        "zh": "蛋白质(g)",
        "en": "Protein(g)"
    },
    "carbs-g": {
        "zh": "碳水(g)",
        "en": "Carbs(g)"
    },
    "fat-g": {
        "zh": "脂肪(g)",
        "en": "Fat(g)"
    },
    "add": {
        "zh": "添加",
        "en": "Add"
    },
    "delete": {
        "zh": "删除",
        "en": "Delete"
    },
    "empty-meal-prefix": {
        "zh": "还没有添加",
        "en": "No "
    },
    "empty-meal-suffix": {
        "zh": "食物",
        "en": " items added yet"
    },
    
    // 营养总结
    "total-protein": {
        "zh": "总蛋白质:",
        "en": "Total Protein:"
    },
    "total-carbs": {
        "zh": "总碳水:",
        "en": "Total Carbs:"
    },
    "total-fat": {
        "zh": "总脂肪:",
        "en": "Total Fat:"
    },
    "total-calories": {
        "zh": "总卡路里:",
        "en": "Total Calories:"
    },
    
    // 体重记录
    "weight-input-label": {
        "zh": "当日体重 (kg):",
        "en": "Today's Weight (kg):"
    },
    "save-weight": {
        "zh": "保存体重",
        "en": "Save Weight"
    },
    "view-history": {
        "zh": "查看历史记录",
        "en": "View History"
    },
    "weight-trend": {
        "zh": "体重趋势",
        "en": "Weight Trend"
    },
    "week-view": {
        "zh": "周视图",
        "en": "Week View"
    },
    "biweek-view": {
        "zh": "双周视图",
        "en": "2-Week View"
    },
    "month-view": {
        "zh": "月视图",
        "en": "Month View"
    },
    "weight-tip": {
        "zh": "体重记录将在趋势图中显示，最多保存3个月数据",
        "en": "Weight records are displayed in the trend chart, storing up to 3 months of data"
    },
    "empty-weight": {
        "zh": "暂无体重记录",
        "en": "No weight records"
    },
    "delete-confirm": {
        "zh": "确定要删除",
        "en": "Are you sure you want to delete weight record for"
    },
    "delete-confirm-suffix": {
        "zh": "的体重记录吗？",
        "en": "?"
    },
    
    // 三大营养素介绍
    "carb-title": {
        "zh": "碳水化合物",
        "en": "Carbohydrates"
    },
    "carb-desc": {
        "zh": "碳水是人体主要能量来源，每克提供4卡路里。大脑和神经系统主要依赖葡萄糖工作。优质碳水来源包括全谷物、豆类、水果和蔬菜，它们富含纤维和微量营养素。",
        "en": "Carbs are the body's primary energy source, providing 4 calories per gram. The brain and nervous system rely mainly on glucose. Quality sources include whole grains, legumes, fruits, and vegetables, rich in fiber and micronutrients."
    },
    "protein-title": {
        "zh": "蛋白质",
        "en": "Protein"
    },
    "protein-desc": {
        "zh": "蛋白质是肌肉、器官和免疫系统的基石，每克提供4卡路里。它们对肌肉修复和生长至关重要，促进饱腹感并支持新陈代谢。优质蛋白来源包括瘦肉、鱼、蛋、豆类和坚果。",
        "en": "Protein is the building block for muscles, organs, and immune system, providing 4 calories per gram. Essential for muscle repair and growth, it promotes satiety and supports metabolism. Quality sources include lean meat, fish, eggs, legumes, and nuts."
    },
    "fat-title": {
        "zh": "脂肪",
        "en": "Fat"
    },
    "fat-desc": {
        "zh": "脂肪是高能量营养素，每克提供9卡路里。它们对激素生产、大脑功能和脂溶性维生素(A、D、E、K)的吸收至关重要。健康脂肪来源包括橄榄油、鳄梨、坚果和鱼类中的omega-3脂肪酸。",
        "en": "Fat is a high-energy nutrient, providing 9 calories per gram. Essential for hormone production, brain function, and absorption of fat-soluble vitamins (A, D, E, K). Healthy sources include olive oil, avocados, nuts, and omega-3 fatty acids in fish."
    },
    "balance-title": {
        "zh": "平衡摄入",
        "en": "Balanced Intake"
    },
    "balance-desc": {
        "zh": "均衡饮食应包括所有三种宏量营养素。一般推荐摄入比例为：蛋白质25-30%，碳水化合物45-55%，脂肪20-30%，但最佳比例因个人目标、活动水平和代谢状况而异。",
        "en": "A balanced diet should include all three macronutrients. Recommended ratios are typically: protein 25-30%, carbs 45-55%, and fat 20-30%, but optimal ratios vary based on individual goals, activity levels, and metabolism."
    },
    
    // 页脚
    "footer": {
        "zh": "© 2023 健康营养追踪 - 仅供参考，不构成医疗建议",
        "en": "© 2023 Nutrition Tracker - For reference only, not medical advice"
    }
};

// 默认语言
let currentLang = 'zh';

/**
 * 切换语言
 * @param {string} lang - 语言代码 ('zh' 或 'en')
 */
function switchLanguage(lang) {
    if (lang !== 'zh' && lang !== 'en') return;
    
    // 更新当前语言
    currentLang = lang;
    
    // 更新语言切换按钮文本
    document.getElementById('lang-switch').textContent = 
        currentLang === 'zh' ? 'English' : '中文';
    
    // 查找所有带data-lang属性的元素
    const elements = document.querySelectorAll('[data-lang]');
    
    // 更新每个元素的文本
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (langData[key]) {
            el.textContent = langData[key][currentLang];
        }
    });
    
    // 更新输入元素的placeholder
    updatePlaceholders();
    
    // 更新动态生成的内容
    if (window.updateMealLists) {
        window.updateMealLists();
    }
    
    // 更新日期显示
    if (window.updateDisplayDate) {
        window.updateDisplayDate();
    }
    
    // 更新图表标签
    if (window.updateNutritionChart) {
        window.updateNutritionChart();
    }
    
    // 更新体重记录列表
    if (window.updateWeightRecordsList) {
        window.updateWeightRecordsList();
    }
    
    // 保存语言设置到localStorage
    localStorage.setItem('preferred-language', currentLang);
}

/**
 * 更新输入框占位符文本
 */
function updatePlaceholders() {
    // 食物名称输入框
    const foodNameInputs = document.querySelectorAll('input[placeholder]');
    foodNameInputs.forEach(input => {
        const id = input.id || '';
        if (id.includes('food')) {
            input.placeholder = langData['food-name'][currentLang];
        } else if (id.includes('protein')) {
            input.placeholder = langData['protein-g'][currentLang];
        } else if (id.includes('carbs')) {
            input.placeholder = langData['carbs-g'][currentLang];
        } else if (id.includes('fat')) {
            input.placeholder = langData['fat-g'][currentLang];
        } else if (id === 'weight-input') {
            input.placeholder = langData['weight-input-label'][currentLang].split(' ')[0];
        }
    });
}

/**
 * 初始化语言
 */
function initLanguage() {
    // 从localStorage获取保存的语言设置
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        switchLanguage(savedLang);
    }
    
    // 添加语言切换按钮事件监听器
    document.getElementById('lang-switch').addEventListener('click', function() {
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        switchLanguage(newLang);
    });
} 