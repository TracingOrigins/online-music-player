# Online Music Player | 在线音乐播放器

[English](#english) | [中文](#中文)

## English

### Introduction
A modern web-based music player with lyrics synchronization feature.

### Features
- 🎵 Music playback with synchronized lyrics display
- 🎨 Light/Dark theme support
- ⌨️ Keyboard shortcuts support
- 📱 Mobile-friendly design
- 🔄 Multiple playback speed options
- 🖱️ Interactive lyrics with click-to-play
- 🎯 Auto-scrolling lyrics with manual override

### Keyboard Shortcuts
- `Space`: Play/Pause
- `PageUp`: Previous song
- `PageDown`: Next song
- `←`: Rewind 5 seconds
- `→`: Forward 5 seconds
- `Ctrl + ←`: Rewind 15 seconds
- `Ctrl + →`: Forward 15 seconds

### File Format Support
- Audio: `.mp3`
- Lyrics: `.lrc`
- Background: `.png`

### Usage
1. Place your music files in the project directory:
   - Song format: `Artist - Title.mp3`
   - Lyrics format: `Artist - Title.lrc`
   - Background image: `Artist - Title.png`
2. Run the server:
   ```bash
   npm install
   npm start
   ```
3. Open `http://localhost:3000` in your browser

---

## 中文

### 简介
一个现代化的网页音乐播放器，支持歌词同步显示。

### 功能特点
- 🎵 音乐播放与歌词同步
- 🎨 明暗主题切换
- ⌨️ 键盘快捷键
- 📱 移动端适配
- 🔄 多种播放速度
- 🖱️ 歌词点击播放
- 🎯 自动滚动歌词（可手动控制）

### 键盘快捷键
- `空格键`: 播放/暂停
- `PageUp`: 上一首
- `PageDown`: 下一首
- `←`: 快退 5 秒
- `→`: 快进 5 秒
- `Ctrl + ←`: 快退 15 秒
- `Ctrl + →`: 快进 15 秒

### 支持的文件格式
- 音频：`.mp3`
- 歌词：`.lrc`
- 背景：`.png`

### 使用方法
1. 将音乐文件放入项目目录：
   - 歌曲格式：`歌手 - 歌名.mp3`
   - 歌词格式：`歌手 - 歌名.lrc`
   - 背景图片：`歌手 - 歌名.png`
2. 运行服务器：
   ```bash
   npm install
   npm start
   ```
3. 在浏览器中打开 `http://localhost:3000`

## 维护

主要就是在 get-playlist.js 中根据歌词名称获取歌词信息，在 script.js 中添加。

1. 先把歌曲、歌词、背景图准备好
2. 然后用get-playlist.js去获取playlist
3. 然后替换script.js里面的playlist就好了

## 联系

欢迎大家提建议，欢迎大家提 PR。

## 捐赠

如果你喜欢这个项目，欢迎捐赠。

## 鸣谢

感谢大家的支持和鼓励。