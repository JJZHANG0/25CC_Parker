# 推送代码到 GitHub - 操作指南

## ✅ 已完成的工作

1. ✅ 初始化 git 仓库
2. ✅ 添加所有项目文件（26个文件）
3. ✅ 创建 GitHub Pages 部署工作流（`.github/workflows/deploy.yml`）
4. ✅ 添加 `.nojekyll` 文件（确保静态文件正确显示）
5. ✅ 创建部署说明文档
6. ✅ 所有更改已提交到本地仓库

## 📤 推送代码到 GitHub

由于推送时遇到认证问题，请按以下步骤操作：

### 方法 1: 使用 GitHub CLI（推荐）

```bash
# 如果已安装 GitHub CLI
gh auth login
git push -u origin main
```

### 方法 2: 使用 Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 选择权限：`repo`（完整仓库访问权限）
4. 生成并复制 token
5. 推送时使用 token 作为密码：

```bash
git push -u origin main
# Username: 输入你的 GitHub 用户名
# Password: 粘贴刚才生成的 token（不是你的 GitHub 密码）
```

### 方法 3: 使用 SSH（如果已配置 SSH 密钥）

```bash
# 更改远程仓库 URL
git remote set-url origin git@github.com:JJZHANG0/25CC_Parker.git
git push -u origin main
```

### 方法 4: 手动上传（如果上述方法都不行）

1. 访问：https://github.com/JJZHANG0/25CC_Parker
2. 点击 "uploading an existing file"
3. 拖拽整个项目文件夹（除了 `.git` 文件夹）
4. 提交更改

## 🚀 启用 GitHub Pages

推送成功后，启用 GitHub Pages：

### 步骤 1: 进入仓库设置
1. 访问：https://github.com/JJZHANG0/25CC_Parker/settings/pages
2. 或在仓库页面点击 **Settings** → **Pages**

### 步骤 2: 配置 Pages
选择以下任一方式：

**方式 A: 使用 GitHub Actions（推荐）**
- Source: 选择 **GitHub Actions**
- 工作流会自动运行并部署

**方式 B: 使用静态部署**
- Source: 选择 **Deploy from a branch**
- Branch: 选择 **main**
- Folder: 选择 **/ (root)**
- 点击 **Save**

### 步骤 3: 等待部署
- 通常需要 1-2 分钟
- 可以在 **Actions** 标签页查看部署进度

### 步骤 4: 访问网站
部署完成后，网站地址为：
**https://jjzhang0.github.io/25CC_Parker/**

## 📋 当前本地提交记录

```
01e1987 Add deployment instructions
dc172ad Add .nojekyll for GitHub Pages
73a1108 Add GitHub Pages deployment workflow
e1b98cc first commit
```

## 🔍 验证部署

部署成功后，检查以下页面是否正常：
- 首页：https://jjzhang0.github.io/25CC_Parker/
- 关于我们：https://jjzhang0.github.io/25CC_Parker/about.html
- 创新技术：https://jjzhang0.github.io/25CC_Parker/innovation.html
- 团队：https://jjzhang0.github.io/25CC_Parker/team.html
- 画廊：https://jjzhang0.github.io/25CC_Parker/gallery.html
- 时间线：https://jjzhang0.github.io/25CC_Parker/timeline.html
- 联系我们：https://jjzhang0.github.io/25CC_Parker/contact.html
- 品牌：https://jjzhang0.github.io/25CC_Parker/brand.html

## ❓ 遇到问题？

1. **推送失败**：检查网络连接和 GitHub 认证
2. **Pages 不显示**：等待几分钟，清除浏览器缓存
3. **404 错误**：确认 Pages 设置中选择了正确的分支和文件夹
4. **样式丢失**：检查 `.nojekyll` 文件是否存在

