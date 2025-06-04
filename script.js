// 全局变量
let currentUser = JSON.parse(localStorage.getItem('pybegin_user')) || { name: '', progress: {} };
let homeworkData = JSON.parse(localStorage.getItem('pybegin_homework')) || [];
let videoPlaylist = JSON.parse(localStorage.getItem('pybegin_videos')) || [];
let userBadges = JSON.parse(localStorage.getItem('pybegin_badges')) || [];

// 学习目标数据
const learningGoals = {
    1: [
        {
            week: "第1周",
            title: "个人信息卡片生成器",
            description: "学习Python基础语法、变量、字符串操作",
            skills: ["print()", "input()", "f-string", "文件操作"]
        },
        {
            week: "第2周", 
            title: "智能计算器",
            description: "条件判断、循环、异常处理",
            skills: ["if/elif/else", "while循环", "try/except", "列表操作"]
        },
        {
            week: "第3周",
            title: "学生成绩管理系统", 
            description: "列表、字典、函数封装",
            skills: ["字典操作", "函数定义", "数据统计", "排序算法"]
        },
        {
            week: "第4周",
            title: "密码管理器",
            description: "文件操作、加密、数据持久化", 
            skills: ["CSV文件", "加密算法", "正则表达式", "数据验证"]
        },
        {
            week: "第5周",
            title: "待办事项管理器",
            description: "类与对象、日期时间处理",
            skills: ["面向对象", "datetime", "JSON操作", "优先级管理"]
        },
        {
            week: "第6周",
            title: "简单文本编辑器",
            description: "文件读写、字符串处理",
            skills: ["文件I/O", "字符编码", "搜索替换", "文本统计"]
        },
        {
            week: "第7周", 
            title: "网络爬虫基础",
            description: "HTTP请求、HTML解析",
            skills: ["requests库", "BeautifulSoup", "数据提取", "异常处理"]
        },
        {
            week: "第8周",
            title: "数据可视化图表",
            description: "matplotlib基础应用",
            skills: ["matplotlib", "数据分析", "图表绘制", "样式设置"]
        },
        {
            week: "第9周",
            title: "RSS阅读器", 
            description: "XML解析、定时任务",
            skills: ["XML处理", "feedparser", "定时器", "数据存储"]
        },
        {
            week: "第10周",
            title: "简单游戏开发",
            description: "pygame基础游戏编程",
            skills: ["pygame", "事件处理", "图形绘制", "游戏循环"]
        },
        {
            week: "第11周",
            title: "邮件自动化工具",
            description: "SMTP协议、邮件发送",
            skills: ["smtplib", "email库", "附件处理", "模板系统"]
        },
        {
            week: "第12周",
            title: "系统监控工具",
            description: "系统信息获取、性能监控",
            skills: ["psutil", "系统调用", "性能指标", "报告生成"]
        }
    ],
    2: [
        {
            week: "第13周",
            title: "Flask Web基础",
            description: "Web框架入门、路由系统",
            skills: ["Flask框架", "路由设计", "模板引擎", "静态文件"]
        },
        {
            week: "第14周",
            title: "用户注册登录系统",
            description: "表单处理、会话管理",
            skills: ["表单验证", "Session", "Cookie", "密码哈希"]
        },
        {
            week: "第15周",
            title: "博客系统开发",
            description: "数据库操作、CRUD功能",
            skills: ["SQLite", "ORM", "分页", "富文本编辑"]
        },
        // ... 更多Web开发项目
    ],
    3: [
        {
            week: "第26周",
            title: "Tkinter桌面应用",
            description: "GUI编程基础",
            skills: ["Tkinter", "控件使用", "事件绑定", "布局管理"]
        },
        // ... 更多桌面应用项目
    ],
    4: [
        {
            week: "第39周", 
            title: "电商网站开发",
            description: "大型Web应用开发",
            skills: ["Django", "支付集成", "搜索引擎", "缓存优化"]
        },
        // ... 更多综合项目
    ]
};

