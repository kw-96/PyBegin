// PyBegin 学习平台 JavaScript 代码
// 全局变量定义
let currentUser = {
    name: '',
    progress: {},
    badges: [],
    homeworkCount: 0,
    videoCount: 0,
    docCount: 0
};

let homeworkData = [];
let videoPlaylist = [];
let userBadges = [];

// 学习目标数据
const learningGoals = {
    1: [
        {
            week: '第1周',
            title: 'Python基础入门',
            description: '学习Python语法基础、变量、数据类型',
            skills: ['变量', '数据类型', '基本运算']
        },
        {
            week: '第2周',
            title: '控制结构',
            description: '掌握条件语句和循环结构',
            skills: ['if语句', 'for循环', 'while循环']
        },
        {
            week: '第3周',
            title: '函数和模块',
            description: '学习函数定义、参数传递和模块导入',
            skills: ['函数定义', '参数', '模块导入']
        }
    ],
    2: [
        {
            week: '第4周',
            title: '数据结构',
            description: '掌握列表、字典、元组等数据结构',
            skills: ['列表', '字典', '元组', '集合']
        },
        {
            week: '第5周',
            title: '文件操作',
            description: '学习文件读写和异常处理',
            skills: ['文件读写', '异常处理', 'with语句']
        },
        {
            week: '第6周',
            title: '面向对象编程',
            description: '理解类和对象的概念',
            skills: ['类定义', '对象', '继承', '封装']
        }
    ]
};

// Python库文档数据
const pythonLibraries = {
    basic: [
        {
            name: 'os',
            description: '操作系统接口模块，用于文件和目录操作',
            icon: 'fas fa-folder',
            tags: ['文件系统', '路径', '环境变量'],
            examples: ['os.path.join()', 'os.listdir()', 'os.getcwd()']
        },
        {
            name: 'sys',
            description: '系统相关的参数和函数',
            icon: 'fas fa-cogs',
            tags: ['系统', '参数', '路径'],
            examples: ['sys.argv', 'sys.path', 'sys.exit()']
        },
        {
            name: 'datetime',
            description: '日期和时间处理模块',
            icon: 'fas fa-clock',
            tags: ['日期', '时间', '格式化'],
            examples: ['datetime.now()', 'datetime.strftime()', 'timedelta()']
        }
    ],
    data: [
        {
            name: 'pandas',
            description: '数据分析和处理库',
            icon: 'fas fa-table',
            tags: ['数据分析', 'DataFrame', 'CSV'],
            examples: ['pd.read_csv()', 'df.head()', 'df.groupby()']
        },
        {
            name: 'numpy',
            description: '科学计算基础库',
            icon: 'fas fa-calculator',
            tags: ['数组', '数学', '科学计算'],
            examples: ['np.array()', 'np.mean()', 'np.reshape()']
        }
    ],
    web: [
        {
            name: 'requests',
            description: 'HTTP请求库',
            icon: 'fas fa-globe',
            tags: ['HTTP', 'API', '网络请求'],
            examples: ['requests.get()', 'requests.post()', 'r.json()']
        },
        {
            name: 'flask',
            description: '轻量级Web框架',
            icon: 'fas fa-server',
            tags: ['Web框架', '路由', 'API'],
            examples: ['@app.route()', 'render_template()', 'request.form']
        }
    ]
};

// 勋章系统
const badgeSystem = [
    {
        id: 'first_homework',
        name: '初试身手',
        description: '提交第一份作业',
        icon: '🎯',
        earned: false
    },
    {
        id: 'week_1',
        name: '起步者',
        description: '完成第1周学习目标',
        icon: '🌱',
        earned: false
    },
    {
        id: 'week_5',
        name: '坚持者',
        description: '完成前5周学习目标',
        icon: '💪',
        earned: false
    },
    {
        id: 'homework_10',
        name: '勤奋者',
        description: '累计提交10份作业',
        icon: '📚',
        earned: false
    },
    {
        id: 'quarter_1',
        name: '第一季度完成者',
        description: '完成第一季度所有学习目标',
        icon: '🏆',
        earned: false
    },
    {
        id: 'video_learner',
        name: '视频学习者',
        description: '观看10个视频',
        icon: '📹',
        earned: false
    },
    {
        id: 'doc_explorer',
        name: '文档探索者',
        description: '查看20个文档',
        icon: '📖',
        earned: false
    }
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 从localStorage加载数据
    loadFromStorage();
    
    // 初始化界面
    initializeApp();
    
    // 绑定事件监听器
    bindEventListeners();
});

// 从localStorage加载数据
function loadFromStorage() {
    const savedUser = localStorage.getItem('pybegin_user');
    const savedHomework = localStorage.getItem('pybegin_homework');
    const savedVideos = localStorage.getItem('pybegin_videos');
    const savedBadges = localStorage.getItem('pybegin_badges');
    
    if (savedUser) {
        currentUser = { ...currentUser, ...JSON.parse(savedUser) };
    }
    if (savedHomework) {
        homeworkData = JSON.parse(savedHomework);
    }
    if (savedVideos) {
        videoPlaylist = JSON.parse(savedVideos);
    }
    if (savedBadges) {
        userBadges = JSON.parse(savedBadges);
    } else {
        userBadges = badgeSystem.map(badge => ({ ...badge }));
    }
}

// 初始化应用
function initializeApp() {
    loadUserData();
    initializeHomeworkWeeks();
    renderLearningGoals();
    renderHomeworkList();
    renderVideoPlaylist();
    renderPythonDocs();
    renderBadges();
    updateStats();
}

// 初始化作业周次选项
function initializeHomeworkWeeks() {
    const select = document.getElementById('homeworkWeek');
    if (!select) return;
    
    const weeks = [];
    Object.values(learningGoals).forEach(goals => {
        goals.forEach(goal => weeks.push(goal.week));
    });
    
    select.innerHTML = '<option value="">选择作业周次</option>' + 
        weeks.map(week => `<option value="${week}">${week}</option>`).join('');
}

// 绑定事件监听器
function bindEventListeners() {
    // 导航链接
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
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
    uploadArea?.addEventListener('click', () => fileInput?.click());
    uploadArea?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInput?.click();
        }
    });
    
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
            content: null
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
        downloadFile(homework.files[0]);
    } else {
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
    if (url.includes('youtube.com/watch')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    
    if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    
    if (url.includes('bilibili.com/video/')) {
        const bvid = url.match(/\/video\/([^/?]+)/)?.[1];
        return bvid ? `https://player.bilibili.com/player.html?bvid=${bvid}` : null;
    }
    
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

console.log('PyBegin 学习平台已初始化完成！');