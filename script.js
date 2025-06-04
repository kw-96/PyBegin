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
    renderLearningGoals();
    renderHomeworkList();
    renderVideoPlaylist();
    renderPythonDocs();
    renderBadges();
    updateStats();
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

console.log('PyBegin 学习平台已初始化完成！');