// Python库文档数据
const pythonLibraries = {
    basic: [
        {
            name: "os",
            description: "操作系统接口模块，提供文件和目录操作功能",
            icon: "fas fa-folder",
            tags: ["文件操作", "系统调用", "路径处理"],
            examples: ["os.listdir()", "os.path.join()", "os.makedirs()"]
        },
        {
            name: "datetime", 
            description: "日期时间处理模块",
            icon: "fas fa-clock",
            tags: ["日期", "时间", "格式化"],
            examples: ["datetime.now()", "strftime()", "timedelta()"]
        },
        {
            name: "json",
            description: "JSON数据处理模块",
            icon: "fas fa-code",
            tags: ["数据格式", "序列化", "API"],
            examples: ["json.loads()", "json.dumps()", "json.load()"]
        },
        {
            name: "re",
            description: "正则表达式模块",
            icon: "fas fa-search", 
            tags: ["文本匹配", "模式", "搜索"],
            examples: ["re.search()", "re.findall()", "re.sub()"]
        }
    ],
    web: [
        {
            name: "Flask",
            description: "轻量级Web应用框架",
            icon: "fas fa-globe",
            tags: ["Web框架", "路由", "模板"],
            examples: ["@app.route()", "render_template()", "request.form"]
        },
        {
            name: "requests",
            description: "HTTP请求库",
            icon: "fas fa-download",
            tags: ["HTTP", "API", "爬虫"],
            examples: ["requests.get()", "requests.post()", "response.json()"]
        }
    ],
    data: [
        {
            name: "pandas",
            description: "数据分析和操作库",
            icon: "fas fa-chart-bar",
            tags: ["数据分析", "DataFrame", "CSV"],
            examples: ["pd.read_csv()", "df.groupby()", "df.plot()"]
        },
        {
            name: "matplotlib", 
            description: "数据可视化库",
            icon: "fas fa-chart-line",
            tags: ["图表", "可视化", "绘图"],
            examples: ["plt.plot()", "plt.show()", "plt.subplot()"]
        }
    ],
    gui: [
        {
            name: "tkinter",
            description: "Python标准GUI库",
            icon: "fas fa-window-maximize",
            tags: ["GUI", "桌面应用", "界面"],
            examples: ["tk.Tk()", "tk.Button()", "tk.mainloop()"]
        }
    ]
};

// 勋章系统数据
const badgeSystem = [
    { id: 'first_homework', name: '初次提交', icon: '🎯', description: '完成第一次作业提交' },
    { id: 'week_1', name: '第一周达人', icon: '🥇', description: '完成第1周学习目标' },
    { id: 'week_5', name: '基础扎实', icon: '🏆', description: '完成前5周学习' },
    { id: 'homework_10', name: '勤奋学者', icon: '📚', description: '提交10次作业' },
    { id: 'quarter_1', name: '基础大师', icon: '🎓', description: '完成第一季度学习' },
    { id: 'video_learner', name: '视频达人', icon: '🎬', description: '观看超过10个视频' },
    { id: 'doc_explorer', name: '文档探索者', icon: '📖', description: '查阅超过20个库文档' }
];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserData();
    renderLearningGoals();
    renderHomeworkList();
    renderVideoPlaylist();
    renderPythonDocs();
    renderBadges();
    updateStats();
});

