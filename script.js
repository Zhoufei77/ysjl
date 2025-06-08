document.addEventListener('DOMContentLoaded', function() {
    // 初始化应用程序
    initApp();
});

// 全局数据对象
const appData = {
    // 当前选择的日期 (YYYY-MM-DD格式)
    currentDate: formatDate(new Date()),
    
    // 营养目标
    goals: {
        protein: 90,
        carbs: 250,
        fat: 65
    },
    
    // 每日数据记录
    dailyRecords: {},
    
    // 体重记录 (按周)
    weightRecords: {},
    
    // 体重图表视图模式: 'week', 'biweek', 'month'
    weightChartMode: 'week'
};

// 初始化应用程序
function initApp() {
    // 初始化弹窗控制
    initModals();
    
    // 初始化日期选择器
    initDateSelector();
    
    // 初始化营养目标计算
    initGoalsCalculation();
    
    // 初始化卡路里环形图表
    initCaloriesChart();
    
    // 初始化营养成分分布图
    initNutritionChart();
    
    // 初始化餐食标签页切换
    initMealTabs();
    
    // 初始化食物添加功能
    initFoodAddition();
    
    // 初始化体重记录
    initWeightTracking();
    
    // 计算并更新营养目标总卡路里
    updateTotalCaloriesGoal();
    
    // 从本地存储加载数据
    loadDataFromLocalStorage();
    
    // 初始化体重图表
    initWeightChart();
    
    // 初始化体重历史记录
    initWeightRecordsList();
    
    // 更新UI显示
    updateAllDisplays();
}

// 初始化弹窗控制
function initModals() {
    // 获取所有弹窗和按钮
    const dateModal = document.getElementById('date-selector-modal');
    const goalsModal = document.getElementById('goals-settings-modal');
    const weightRecordsModal = document.getElementById('weight-records-modal');
    
    const showDateBtn = document.getElementById('show-date-selector');
    const showGoalsBtn = document.getElementById('show-goals-settings');
    const showWeightRecordsBtn = document.getElementById('show-weight-records');
    
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // 显示日期选择弹窗
    showDateBtn.addEventListener('click', function() {
        dateModal.style.display = 'block';
    });
    
    // 显示目标设置弹窗
    showGoalsBtn.addEventListener('click', function() {
        goalsModal.style.display = 'block';
    });
    
    // 显示体重记录弹窗
    showWeightRecordsBtn.addEventListener('click', function() {
        updateWeightRecordsList();
        weightRecordsModal.style.display = 'block';
    });
    
    // 关闭弹窗
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            dateModal.style.display = 'none';
            goalsModal.style.display = 'none';
            weightRecordsModal.style.display = 'none';
        });
    });
    
    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(event) {
        if (event.target === dateModal) {
            dateModal.style.display = 'none';
        }
        if (event.target === goalsModal) {
            goalsModal.style.display = 'none';
        }
        if (event.target === weightRecordsModal) {
            weightRecordsModal.style.display = 'none';
        }
    });
}

