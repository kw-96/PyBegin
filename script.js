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
            title: '个人信息卡片生成器',
            description: '安装与配置、Python基础语法、变量、字符串操作',
            skills: ['Python安装配置', 'print()和input()', '字符串格式化', '基础文件操作'],
            project: '用户输入信息生成格式化卡片并保存到文件',
            keyPoints: ['f-string格式化', '文件读写', '用户交互']
        },
        {
            week: '第2周',
            title: '智能计算器',
            description: '条件判断、循环、异常处理',
            skills: ['if/elif/else条件判断', 'while循环', 'try/except异常处理', '列表存储历史'],
            project: '支持四则运算、乘方、开方的计算器，显示历史记录',
            keyPoints: ['条件分支', '循环控制', '异常处理', '数据存储']
        },
        {
            week: '第3周',
            title: '学生成绩管理系统',
            description: '列表、字典、函数封装',
            skills: ['列表和字典操作', '函数定义和调用', '数据统计和排序', '类的基础概念'],
            project: '添加学生成绩、计算统计、生成排名报告',
            keyPoints: ['数据结构', '函数封装', '统计计算', '面向对象初步']
        },
        {
            week: '第4周',
            title: '密码管理器',
            description: '文件操作、加密、数据持久化',
            skills: ['CSV文件读写', '简单加密算法', '正则表达式验证', '安全性设计'],
            project: '保存网站密码、主密码验证、密码强度检测',
            keyPoints: ['文件操作', '数据加密', '输入验证', '安全编程']
        },
        {
            week: '第5周',
            title: '待办事项管理器',
            description: 'JSON数据处理、日期时间操作',
            skills: ['JSON文件操作', 'datetime模块', '任务优先级', '数据过滤和搜索'],
            project: '任务增删改查、优先级设置、到期提醒',
            keyPoints: ['JSON处理', '时间计算', '数据管理', '用户体验']
        },
        {
            week: '第6周',
            title: '文件整理工具',
            description: 'os模块、文件系统操作',
            skills: ['os和pathlib模块', '文件批量操作', '目录遍历', '文件分类'],
            project: '按文件类型自动分类、批量重命名、重复文件检测',
            keyPoints: ['文件系统', '批量处理', '正则匹配', '工具开发']
        },
        {
            week: '第7周',
            title: '天气查询应用',
            description: 'API调用、JSON解析、网络编程',
            skills: ['requests库使用', 'API接口调用', 'JSON数据解析', '异常处理'],
            project: '获取城市天气信息、历史记录、天气预警',
            keyPoints: ['网络请求', 'API使用', '数据解析', '外部服务集成']
        },
        {
            week: '第8周',
            title: '词汇学习系统',
            description: '随机算法、数据统计、学习记录',
            skills: ['random模块使用', '学习算法', '进度跟踪', '数据可视化基础'],
            project: '单词卡片学习、记忆曲线、学习统计',
            keyPoints: ['随机选择', '学习算法', '进度追踪', '用户激励']
        },
        {
            week: '第9周',
            title: '简易博客系统',
            description: '模板系统、静态网站生成',
            skills: ['Jinja2模板', 'HTML生成', '文章管理', '静态部署'],
            project: 'markdown文章转HTML、模板渲染、静态博客生成',
            keyPoints: ['模板引擎', 'HTML生成', '内容管理', '静态部署']
        },
        {
            week: '第10周',
            title: '图片处理工具',
            description: 'PIL库使用、图像处理基础',
            skills: ['PIL/Pillow库', '图像尺寸调整', '水印添加', '批量处理'],
            project: '图片压缩、尺寸调整、水印添加、格式转换',
            keyPoints: ['图像处理', '批量操作', '文件转换', '图形编程']
        },
        {
            week: '第11周',
            title: '数据分析工具',
            description: 'pandas基础、数据清洗',
            skills: ['pandas基础操作', 'CSV数据处理', '数据清洗', '简单统计'],
            project: 'Excel/CSV数据分析、统计报告生成',
            keyPoints: ['数据处理', '统计分析', '报告生成', '数据科学入门']
        },
        {
            week: '第12周',
            title: '游戏：猜数字Plus',
            description: '游戏逻辑、用户体验、综合应用',
            skills: ['游戏逻辑设计', '难度调节', '游戏记录', '用户界面优化'],
            project: '多难度猜数字游戏、排行榜、游戏统计',
            keyPoints: ['游戏设计', '用户体验', '数据持久化', '综合应用']
        }
    ],
    2: [
        {
            week: '第13周',
            title: 'Flask基础：个人主页',
            description: 'Web框架入门、路由、模板',
            skills: ['Flask框架基础', '路由设计', 'Jinja2模板', '静态文件处理'],
            project: '创建个人主页网站，包含多个页面和导航',
            keyPoints: ['Web框架', '路由系统', '模板渲染', 'HTTP协议']
        },
        {
            week: '第14周',
            title: 'Web表单与用户输入',
            description: '表单处理、数据验证、用户交互',
            skills: ['HTML表单', 'Flask-WTF', '数据验证', '表单安全'],
            project: '联系表单、用户注册表单、数据验证',
            keyPoints: ['表单处理', '数据验证', 'CSRF保护', '用户输入安全']
        },
        {
            week: '第15周',
            title: 'SQLite数据库集成',
            description: '数据库基础、ORM、数据持久化',
            skills: ['SQLite数据库', 'SQLAlchemy ORM', '数据模型设计', 'CRUD操作'],
            project: '用户管理系统，支持注册、登录、信息修改',
            keyPoints: ['数据库设计', 'ORM使用', '数据关系', '持久化存储']
        },
        {
            week: '第16周',
            title: '博客系统：文章管理',
            description: '内容管理、分页、搜索功能',
            skills: ['文章CRUD', '分页显示', '搜索功能', '富文本编辑'],
            project: '完整博客系统，支持文章发布、编辑、删除',
            keyPoints: ['内容管理', '分页实现', '搜索算法', '用户体验']
        },
        {
            week: '第17周',
            title: '用户认证系统',
            description: '登录注册、会话管理、权限控制',
            skills: ['用户认证', '会话管理', '密码加密', '权限装饰器'],
            project: '完整的用户系统，包含登录、注册、权限管理',
            keyPoints: ['身份认证', '会话安全', '权限控制', '安全编程']
        },
        {
            week: '第18周',
            title: 'RESTful API开发',
            description: 'API设计、JSON数据、接口文档',
            skills: ['REST API设计', 'JSON响应', 'HTTP状态码', 'API文档'],
            project: '博客API接口，支持增删改查操作',
            keyPoints: ['API设计', 'RESTful规范', '接口测试', '文档编写']
        },
        {
            week: '第19周',
            title: '文件上传与处理',
            description: '文件上传、图片处理、安全验证',
            skills: ['文件上传', '文件验证', '图片缩放', '安全检查'],
            project: '图片上传系统，支持缩略图生成',
            keyPoints: ['文件处理', '安全验证', '图片处理', '存储管理']
        },
        {
            week: '第20周',
            title: '实时聊天室',
            description: 'WebSocket、实时通信、消息系统',
            skills: ['WebSocket协议', 'Socket.IO', '实时通信', '消息广播'],
            project: '多用户聊天室，支持实时消息',
            keyPoints: ['实时通信', 'WebSocket', '并发处理', '用户体验']
        },
        {
            week: '第21周',
            title: '数据可视化面板',
            description: '图表生成、数据展示、前端集成',
            skills: ['Chart.js集成', '数据图表', '前端交互', '动态更新'],
            project: '数据分析面板，各种图表展示',
            keyPoints: ['数据可视化', '前端集成', '交互设计', '实时更新']
        },
        {
            week: '第22周',
            title: '在线投票系统',
            description: '投票逻辑、统计分析、防刷票',
            skills: ['投票逻辑', '结果统计', '防重复投票', '数据分析'],
            project: '多选项投票系统，实时结果展示',
            keyPoints: ['业务逻辑', '数据统计', '安全防护', '结果展示']
        },
        {
            week: '第23周',
            title: '邮件发送系统',
            description: 'SMTP协议、邮件模板、批量发送',
            skills: ['SMTP配置', '邮件模板', '附件处理', '发送队列'],
            project: '邮件通知系统，支持模板和批量发送',
            keyPoints: ['邮件协议', '模板系统', '任务队列', '异步处理']
        },
        {
            week: '第24周',
            title: '网站部署与优化',
            description: '服务器部署、性能优化、监控',
            skills: ['服务器配置', 'Gunicorn部署', 'Nginx配置', '性能监控'],
            project: '将网站部署到服务器，配置域名和SSL',
            keyPoints: ['服务器部署', '性能优化', '安全配置', '运维基础']
        },
        {
            week: '第25周',
            title: '综合项目：在线商城',
            description: '电商系统、购物车、订单管理',
            skills: ['电商逻辑', '购物车设计', '订单系统', '支付集成'],
            project: '简单电商网站，商品展示、购物车、订单',
            keyPoints: ['业务建模', '系统设计', '数据关系', '用户流程']
        }
    ],
    3: [
        {
            week: '第26周',
            title: 'Tkinter桌面应用：计算器',
            description: 'GUI编程基础、事件处理、界面设计',
            skills: ['Tkinter基础', '组件使用', '事件绑定', '布局管理'],
            project: '图形界面计算器，支持科学计算',
            keyPoints: ['GUI编程', '事件处理', '界面设计', '桌面应用']
        },
        {
            week: '第27周',
            title: '文本编辑器',
            description: '文件操作、菜单系统、快捷键',
            skills: ['菜单栏设计', '文件对话框', '快捷键绑定', '文本处理'],
            project: '简单文本编辑器，支持文件操作',
            keyPoints: ['菜单系统', '文件对话框', '快捷键', '用户体验']
        },
        {
            week: '第28周',
            title: '系统监控工具',
            description: '系统信息获取、实时监控、数据展示',
            skills: ['psutil库使用', '系统信息', '实时更新', '图表显示'],
            project: 'CPU、内存、磁盘监控工具',
            keyPoints: ['系统编程', '实时监控', '数据可视化', '性能分析']
        },
        {
            week: '第29周',
            title: 'PyQt应用：音乐播放器',
            description: 'PyQt框架、多媒体处理、现代GUI',
            skills: ['PyQt5/6基础', '音频处理', '播放列表', '界面美化'],
            project: '功能完整的音乐播放器',
            keyPoints: ['PyQt框架', '多媒体', '现代界面', '用户体验']
        },
        {
            week: '第30周',
            title: '数据采集爬虫',
            description: '网络爬虫、数据提取、反爬虫处理',
            skills: ['requests和BeautifulSoup', '数据提取', '反爬虫', '数据存储'],
            project: '新闻网站爬虫，数据清洗和存储',
            keyPoints: ['网络爬虫', '数据提取', '反爬处理', '数据清洗']
        },
        {
            week: '第31周',
            title: 'Excel数据分析',
            description: 'pandas高级应用、数据透视表、可视化',
            skills: ['pandas高级操作', '数据透视表', 'matplotlib绘图', '报告生成'],
            project: '销售数据分析报告，图表和总结',
            keyPoints: ['数据分析', '透视表', '数据可视化', '报告生成']
        },
        {
            week: '第32周',
            title: '机器学习入门：房价预测',
            description: 'scikit-learn基础、线性回归、模型评估',
            skills: ['scikit-learn基础', '数据预处理', '线性回归', '模型评估'],
            project: '房价预测模型，特征工程和预测',
            keyPoints: ['机器学习', '数据预处理', '模型训练', '预测评估']
        },
        {
            week: '第33周',
            title: '图像识别：手写数字',
            description: '深度学习基础、神经网络、TensorFlow',
            skills: ['TensorFlow基础', '神经网络', '图像预处理', '模型训练'],
            project: '手写数字识别系统',
            keyPoints: ['深度学习', '神经网络', '图像处理', '模型应用']
        },
        {
            week: '第34周',
            title: '股票分析工具',
            description: '金融数据获取、技术指标、趋势分析',
            skills: ['金融数据API', '技术指标计算', '趋势分析', '投资策略'],
            project: '股票价格分析和预测工具',
            keyPoints: ['金融数据', '技术分析', '趋势预测', '量化分析']
        },
        {
            week: '第35周',
            title: '自动化测试框架',
            description: 'pytest框架、单元测试、自动化测试',
            skills: ['pytest使用', '测试用例设计', '测试报告', '持续集成'],
            project: 'Web应用自动化测试套件',
            keyPoints: ['自动化测试', '测试框架', '测试设计', '质量保证']
        },
        {
            week: '第36周',
            title: '微信机器人',
            description: '微信API、自动回复、智能对话',
            skills: ['微信API使用', '自然语言处理', '自动回复', '智能对话'],
            project: '微信群聊机器人，自动回复和管理',
            keyPoints: ['API集成', '自然语言', '自动化', '智能交互']
        },
        {
            week: '第37周',
            title: '区块链简单实现',
            description: '区块链原理、加密算法、分布式系统',
            skills: ['区块链概念', '哈希算法', '数字签名', '共识机制'],
            project: '简单区块链系统，支持交易记录',
            keyPoints: ['区块链', '加密技术', '分布式', '数据结构']
        },
        {
            week: '第38周',
            title: 'DevOps工具：部署脚本',
            description: '自动化部署、服务器管理、运维工具',
            skills: ['自动化脚本', '服务器操作', '部署流程', '监控告警'],
            project: '一键部署脚本，服务器环境配置',
            keyPoints: ['自动化运维', '脚本编程', '服务器管理', '部署优化']
        }
    ],
    4: [
        {
            week: '第39-42周',
            title: '企业级Web应用开发',
            description: '大型Web应用、微服务架构、高并发处理',
            skills: ['Django框架', '微服务设计', 'Redis缓存', '消息队列', '负载均衡'],
            project: '企业内容管理系统，支持多用户、权限管理、文件存储',
            keyPoints: ['企业级架构', '高并发处理', '缓存策略', '系统优化']
        },
        {
            week: '第43-46周',
            title: '人工智能应用开发',
            description: '深度学习应用、计算机视觉、自然语言处理',
            skills: ['TensorFlow/PyTorch', 'OpenCV', 'NLTK', '模型部署', 'GPU计算'],
            project: '智能客服系统，支持图像识别、语音转换、智能问答',
            keyPoints: ['AI算法应用', '模型训练', '实时处理', '用户交互']
        },
        {
            week: '第47-50周',
            title: '大数据处理平台',
            description: '数据工程、ETL流程、数据仓库、可视化面板',
            skills: ['Apache Spark', 'ETL设计', '数据仓库', '实时流处理', 'BI工具'],
            project: '企业数据分析平台，支持多数据源、实时分析、报表生成',
            keyPoints: ['大数据处理', '实时计算', '数据建模', '商业智能']
        },
        {
            week: '第51-52周',
            title: '个人项目总结与展示',
            description: '项目整理、技术分享、职业规划',
            skills: ['项目文档', '技术演讲', '代码重构', '开源贡献'],
            project: '个人作品集网站，技术博客，开源项目贡献',
            keyPoints: ['项目展示', '技术分享', '个人品牌', '职业发展']
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
    
    const targetContent = document.querySelector(`.quarter-content[data-quarter="${quarter}"]`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
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
                <div class="goal-item ${isCompleted ? 'completed' : ''}" data-week="${goal.week}" onclick="toggleGoalCompletion('${goal.week}')">
                    <div class="goal-week">${goal.week}</div>
                    <div class="goal-title">${goal.title}</div>
                    <div class="goal-description">${goal.description}</div>
                    
                    ${goal.project ? `
                        <div class="goal-project">
                            <div class="goal-project-title">项目要求</div>
                            <div class="goal-project-desc">${goal.project}</div>
                        </div>
                    ` : ''}
                    
                    <div class="goal-skills">
                        ${goal.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                    
                    ${goal.keyPoints ? `
                        <div class="goal-keypoints">
                            ${goal.keyPoints.map(point => `<span class="keypoint-tag">${point}</span>`).join('')}
                        </div>
                    ` : ''}
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
    
    const completedGoalsEl = document.getElementById('completedGoals');
    const totalBadgesEl = document.getElementById('totalBadges');
    const submittedHomeworkEl = document.getElementById('submittedHomework');
    
    if (completedGoalsEl) completedGoalsEl.textContent = completedGoals;
    if (totalBadgesEl) totalBadgesEl.textContent = totalBadges;
    if (submittedHomeworkEl) submittedHomeworkEl.textContent = submittedHomework;
    
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

// 切换目标完成状态
function toggleGoalCompletion(week) {
    currentUser.progress[week] = !currentUser.progress[week];
    saveData();
    renderLearningGoals();
    updateStats();
    checkAndAwardBadges();
    
    const status = currentUser.progress[week] ? '完成' : '未完成';
    showNotification(`${week} 标记为${status}`, 'success');
}

console.log('PyBegin 学习平台已初始化完成！');