// 初始化应用
function initializeApp() {
    // 设置默认用户数据
    if (!currentUser.name) {
        currentUser = {
            name: '',
            progress: {},
            badges: [],
            homeworkCount: 0,
            videoCount: 0,
            docCount: 0
        };
    }
    
    // 生成作业周次选项
    const homeworkWeekSelect = document.getElementById('homeworkWeek');
    for (let quarter = 1; quarter <= 4; quarter++) {
        if (learningGoals[quarter]) {
            learningGoals[quarter].forEach(goal => {
                const option = document.createElement('option');
                option.value = goal.week;
                option.textContent = `${goal.week}: ${goal.title}`;
                homeworkWeekSelect.appendChild(option);
            });
        }
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 导航菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // 移动端菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // 季度标签切换
    document.querySelectorAll('.quarter-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', handleQuarterTab);
    });
    
    // 文档分类标签切换  
    document.querySelectorAll('.category-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', handleCategoryTab);
    });
    
    // 作业上传
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    
    fileInput?.addEventListener('change', handleFileSelect);
    uploadArea?.addEventListener('dragover', handleDragOver);
    uploadArea?.addEventListener('drop', handleDrop);
    uploadArea?.addEventListener('dragleave', handleDragLeave);
    
    // 提交作业
    document.getElementById('submitHomework')?.addEventListener('click', submitHomework);
    
    // 个人信息保存
    document.getElementById('saveProfile')?.addEventListener('click', saveProfile);
    
    // 视频相关
    document.getElementById('loadVideo')?.addEventListener('click', loadVideo);
    document.getElementById('addEpisode')?.addEventListener('click', addEpisode);
    
    // 文档搜索
    document.getElementById('searchDocs')?.addEventListener('click', searchDocs);
    
    // 模态框关闭
    document.querySelector('.close')?.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

// 导航处理
function handleNavigation(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    
    // 更新导航状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // 显示对应区域
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(targetId)?.classList.add('active');
    
    // 移动端关闭菜单
    document.querySelector('.nav-menu')?.classList.remove('active');
}

