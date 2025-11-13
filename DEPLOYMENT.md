# GitHub Pages 部署说明

## 代码已准备就绪

所有文件已经提交到本地 git 仓库，包括：
- ✅ 所有网站文件（HTML, CSS, JS）
- ✅ GitHub Pages 部署工作流（`.github/workflows/deploy.yml`）
- ✅ `.nojekyll` 文件（确保静态文件正确显示）

## 推送代码到 GitHub

如果推送遇到问题，请尝试以下方法：

### 方法 1: 使用 HTTPS（需要认证）

```bash
git push -u origin main
```

如果提示需要认证，请：
1. 使用 GitHub Personal Access Token 作为密码
2. 或在 GitHub 上设置 SSH 密钥

### 方法 2: 使用 SSH

```bash
# 更改远程仓库 URL 为 SSH
git remote set-url origin git@github.com:JJZHANG0/25CC_Parker.git
git push -u origin main
```

### 方法 3: 手动创建仓库

如果仓库还不存在：
1. 访问 https://github.com/new
2. 创建名为 `25CC_Parker` 的仓库
3. **不要**初始化 README、.gitignore 或 license
4. 然后运行推送命令

## 启用 GitHub Pages

推送成功后，有两种方式启用 GitHub Pages：

### 方式 1: 使用 GitHub Actions（推荐，已配置）

1. 访问仓库：https://github.com/JJZHANG0/25CC_Parker
2. 进入 **Settings** → **Pages**
3. 在 **Source** 下选择 **GitHub Actions**
4. 工作流会自动部署，网站地址为：`https://jjzhang0.github.io/25CC_Parker/`

### 方式 2: 使用静态部署

1. 访问仓库：https://github.com/JJZHANG0/25CC_Parker
2. 进入 **Settings** → **Pages**
3. 在 **Source** 下选择 **Deploy from a branch**
4. 选择分支：**main**
5. 选择文件夹：**/ (root)**
6. 点击 **Save**
7. 网站地址为：`https://jjzhang0.github.io/25CC_Parker/`

## 验证部署

部署完成后（通常需要几分钟），访问：
- https://jjzhang0.github.io/25CC_Parker/

## 故障排除

如果遇到问题：
1. 检查仓库是否已创建
2. 确认已启用 GitHub Pages
3. 查看 Actions 标签页中的部署状态
4. 检查 Pages 设置中的构建日志