// 初始化日期选择器
function initDateSelector() {
    const currentDateInput = document.getElementById('current-date');
    const prevDateBtn = document.getElementById('prev-date');
    const nextDateBtn = document.getElementById('next-date');
    const todayBtn = document.getElementById('today-btn');
    
    // 设置当前日期
    currentDateInput.value = appData.currentDate;
    
    // 监听日期输入变化
    currentDateInput.addEventListener('change', function() {
        changeCurrentDate(this.value);
    });
    
    // 上一天按钮
    prevDateBtn.addEventListener('click', function() {
        const prevDate = new Date(appData.currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        changeCurrentDate(formatDate(prevDate));
    });
    
    // 下一天按钮
    nextDateBtn.addEventListener('click', function() {
        const nextDate = new Date(appData.currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        changeCurrentDate(formatDate(nextDate));
    });
    
    // 今天按钮
    todayBtn.addEventListener('click', function() {
        changeCurrentDate(formatDate(new Date()));
    });
}

// 改变当前日期
function changeCurrentDate(dateStr) {
    appData.currentDate = dateStr;
    document.getElementById('current-date').value = dateStr;
    
    // 更新显示日期
    updateDisplayDate();
    
    // 确保当前日期数据存在
    ensureCurrentDateData();
    
    // 更新UI显示
    updateAllDisplays();
    
    // 关闭日期选择弹窗
    document.getElementById('date-selector-modal').style.display = 'none';
}

// 更新显示日期
function updateDisplayDate() {
    const dateObj = new Date(appData.currentDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    
    document.getElementById('display-current-date').textContent = `${year}年${month}月${day}日`;
}

// 确保当前日期的数据结构存在
function ensureCurrentDateData() {
    if (!appData.dailyRecords[appData.currentDate]) {
        appData.dailyRecords[appData.currentDate] = {
            consumed: {
                protein: 0,
                carbs: 0,
                fat: 0
            },
            meals: {
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: []
            }
        };
    }
}

// 格式化日期为YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 获取当前日期的周数
function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// 获取当前周的键值 (YYYY-WW格式)
function getWeekKey(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const week = getWeekNumber(dateObj);
    return `${year}-${String(week).padStart(2, '0')}`;
}

// 初始化营养目标计算
function initGoalsCalculation() {
    // 监听保存目标按钮点击
    document.getElementById('save-goals').addEventListener('click', function() {
        // 获取用户输入的目标值
        const proteinGoal = parseInt(document.getElementById('protein-goal').value) || 0;
        const carbsGoal = parseInt(document.getElementById('carbs-goal').value) || 0;
        const fatGoal = parseInt(document.getElementById('fat-goal').value) || 0;
        
        // 更新营养目标数据
        appData.goals = {
            protein: proteinGoal,
            carbs: carbsGoal,
            fat: fatGoal
        };
        
        // 更新UI显示
        updateTotalCaloriesGoal();
        updateCaloriesChart();
        updateNutritionChart();
        updateNutritionOverview();
        
        // 保存到本地存储
        saveDataToLocalStorage();
        
        // 关闭设置弹窗
        document.getElementById('goals-settings-modal').style.display = 'none';
    });
    
    // 监听输入框变化，实时更新总卡路里目标
    const inputFields = ['protein-goal', 'carbs-goal', 'fat-goal'];
    inputFields.forEach(field => {
        document.getElementById(field).addEventListener('input', updateTotalCaloriesGoal);
    });
}

// 计算并更新营养目标总卡路里
function updateTotalCaloriesGoal() {
    const proteinGoal = parseInt(document.getElementById('protein-goal').value) || 0;
    const carbsGoal = parseInt(document.getElementById('carbs-goal').value) || 0;
    const fatGoal = parseInt(document.getElementById('fat-goal').value) || 0;
    
    const totalCalories = proteinGoal * 4 + carbsGoal * 4 + fatGoal * 9;
    
    document.getElementById('total-calories-goal').textContent = totalCalories;
}

// 初始化卡路里环形图表
function initCaloriesChart() {
    const caloriesChartCtx = document.getElementById('calories-chart').getContext('2d');
    
    window.caloriesChart = new Chart(caloriesChartCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [0, 100],
                backgroundColor: [
                    '#007aff',
                    '#f2f2f7'
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
}

// 更新卡路里环形图表
function updateCaloriesChart() {
    const totalCaloriesGoal = calculateTotalCalories(appData.goals);
    const currentDayData = appData.dailyRecords[appData.currentDate] || { consumed: { protein: 0, carbs: 0, fat: 0 } };
    const totalCaloriesConsumed = calculateTotalCalories(currentDayData.consumed);
    const caloriesRemaining = Math.max(0, totalCaloriesGoal - totalCaloriesConsumed);
    
    // 更新图表数据
    window.caloriesChart.data.datasets[0].data = [
        totalCaloriesConsumed,
        caloriesRemaining
    ];
    window.caloriesChart.update();
    
    // 更新卡路里显示文本
    document.getElementById('calories-consumed').textContent = totalCaloriesConsumed;
    document.getElementById('calories-total').textContent = `/ ${totalCaloriesGoal}`;
}

// 初始化营养成分分布图
function initNutritionChart() {
    const nutritionChartCtx = document.getElementById('nutrition-chart').getContext('2d');
    
    window.nutritionChart = new Chart(nutritionChartCtx, {
        type: 'bar',
        data: {
            labels: ['蛋白质', '碳水化合物', '脂肪'],
            datasets: [
                {
                    label: '当前摄入',
                    data: [0, 0, 0],
                    backgroundColor: [
                        '#007aff',
                        '#5ac8fa',
                        '#ff9500'
                    ],
                    borderRadius: 6,
                    barPercentage: 0.6
                },
                {
                    label: '目标摄入',
                    data: [appData.goals.protein, appData.goals.carbs, appData.goals.fat],
                    backgroundColor: 'rgba(150, 150, 150, 0.2)',
                    borderRadius: 6,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(200, 200, 200, 0.2)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// 更新营养成分分布图
function updateNutritionChart() {
    const currentDayData = appData.dailyRecords[appData.currentDate] || { consumed: { protein: 0, carbs: 0, fat: 0 } };
    
    // 更新当前摄入数据
    window.nutritionChart.data.datasets[0].data = [
        currentDayData.consumed.protein,
        currentDayData.consumed.carbs,
        currentDayData.consumed.fat
    ];
    
    // 更新目标摄入数据
    window.nutritionChart.data.datasets[1].data = [
        appData.goals.protein,
        appData.goals.carbs,
        appData.goals.fat
    ];
    
    window.nutritionChart.update();
}

// 更新营养摄入概览
function updateNutritionOverview() {
    const currentDayData = appData.dailyRecords[appData.currentDate] || { consumed: { protein: 0, carbs: 0, fat: 0 } };
    
    // 更新蛋白质进度
    const proteinPercentage = (currentDayData.consumed.protein / appData.goals.protein) * 100;
    document.getElementById('protein-value').textContent = `${currentDayData.consumed.protein}g / ${appData.goals.protein}g`;
    document.getElementById('protein-progress').style.width = `${Math.min(100, proteinPercentage)}%`;
    
    // 更新碳水化合物进度
    const carbsPercentage = (currentDayData.consumed.carbs / appData.goals.carbs) * 100;
    document.getElementById('carbs-value').textContent = `${currentDayData.consumed.carbs}g / ${appData.goals.carbs}g`;
    document.getElementById('carbs-progress').style.width = `${Math.min(100, carbsPercentage)}%`;
    
    // 更新脂肪进度
    const fatPercentage = (currentDayData.consumed.fat / appData.goals.fat) * 100;
    document.getElementById('fat-value').textContent = `${currentDayData.consumed.fat}g / ${appData.goals.fat}g`;
    document.getElementById('fat-progress').style.width = `${Math.min(100, fatPercentage)}%`;
}

// 初始化餐食标签页切换
function initMealTabs() {
    const mealTabButtons = document.querySelectorAll('.meal-tab-btn');
    const mealTabContents = document.querySelectorAll('.meal-tab-content');
    
    mealTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有标签页和内容的激活状态
            mealTabButtons.forEach(btn => btn.classList.remove('active'));
            mealTabContents.forEach(content => content.classList.remove('active'));
            
            // 激活当前标签页和内容
            button.classList.add('active');
            const meal = button.getAttribute('data-meal');
            document.getElementById(`${meal}-content`).classList.add('active');
        });
    });
}

// 初始化食物添加功能
function initFoodAddition() {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    
    mealTypes.forEach(mealType => {
        const addButton = document.getElementById(`add-${mealType}`);
        
        addButton.addEventListener('click', () => {
            // 获取食物输入数据
            const foodName = document.getElementById(`${mealType}-food`).value.trim();
            const protein = parseInt(document.getElementById(`${mealType}-protein`).value) || 0;
            const carbs = parseInt(document.getElementById(`${mealType}-carbs`).value) || 0;
            const fat = parseInt(document.getElementById(`${mealType}-fat`).value) || 0;
            
            // 验证输入
            if (foodName === '') {
                alert('请输入食物名称');
                return;
            }
            
            // 添加食物到数据
            addFood(mealType, foodName, protein, carbs, fat);
            
            // 清空输入框
            document.getElementById(`${mealType}-food`).value = '';
            document.getElementById(`${mealType}-protein`).value = '';
            document.getElementById(`${mealType}-carbs`).value = '';
            document.getElementById(`${mealType}-fat`).value = '';
            
            // 更新显示
            updateAllDisplays();
        });
    });
}

// 添加食物到指定餐食
function addFood(mealType, foodName, protein, carbs, fat) {
    const food = {
        id: Date.now(), // 使用时间戳作为唯一ID
        name: foodName,
        protein: protein,
        carbs: carbs,
        fat: fat
    };
    
    // 确保当前日期数据存在
    ensureCurrentDateData();
    
    // 添加到数据
    appData.dailyRecords[appData.currentDate].meals[mealType].push(food);
    
    // 更新已消耗的总营养量
    appData.dailyRecords[appData.currentDate].consumed.protein += protein;
    appData.dailyRecords[appData.currentDate].consumed.carbs += carbs;
    appData.dailyRecords[appData.currentDate].consumed.fat += fat;
    
    // 保存到本地存储
    saveDataToLocalStorage();
}

// 删除食物
function deleteFood(mealType, foodId) {
    const currentDayData = appData.dailyRecords[appData.currentDate];
    
    if (!currentDayData) return;
    
    // 找到要删除的食物
    const foodIndex = currentDayData.meals[mealType].findIndex(food => food.id === foodId);
    
    if (foodIndex !== -1) {
        const food = currentDayData.meals[mealType][foodIndex];
        
        // 从总消耗中减去该食物的营养
        currentDayData.consumed.protein -= food.protein;
        currentDayData.consumed.carbs -= food.carbs;
        currentDayData.consumed.fat -= food.fat;
        
        // 从数组中删除该食物
        currentDayData.meals[mealType].splice(foodIndex, 1);
        
        // 保存到本地存储
        saveDataToLocalStorage();
        
        // 更新显示
        updateAllDisplays();
    }
}

// 初始化体重记录功能
function initWeightTracking() {
    const saveWeightBtn = document.getElementById('save-weight');
    const weightInput = document.getElementById('weight-input');
    
    // 显示当前周的体重数据
    updateWeightInput();
    
    // 监听保存体重按钮点击
    saveWeightBtn.addEventListener('click', function() {
        const weight = parseFloat(weightInput.value);
        
        if (isNaN(weight) || weight <= 0) {
            alert('请输入有效的体重数值');
            return;
        }
        
        // 保存体重数据
        saveWeightData(weight);
        
        // 清空输入框
        weightInput.value = '';
        
        // 更新体重图表
        updateWeightChart();
    });
    
    // 初始化体重图表视图切换
    initWeightChartPeriodSwitch();
}

// 初始化体重图表周期切换
function initWeightChartPeriodSwitch() {
    const periodButtons = document.querySelectorAll('.chart-period-btn');
    
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的激活状态
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // 激活当前按钮
            this.classList.add('active');
            
            // 更新图表周期模式
            appData.weightChartMode = this.getAttribute('data-period');
            
            // 更新体重图表
            updateWeightChart();
            
            // 保存设置到本地存储
            saveDataToLocalStorage();
        });
    });
}

// 更新体重输入框显示当前周的值
function updateWeightInput() {
    const weekKey = getWeekKey(appData.currentDate);
    const weightInput = document.getElementById('weight-input');
    
    if (appData.weightRecords[weekKey]) {
        weightInput.value = appData.weightRecords[weekKey];
    } else {
        weightInput.value = '';
    }
}

// 保存体重数据
function saveWeightData(weight) {
    const weekKey = getWeekKey(appData.currentDate);
    
    // 保存体重数据
    appData.weightRecords[weekKey] = weight;
    
    // 限制保存最近12周的数据
    limitWeightRecords();
    
    // 保存到本地存储
    saveDataToLocalStorage();
}

// 限制只保存最近12周的体重数据
function limitWeightRecords() {
    const keys = Object.keys(appData.weightRecords).sort();
    
    if (keys.length > 12) {
        // 删除最早的记录，只保留最近12周
        const keysToRemove = keys.slice(0, keys.length - 12);
        keysToRemove.forEach(key => {
            delete appData.weightRecords[key];
        });
    }
}

// 初始化体重图表
function initWeightChart() {
    const weightChartCtx = document.getElementById('weight-chart').getContext('2d');
    
    window.weightChart = new Chart(weightChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '体重 (kg)',
                data: [],
                borderColor: '#007aff',
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        display: true,
                        color: 'rgba(200, 200, 200, 0.2)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // 更新体重图表数据
    updateWeightChart();
}

// 更新体重图表
function updateWeightChart() {
    // 获取体重记录数据
    const keys = Object.keys(appData.weightRecords).sort();
    let labels = [];
    let data = [];
    
    // 根据选择的视图模式处理数据
    if (appData.weightChartMode === 'week') {
        // 周视图: 显示每周数据
        keys.forEach(key => {
            const [year, week] = key.split('-');
            labels.push(`第${week}周`);
            data.push(appData.weightRecords[key]);
        });
    } else if (appData.weightChartMode === 'biweek') {
        // 双周视图: 每两周显示一个数据点
        for (let i = 0; i < keys.length; i += 2) {
            const key = keys[i];
            const [year, week] = key.split('-');
            
            // 如果有下一个数据点，则计算平均值
            if (i + 1 < keys.length) {
                const nextKey = keys[i + 1];
                const avgWeight = (appData.weightRecords[key] + appData.weightRecords[nextKey]) / 2;
                labels.push(`第${week}-${parseInt(week) + 1}周`);
                data.push(avgWeight);
            } else {
                // 如果是最后一个点，直接使用
                labels.push(`第${week}周`);
                data.push(appData.weightRecords[key]);
            }
        }
    } else if (appData.weightChartMode === 'month') {
        // 月视图: 按月份分组
        const monthData = {};
        
        keys.forEach(key => {
            const [year, week] = key.split('-');
            const date = getDateFromWeek(parseInt(year), parseInt(week));
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            
            if (!monthData[monthKey]) {
                monthData[monthKey] = {
                    sum: 0,
                    count: 0
                };
            }
            
            monthData[monthKey].sum += appData.weightRecords[key];
            monthData[monthKey].count++;
        });
        
        // 计算每月平均值
        Object.keys(monthData).sort().forEach(monthKey => {
            const [year, month] = monthKey.split('-');
            const avg = monthData[monthKey].sum / monthData[monthKey].count;
            labels.push(`${year}年${month}月`);
            data.push(avg);
        });
    }
    
    // 更新图表数据
    window.weightChart.data.labels = labels;
    window.weightChart.data.datasets[0].data = data;
    
    // 如果有数据，设置合适的Y轴范围
    if (data.length > 0) {
        const minWeight = Math.min(...data) * 0.95; // 稍微低于最小值
        const maxWeight = Math.max(...data) * 1.05; // 稍微高于最大值
        
        window.weightChart.options.scales.y.min = minWeight;
        window.weightChart.options.scales.y.max = maxWeight;
    }
    
    window.weightChart.update();
}

// 从周数获取日期
function getDateFromWeek(year, week) {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (week - 1) * 7;
    const resultDate = new Date(firstDayOfYear);
    resultDate.setDate(firstDayOfYear.getDate() + daysOffset);
    return resultDate;
}

// 初始化体重历史记录列表
function initWeightRecordsList() {
    // 监听删除体重记录按钮
    document.getElementById('weight-records-list').addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-weight-record')) {
            const weekKey = e.target.getAttribute('data-week');
            deleteWeightRecord(weekKey);
        }
    });
}

// 更新体重历史记录列表
function updateWeightRecordsList() {
    const recordsList = document.getElementById('weight-records-list');
    recordsList.innerHTML = '';
    
    const keys = Object.keys(appData.weightRecords).sort().reverse(); // 最新的记录在前面
    
    if (keys.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-records';
        emptyMessage.textContent = '暂无体重记录';
        recordsList.appendChild(emptyMessage);
        return;
    }
    
    keys.forEach(key => {
        const [year, week] = key.split('-');
        const weight = appData.weightRecords[key];
        
        // 创建记录项
        const recordItem = document.createElement('div');
        recordItem.className = 'weight-record-item';
        recordItem.innerHTML = `
            <div class="weight-record-date">${year}年第${week}周</div>
            <div class="weight-record-value">${weight} kg</div>
            <div class="weight-record-actions">
                <button class="delete-weight-record" data-week="${key}">删除</button>
            </div>
        `;
        
        recordsList.appendChild(recordItem);
    });
}

// 删除体重记录
function deleteWeightRecord(weekKey) {
    // 确认删除
    if (confirm(`确定要删除 ${weekKey.replace('-', '年第')}周 的体重记录吗？`)) {
        // 删除记录
        delete appData.weightRecords[weekKey];
        
        // 更新UI
        updateWeightRecordsList();
        updateWeightChart();
        
        // 保存到本地存储
        saveDataToLocalStorage();
    }
}

// 计算总卡路里
function calculateTotalCalories(macros) {
    return macros.protein * 4 + macros.carbs * 4 + macros.fat * 9;
}

// 计算餐食的营养总和
function calculateMealTotals(mealType) {
    const currentDayData = appData.dailyRecords[appData.currentDate];
    
    if (!currentDayData || !currentDayData.meals[mealType]) {
        return { protein: 0, carbs: 0, fat: 0 };
    }
    
    return currentDayData.meals[mealType].reduce((totals, food) => {
        totals.protein += food.protein;
        totals.carbs += food.carbs;
        totals.fat += food.fat;
        return totals;
    }, { protein: 0, carbs: 0, fat: 0 });
}

// 更新餐食列表显示
function updateMealLists() {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    const currentDayData = appData.dailyRecords[appData.currentDate];
    
    mealTypes.forEach(mealType => {
        const mealList = document.getElementById(`${mealType}-list`);
        const mealFoods = currentDayData ? currentDayData.meals[mealType] : [];
        
        // 清空当前列表
        mealList.innerHTML = '';
        
        if (!mealFoods || mealFoods.length === 0) {
            // 如果没有食物，显示空状态
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-meal';
            emptyDiv.textContent = `还没有添加${getMealTypeName(mealType)}食物`;
            mealList.appendChild(emptyDiv);
        } else {
            // 添加每个食物项
            mealFoods.forEach(food => {
                const foodItem = document.createElement('div');
                foodItem.className = 'food-item';
                foodItem.innerHTML = `
                    <div class="food-name">${food.name}</div>
                    <div class="food-macros">
                        <span>蛋白质: ${food.protein}g</span>
                        <span>碳水: ${food.carbs}g</span>
                        <span>脂肪: ${food.fat}g</span>
                    </div>
                    <div class="food-actions">
                        <button class="delete-food" data-id="${food.id}">删除</button>
                    </div>
                `;
                
                // 添加删除按钮事件
                mealList.appendChild(foodItem);
                foodItem.querySelector('.delete-food').addEventListener('click', function() {
                    deleteFood(mealType, food.id);
                });
            });
        }
        
        // 更新餐食总计
        updateMealSummary(mealType);
    });
}

// 更新餐食总计
function updateMealSummary(mealType) {
    const mealTotals = calculateMealTotals(mealType);
    const totalCalories = calculateTotalCalories(mealTotals);
    
    document.getElementById(`${mealType}-total-protein`).textContent = mealTotals.protein;
    document.getElementById(`${mealType}-total-carbs`).textContent = mealTotals.carbs;
    document.getElementById(`${mealType}-total-fat`).textContent = mealTotals.fat;
    document.getElementById(`${mealType}-total-calories`).textContent = totalCalories;
}

// 获取餐食类型的中文名称
function getMealTypeName(mealType) {
    const names = {
        'breakfast': '早餐',
        'lunch': '午餐',
        'dinner': '晚餐',
        'snack': '加餐'
    };
    
    return names[mealType] || mealType;
}

// 更新所有显示
function updateAllDisplays() {
    updateDisplayDate();
    updateCaloriesChart();
    updateNutritionChart();
    updateNutritionOverview();
    updateMealLists();
    updateWeightInput();
}

// 保存数据到本地存储
function saveDataToLocalStorage() {
    localStorage.setItem('nutritionAppData', JSON.stringify(appData));
}

// 从本地存储加载数据
function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('nutritionAppData');
    
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // 更新全局数据
        appData.goals = parsedData.goals || appData.goals;
        appData.dailyRecords = parsedData.dailyRecords || {};
        appData.weightRecords = parsedData.weightRecords || {};
        appData.weightChartMode = parsedData.weightChartMode || 'week';
        
        // 如果存在当前日期，使用它，否则使用今天
        appData.currentDate = parsedData.currentDate || formatDate(new Date());
        
        // 更新当前日期输入框
        document.getElementById('current-date').value = appData.currentDate;
        
        // 更新输入框的值
        document.getElementById('protein-goal').value = appData.goals.protein;
        document.getElementById('carbs-goal').value = appData.goals.carbs;
        document.getElementById('fat-goal').value = appData.goals.fat;
        
        // 更新体重图表模式按钮
        const chartModeButtons = document.querySelectorAll('.chart-period-btn');
        chartModeButtons.forEach(btn => {
            if (btn.getAttribute('data-period') === appData.weightChartMode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
} 