// 季度标签切换
function handleQuarterTab(e) {
    const quarter = e.target.getAttribute('data-quarter');
    
    document.querySelectorAll('.quarter-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    document.querySelectorAll('.quarter-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector(`[data-quarter="${quarter}"]`)?.classList.add('active');
}

// 文档分类标签切换
function handleCategoryTab(e) {
    const category = e.target.getAttribute('data-category');
    
    document.querySelectorAll('.category-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    renderPythonDocs(category);
}

// 渲染学习目标
function renderLearningGoals() {
    Object.keys(learningGoals).forEach(quarter => {
        const container = document.getElementById(`quarter${quarter}Goals`);
        if (!container) return;
        
        container.innerHTML = learningGoals[quarter].map(goal => {
            const isCompleted = currentUser.progress[goal.week] || false;
            return `
                <div class="goal-item ${isCompleted ? 'completed' : ''}" data-week="${goal.week}">
                    <div class="goal-week">${goal.week}</div>
                    <div class="goal-title">${goal.title}</div>
                    <div class="goal-description">${goal.description}</div>
                    <div class="goal-skills">
                        ${goal.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
        }).join('');
    });
}

// 保存数据到localStorage
function saveData() {
    localStorage.setItem('pybegin_user', JSON.stringify(currentUser));
    localStorage.setItem('pybegin_homework', JSON.stringify(homeworkData));
    localStorage.setItem('pybegin_videos', JSON.stringify(videoPlaylist));
    localStorage.setItem('pybegin_badges', JSON.stringify(userBadges));
}

// 加载用户数据
function loadUserData() {
    const userName = document.getElementById('userName');
    if (userName && currentUser.name) {
        userName.value = currentUser.name;
    }
}

// 更新统计数据
function updateStats() {
    const completedGoals = Object.values(currentUser.progress).filter(Boolean).length;
    const totalBadges = userBadges.filter(badge => badge.earned).length;
    const submittedHomework = homeworkData.length;
    
    document.getElementById('completedGoals').textContent = completedGoals;
    document.getElementById('totalBadges').textContent = totalBadges;
    document.getElementById('submittedHomework').textContent = submittedHomework;
    
    // 更新进度条
    const totalGoals = Object.values(learningGoals).reduce((sum, goals) => sum + goals.length, 0);
    const progressPercent = Math.round((completedGoals / totalGoals) * 100);
    
    const progressFill = document.getElementById('overallProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressFill && progressText) {
        progressFill.style.width = `${progressPercent}%`;
        progressText.textContent = `${progressPercent}%`;
    }
}

// 显示通知
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 检查并授予勋章
function checkAndAwardBadges() {
    const newBadges = [];
    
    badgeSystem.forEach(badge => {
        const alreadyEarned = userBadges.find(b => b.id === badge.id && b.earned);
        if (alreadyEarned) return;
        
        let shouldAward = false;
        
        switch (badge.id) {
            case 'first_homework':
                shouldAward = homeworkData.length >= 1;
                break;
            case 'week_1':
                shouldAward = currentUser.progress['第1周'];
                break;
            case 'week_5':
                shouldAward = Object.keys(currentUser.progress).filter(week => 
                    currentUser.progress[week] && parseInt(week.match(/\d+/)[0]) <= 5
                ).length >= 5;
                break;
            case 'homework_10':
                shouldAward = homeworkData.length >= 10;
                break;
            case 'quarter_1':
                shouldAward = learningGoals[1].every(goal => currentUser.progress[goal.week]);
                break;
            case 'video_learner':
                shouldAward = (currentUser.videoCount || 0) >= 10;
                break;
            case 'doc_explorer':
                shouldAward = (currentUser.docCount || 0) >= 20;
                break;
        }
        
        if (shouldAward) {
            const existingBadge = userBadges.find(b => b.id === badge.id);
            if (existingBadge) {
                existingBadge.earned = true;
            } else {
                userBadges.push({ ...badge, earned: true });
            }
            newBadges.push(badge);
        }
    });
    
    if (newBadges.length > 0) {
        newBadges.forEach(badge => {
            showNotification(`🎉 获得新勋章: ${badge.name}!`, 'success');
        });
        renderBadges();
        updateStats();
    }
}

// 渲染勋章
function renderBadges() {
    const container = document.getElementById('badgesContainer');
    if (!container) return;
    
    container.innerHTML = badgeSystem.map(badge => {
        const userBadge = userBadges.find(b => b.id === badge.id);
        const earned = userBadge?.earned || false;
        
        return `
            <div class="badge-item ${earned ? 'earned' : ''}" title="${badge.description}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
            </div>
        `;
    }).join('');
}

// 文件上传处理
function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    displaySelectedFiles(files);
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    displaySelectedFiles(files);
    
    // 更新文件输入框
    const fileInput = document.getElementById('fileInput');
    fileInput.files = e.dataTransfer.files;
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
}

function displaySelectedFiles(files) {
    const uploadArea = document.getElementById('uploadArea');
    const existingFileList = uploadArea.querySelector('.file-preview');
    
    if (existingFileList) {
        existingFileList.remove();
    }
    
    if (files.length > 0) {
        const filePreview = document.createElement('div');
        filePreview.className = 'file-preview';
        filePreview.innerHTML = `
            <h4>已选择文件：</h4>
            <ul>
                ${files.map(file => `
                    <li>
                        <i class="fas ${getFileIcon(file.name)}"></i>
                        ${file.name} (${formatFileSize(file.size)})
                    </li>
                `).join('')}
            </ul>
        `;
        uploadArea.appendChild(filePreview);
    }
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const iconMap = {
        'py': 'fa-code',
        'zip': 'fa-file-archive',
        'md': 'fa-file-alt',
        'txt': 'fa-file-alt'
    };
    return iconMap[ext] || 'fa-file';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 提交作业
function submitHomework() {
    const fileInput = document.getElementById('fileInput');
    const homeworkWeek = document.getElementById('homeworkWeek').value;
    const homeworkNotes = document.getElementById('homeworkNotes').value;
    
    if (!fileInput.files.length) {
        showNotification('请选择作业文件', 'error');
        return;
    }
    
    if (!homeworkWeek) {
        showNotification('请选择作业周次', 'error');
        return;
    }
    
    // 创建作业记录
    const homework = {
        id: Date.now(),
        week: homeworkWeek,
        files: Array.from(fileInput.files).map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            // 在实际应用中，这里应该上传到服务器
            content: null // 简化处理，实际应存储文件内容或服务器路径
        })),
        notes: homeworkNotes,
        submitTime: new Date().toISOString(),
        status: 'submitted'
    };
    
    // 读取文件内容（仅用于演示）
    const filePromises = Array.from(fileInput.files).map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve({
                    name: file.name,
                    content: e.target.result,
                    size: file.size,
                    type: file.type
                });
            };
            reader.readAsText(file);
        });
    });
    
    Promise.all(filePromises).then(fileContents => {
        homework.files = fileContents;
        homeworkData.push(homework);
        
        // 更新学习进度
        currentUser.progress[homeworkWeek] = true;
        currentUser.homeworkCount = (currentUser.homeworkCount || 0) + 1;
        
        saveData();
        renderHomeworkList();
        renderLearningGoals();
        checkAndAwardBadges();
        updateStats();
        
        // 清空表单
        fileInput.value = '';
        document.getElementById('homeworkWeek').value = '';
        document.getElementById('homeworkNotes').value = '';
        document.querySelector('.file-preview')?.remove();
        
        showNotification('作业提交成功！', 'success');
    });
}

// 渲染作业列表
function renderHomeworkList() {
    const container = document.getElementById('homeworkList');
    if (!container) return;
    
    if (homeworkData.length === 0) {
        container.innerHTML = '<p class="no-data">暂无提交的作业</p>';
        return;
    }
    
    container.innerHTML = homeworkData
        .sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime))
        .map(homework => `
            <div class="homework-item">
                <div class="homework-header">
                    <div class="homework-title">${homework.week}</div>
                    <div class="homework-status ${homework.status}">${getStatusText(homework.status)}</div>
                </div>
                <div class="homework-meta">
                    提交时间: ${new Date(homework.submitTime).toLocaleString()}
                </div>
                <div class="homework-files">
                    ${homework.files.map(file => `
                        <span class="file-tag">
                            <i class="fas ${getFileIcon(file.name)}"></i>
                            ${file.name}
                        </span>
                    `).join('')}
                </div>
                ${homework.notes ? `<div class="homework-notes">${homework.notes}</div>` : ''}
                <div class="homework-actions">
                    <button class="btn-primary" onclick="previewHomework(${homework.id})">预览</button>
                    <button class="btn-secondary" onclick="downloadHomework(${homework.id})">下载</button>
                    <button class="btn-danger" onclick="deleteHomework(${homework.id})">删除</button>
                </div>
            </div>
        `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'submitted': '已提交',
        'reviewed': '已批阅',
        'passed': '已通过'
    };
    return statusMap[status] || '未知';
}

// 预览作业
function previewHomework(homeworkId) {
    const homework = homeworkData.find(h => h.id === homeworkId);
    if (!homework) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>${homework.week} - 作业预览</h3>
        <div class="homework-preview">
            <div class="preview-meta">
                <p><strong>提交时间:</strong> ${new Date(homework.submitTime).toLocaleString()}</p>
                <p><strong>文件数量:</strong> ${homework.files.length}</p>
                ${homework.notes ? `<p><strong>说明:</strong> ${homework.notes}</p>` : ''}
            </div>
            <div class="preview-files">
                ${homework.files.map(file => `
                    <div class="preview-file">
                        <h4><i class="fas ${getFileIcon(file.name)}"></i> ${file.name}</h4>
                        <div class="file-content">
                            ${file.type.startsWith('text/') || file.name.endsWith('.py') || file.name.endsWith('.md') ?
                                `<pre><code>${escapeHtml(file.content || '文件内容无法预览')}</code></pre>` :
                                '<p>二进制文件无法预览</p>'
                            }
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('modal').style.display = 'block';
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// 下载作业
function downloadHomework(homeworkId) {
    const homework = homeworkData.find(h => h.id === homeworkId);
    if (!homework) return;
    
    if (homework.files.length === 1) {
        // 单个文件直接下载
        downloadFile(homework.files[0]);
    } else {
        // 多个文件打包下载
        downloadMultipleFiles(homework);
    }
}

function downloadFile(file) {
    const blob = new Blob([file.content || ''], { type: file.type || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function downloadMultipleFiles(homework) {
    // 简化实现：创建一个包含所有文件信息的文本文件
    const content = homework.files.map(file => 
        `=== ${file.name} ===\n${file.content || '文件内容无法导出'}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${homework.week}-作业包.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 删除作业
function deleteHomework(homeworkId) {
    if (!confirm('确定要删除这个作业吗？此操作不可恢复。')) return;
    
    const index = homeworkData.findIndex(h => h.id === homeworkId);
    if (index > -1) {
        const homework = homeworkData[index];
        homeworkData.splice(index, 1);
        
        // 更新进度（如果这是该周唯一的作业）
        const hasOtherHomework = homeworkData.some(h => h.week === homework.week);
        if (!hasOtherHomework) {
            currentUser.progress[homework.week] = false;
        }
        
        currentUser.homeworkCount = Math.max(0, (currentUser.homeworkCount || 0) - 1);
        
        saveData();
        renderHomeworkList();
        renderLearningGoals();
        updateStats();
        
        showNotification('作业已删除', 'success');
    }
}

// 保存个人信息
function saveProfile() {
    const userName = document.getElementById('userName').value.trim();
    
    if (!userName) {
        showNotification('请输入您的姓名', 'error');
        return;
    }
    
    currentUser.name = userName;
    saveData();
    showNotification('个人信息保存成功', 'success');
}

// 视频功能
function loadVideo() {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    if (!videoUrl) {
        showNotification('请输入视频链接', 'error');
        return;
    }
    
    const embedUrl = convertToEmbedUrl(videoUrl);
    if (embedUrl) {
        document.getElementById('videoFrame').src = embedUrl;
        currentUser.videoCount = (currentUser.videoCount || 0) + 1;
        saveData();
        checkAndAwardBadges();
        showNotification('视频加载成功', 'success');
    } else {
        showNotification('不支持的视频链接格式', 'error');
    }
}

function convertToEmbedUrl(url) {
    // YouTube
    if (url.includes('youtube.com/watch')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    
    // YouTube短链接
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    
    // Bilibili
    if (url.includes('bilibili.com/video/')) {
        const bvid = url.match(/\/video\/([^/?]+)/)?.[1];
        return bvid ? `https://player.bilibili.com/player.html?bvid=${bvid}` : null;
    }
    
    // 直接嵌入链接
    if (url.includes('embed')) {
        return url;
    }
    
    return null;
}

function addEpisode() {
    const title = document.getElementById('episodeTitle').value.trim();
    const url = document.getElementById('episodeUrl').value.trim();
    
    if (!title || !url) {
        showNotification('请填写集数标题和链接', 'error');
        return;
    }
    
    const episode = {
        id: Date.now(),
        title,
        url,
        embedUrl: convertToEmbedUrl(url),
        addTime: new Date().toISOString()
    };
    
    if (!episode.embedUrl) {
        showNotification('视频链接格式不正确', 'error');
        return;
    }
    
    videoPlaylist.push(episode);
    saveData();
    renderVideoPlaylist();
    
    // 清空输入框
    document.getElementById('episodeTitle').value = '';
    document.getElementById('episodeUrl').value = '';
    
    showNotification('视频集数添加成功', 'success');
}

function renderVideoPlaylist() {
    const container = document.getElementById('videoList');
    if (!container) return;
    
    if (videoPlaylist.length === 0) {
        container.innerHTML = '<p class="no-data">暂无视频</p>';
        return;
    }
    
    container.innerHTML = videoPlaylist.map(episode => `
        <div class="episode-item" onclick="playEpisode(${episode.id})">
            <div class="episode-title">${episode.title}</div>
            <div class="episode-duration">添加时间: ${new Date(episode.addTime).toLocaleDateString()}</div>
            <button class="btn-danger" onclick="deleteEpisode(event, ${episode.id})">删除</button>
        </div>
    `).join('');
}

function playEpisode(episodeId) {
    const episode = videoPlaylist.find(e => e.id === episodeId);
    if (!episode) return;
    
    document.getElementById('videoFrame').src = episode.embedUrl;
    document.getElementById('videoUrl').value = episode.url;
    
    // 更新激活状态
    document.querySelectorAll('.episode-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    currentUser.videoCount = (currentUser.videoCount || 0) + 1;
    saveData();
    checkAndAwardBadges();
}

function deleteEpisode(event, episodeId) {
    event.stopPropagation();
    
    if (!confirm('确定要删除这个视频集数吗？')) return;
    
    const index = videoPlaylist.findIndex(e => e.id === episodeId);
    if (index > -1) {
        videoPlaylist.splice(index, 1);
        saveData();
        renderVideoPlaylist();
        showNotification('视频集数已删除', 'success');
    }
}

// Python文档功能
function renderPythonDocs(category = 'basic') {
    const container = document.getElementById('docsGrid');
    if (!container) return;
    
    const libraries = pythonLibraries[category] || [];
    
    container.innerHTML = libraries.map(lib => `
        <div class="doc-item" onclick="showDocDetail('${lib.name}', '${category}')">
            <div class="doc-icon">
                <i class="${lib.icon}"></i>
            </div>
            <div class="doc-title">${lib.name}</div>
            <div class="doc-description">${lib.description}</div>
            <div class="doc-tags">
                ${lib.tags.map(tag => `<span class="doc-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function showDocDetail(libName, category) {
    const lib = pythonLibraries[category]?.find(l => l.name === libName);
    if (!lib) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="doc-detail">
            <h2><i class="${lib.icon}"></i> ${lib.name}</h2>
            <p class="doc-description">${lib.description}</p>
            
            <h3>标签</h3>
            <div class="doc-tags">
                ${lib.tags.map(tag => `<span class="doc-tag">${tag}</span>`).join('')}
            </div>
            
            <h3>常用方法</h3>
            <ul class="doc-examples">
                ${lib.examples.map(example => `<li><code>${example}</code></li>`).join('')}
            </ul>
            
            <h3>学习资源</h3>
            <div class="doc-resources">
                <a href="https://docs.python.org/3/library/${lib.name.toLowerCase()}.html" target="_blank" class="btn-primary">
                    官方文档
                </a>
                <a href="https://www.google.com/search?q=python+${lib.name}+tutorial" target="_blank" class="btn-secondary">
                    教程搜索
                </a>
            </div>
        </div>
    `;
    
    document.getElementById('modal').style.display = 'block';
    
    // 增加文档查看计数
    currentUser.docCount = (currentUser.docCount || 0) + 1;
    saveData();
    checkAndAwardBadges();
}

function searchDocs() {
    const searchTerm = document.getElementById('docSearch').value.toLowerCase().trim();
    if (!searchTerm) {
        showNotification('请输入搜索关键词', 'error');
        return;
    }
    
    // 搜索所有分类的库
    const allLibs = [];
    Object.keys(pythonLibraries).forEach(category => {
        pythonLibraries[category].forEach(lib => {
            if (lib.name.toLowerCase().includes(searchTerm) ||
                lib.description.toLowerCase().includes(searchTerm) ||
                lib.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
                allLibs.push({ ...lib, category });
            }
        });
    });
    
    const container = document.getElementById('docsGrid');
    if (allLibs.length === 0) {
        container.innerHTML = '<p class="no-data">未找到相关文档</p>';
        return;
    }
    
    container.innerHTML = allLibs.map(lib => `
        <div class="doc-item" onclick="showDocDetail('${lib.name}', '${lib.category}')">
            <div class="doc-icon">
                <i class="${lib.icon}"></i>
            </div>
            <div class="doc-title">${lib.name}</div>
            <div class="doc-description">${lib.description}</div>
            <div class="doc-tags">
                ${lib.tags.map(tag => `<span class="doc-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    showNotification(`找到 ${allLibs.length} 个相关文档`, 'success');
}

// 模态框功能
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// 导出数据功能
function exportData() {
    const data = {
        user: currentUser,
        homework: homeworkData,
        videos: videoPlaylist,
        badges: userBadges,
        exportTime: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PyBegin-学习数据-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('学习数据导出成功', 'success');
}

// 导入数据功能
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.user) currentUser = data.user;
            if (data.homework) homeworkData = data.homework;
            if (data.videos) videoPlaylist = data.videos;
            if (data.badges) userBadges = data.badges;
            
            saveData();
            loadUserData();
            renderLearningGoals();
            renderHomeworkList();
            renderVideoPlaylist();
            renderBadges();
            updateStats();
            
            showNotification('学习数据导入成功', 'success');
        } catch (error) {
            showNotification('数据格式错误，导入失败', 'error');
        }
    };
    reader.readAsText(file);
}

// 重置数据功能
function resetAllData() {
    if (!confirm('确定要重置所有学习数据吗？此操作不可恢复！')) return;
    
    localStorage.removeItem('pybegin_user');
    localStorage.removeItem('pybegin_homework');
    localStorage.removeItem('pybegin_videos');
    localStorage.removeItem('pybegin_badges');
    
    // 重新初始化
    currentUser = { name: '', progress: {}, badges: [], homeworkCount: 0, videoCount: 0, docCount: 0 };
    homeworkData = [];
    videoPlaylist = [];
    userBadges = [];
    
    // 重新渲染所有内容
    loadUserData();
    renderLearningGoals();
    renderHomeworkList();
    renderVideoPlaylist();
    renderPythonDocs();
    renderBadges();
    updateStats();
    
    showNotification('所有数据已重置', 'success');
}

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S: 保存个人信息
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProfile();
    }
    
    // Escape: 关闭模态框
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl/Cmd + E: 导出数据
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportData();
    }
});

// 页面可见性API - 当页面重新获得焦点时刷新数据
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateStats();
        checkAndAwardBadges();
    }
});

// 定期保存数据（每30秒）
setInterval(saveData, 30000);

// 页面卸载前保存数据
window.addEventListener('beforeunload', function() {
    saveData();
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('应用错误:', e.error);
    showNotification('应用出现错误，请刷新页面', 'error');
});

// 工具函数：格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 工具函数：计算学习天数
function calculateStudyDays() {
    const firstHomework = homeworkData.sort((a, b) => new Date(a.submitTime) - new Date(b.submitTime))[0];
    if (!firstHomework) return 0;
    
    const startDate = new Date(firstHomework.submitTime);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

// 工具函数：获取学习统计
function getStudyStats() {
    return {
        totalGoals: Object.values(learningGoals).reduce((sum, goals) => sum + goals.length, 0),
        completedGoals: Object.values(currentUser.progress).filter(Boolean).length,
        totalHomework: homeworkData.length,
        totalVideos: videoPlaylist.length,
        totalBadges: userBadges.filter(badge => badge.earned).length,
        studyDays: calculateStudyDays()
    };
}

// 添加右键菜单功能（可选）
document.addEventListener('contextmenu', function(e) {
    // 在作业项上右键显示快捷菜单
    if (e.target.closest('.homework-item')) {
        e.preventDefault();
        // 这里可以添加右键菜单逻辑
    }
});

console.log('PyBegin 学习平台已初始化完成！');