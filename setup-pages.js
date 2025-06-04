#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class GitHubPagesSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.docsDir = path.join(this.projectRoot, 'docs');
  }

  // 检查是否是 Git 仓库
  checkGitRepo() {
    try {
      execSync('git status', { stdio: 'ignore' });
      return true;
    } catch {
      console.log('❌ 当前目录不是 Git 仓库');
      console.log('请先运行: git init');
      return false;
    }
  }

  // 创建基本的 HTML 文件
  createIndexHTML() {
    const repoName = path.basename(this.projectRoot);
    const indexContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${repoName} - GitHub Pages</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
            margin: 1rem;
        }
        
        h1 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 2.5rem;
        }
        
        p {
            color: #666;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }
        
        .badge {
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            margin: 0.5rem;
        }
        
        .info {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
            border-left: 4px solid #007bff;
        }
        
        .github-link {
            display: inline-block;
            background: #24292e;
            color: white;
            padding: 0.75rem 1.5rem;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 1rem;
            transition: background 0.3s;
        }
        
        .github-link:hover {
            background: #0366d6;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 1.5rem;
            }
            
            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 ${repoName}</h1>
        <p>欢迎访问我的 GitHub Pages 网站！</p>
        
        <div>
            <span class="badge">✅ 部署成功</span>
            <span class="badge">🚀 自动更新</span>
            <span class="badge">📱 响应式设计</span>
        </div>
        
        <div class="info">
            <strong>📋 网站信息</strong><br>
            构建时间: ${new Date().toLocaleString('zh-CN')}<br>
            部署方式: GitHub Pages<br>
            更新频率: 每次 push 自动更新
        </div>
        
        <a href="#" class="github-link" onclick="openGitHub()">
            📂 查看源代码
        </a>
    </div>
    
    <script>
        function openGitHub() {
            // 尝试获取仓库信息并打开
            const currentUrl = window.location.href;
            const match = currentUrl.match(/https:\\/\\/([^.]+)\\.github\\.io\\/([^/]+)/);
            if (match) {
                const username = match[1];
                const repo = match[2];
                window.open(\`https://github.com/\${username}/\${repo}\`, '_blank');
            } else {
                alert('请手动访问 GitHub 仓库');
            }
        }
        
        // 添加一些交互效果
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.querySelector('.container');
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                container.style.transition = 'all 0.6s ease';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        });
    </script>
</body>
</html>`;

    return indexContent;
  }

  // 创建 docs 目录和文件
  setupDocsDirectory() {
    if (!fs.existsSync(this.docsDir)) {
      fs.mkdirSync(this.docsDir);
      console.log('✅ 创建 docs 目录');
    }

    // 创建 index.html
    const indexPath = path.join(this.docsDir, 'index.html');
    fs.writeFileSync(indexPath, this.createIndexHTML());
    console.log('✅ 创建 index.html');

    // 创建 404 页面
    const notFoundContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面未找到 - 404</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }
        .error-container {
            text-align: center;
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        h1 { color: #e74c3c; font-size: 4rem; margin: 0; }
        p { color: #666; font-size: 1.2rem; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>404</h1>
        <p>抱歉，您访问的页面不存在</p>
        <a href="/">返回首页</a>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(this.docsDir, '404.html'), notFoundContent);
    console.log('✅ 创建 404.html');

    // 创建 README
    const readmeContent = `# ${path.basename(this.projectRoot)}

这是一个通过 GitHub Pages 部署的网站。

## 📁 文件结构
\`\`\`
docs/
├── index.html    # 主页
├── 404.html      # 404 页面
└── README.md     # 说明文档
\`\`\`

## 🚀 部署步骤
1. 推送代码到 GitHub
2. 在仓库设置中启用 Pages
3. 选择 docs 文件夹作为源
4. 访问 https://username.github.io/repository-name

## 🔄 自动更新
每次推送到 main 分支时，GitHub Pages 会自动更新网站。

---
构建时间: ${new Date().toLocaleString('zh-CN')}
`;

    fs.writeFileSync(path.join(this.docsDir, 'README.md'), readmeContent);
    console.log('✅ 创建 README.md');
  }

  // 创建 GitHub Actions 工作流
  createGitHubActions() {
    const workflowDir = path.join(this.projectRoot, '.github', 'workflows');
    
    if (!fs.existsSync(workflowDir)) {
      fs.mkdirSync(workflowDir, { recursive: true });
    }

    const workflowContent = `name: Deploy GitHub Pages

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Pages
      uses: actions/configure-pages@v4
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './docs'
        
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
`;

    fs.writeFileSync(path.join(workflowDir, 'pages.yml'), workflowContent);
    console.log('✅ 创建 GitHub Actions 工作流');
  }

  // 更新 .gitignore
  updateGitignore() {
    const gitignorePath = path.join(this.projectRoot, '.gitignore');
    let gitignoreContent = '';

    if (fs.existsSync(gitignorePath)) {
      gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    }

    const pagesToIgnore = [
      '',
      '# GitHub Pages',
      '# docs/README.md',
      ''
    ];

    const needsUpdate = !gitignoreContent.includes('# GitHub Pages');
    
    if (needsUpdate) {
      fs.writeFileSync(gitignorePath, gitignoreContent + pagesToIgnore.join('\n'));
      console.log('✅ 更新 .gitignore');
    }
  }

  // 主设置函数
  async setup() {
    console.log('🚀 开始设置 GitHub Pages...\n');

    // 检查 Git 仓库
    if (!this.checkGitRepo()) {
      return;
    }

    // 创建必要文件
    this.setupDocsDirectory();
    this.createGitHubActions();
    this.updateGitignore();

    console.log('\n✅ GitHub Pages 设置完成！');
    console.log('\n📋 接下来的步骤：');
    console.log('1. git add .');
    console.log('2. git commit -m "Setup GitHub Pages"');
    console.log('3. git push origin main');
    console.log('4. 在 GitHub 仓库设置中启用 Pages');
    console.log('5. 选择 "docs" 文件夹作为源');
    console.log('\n🌐 你的网站将在以下地址可用：');
    
    try {
      const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
      const match = remoteUrl.match(/github\.com[:/]([^/]+)\/(.+?)(?:\.git)?$/);
      if (match) {
        const [, username, repo] = match;
        console.log(`   https://${username}.github.io/${repo}/`);
      }
    } catch {
      console.log('   https://username.github.io/repository-name/');
    }
  }

  // 检查现有配置
  checkExistingSetup() {
    const checks = [
      { path: this.docsDir, name: 'docs 目录' },
      { path: path.join(this.docsDir, 'index.html'), name: 'index.html' },
      { path: path.join(this.projectRoot, '.github/workflows'), name: 'GitHub Actions' }
    ];

    console.log('🔍 检查现有配置：');
    checks.forEach(check => {
      const exists = fs.existsSync(check.path);
      console.log(`   ${exists ? '✅' : '❌'} ${check.name}`);
    });
    console.log('');
  }
}

// 运行设置
const pagesSetup = new GitHubPagesSetup();

// 解析命令行参数
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'check':
    pagesSetup.checkExistingSetup();
    break;
  case 'setup':
  default:
    pagesSetup.setup();
    break;
}