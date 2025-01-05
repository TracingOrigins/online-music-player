class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audio');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progress = document.querySelector('.progress');
        this.currentTime = document.querySelector('.current-time');
        this.duration = document.querySelector('.duration');
        this.songTitle = document.querySelector('.song-title');
        this.artist = document.querySelector('.artist');
        this.background = document.querySelector('.background');
        this.lyricsContainer = document.querySelector('.lyrics-container');
        this.themeBtn = document.getElementById('themeBtn');
        this.currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.progressBar = document.querySelector('.progress-bar');
        this.speedBtn = document.getElementById('speedBtn');
        this.speedOptions = document.querySelectorAll('.speed-option');
        this.currentSpeed = 1.0;
        this.playlist = [];
        this.currentSongIndex = 0;
        this.isPlaying = false;

        this.loadPlaylist().then(() => {
            if (this.playlist.length > 0) {
                this.loadSong(this.currentSongIndex);
        this.initializeTheme();
        this.initializeEvents();
        this.updateTheme();
        this.initializeLyrics();
            } else {
                console.error('No songs in playlist');
            }
        }).catch(error => {
            console.error('Failed to load playlist:', error);
        });

        this.autoScroll = true;

        // 添加鼠标悬停状态标志（电脑端）
        this.isHovering = false;
        // 添加滚动状态标志（移动端）
        this.isScrolling = false;
        this.scrollTimer = null;
        // 添加设备类型判断
        this.isTouchDevice = 'ontouchstart' in window;
    }

    async loadPlaylist() {
        try {
            const response = await fetch('playlist.json');
            if (!response.ok) {
                throw new Error('Failed to load playlist');
            }
            this.playlist = await response.json();
            console.log('Loaded playlist:', this.playlist);
        } catch (error) {
            console.error('Error loading playlist:', error);
            this.playlist = [];
        }
    }

    initializeTheme() {
        // 设置初始主题
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme = prefersDark ? 'dark' : 'light';

        // 监听系统主题变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.currentTheme = e.matches ? 'dark' : 'light';
            this.updateTheme();
        });
    }

    initializeEvents() {
        // 添加音频事件监听
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextSong());

        // 播放控制按钮事件
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        
        // 进度条事件
        this.progressBar.addEventListener('click', (e) => this.setProgress(e));
        
        // 主题切换事件
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        
        // 速度控制事件
        this.speedOptions.forEach(option => {
            option.addEventListener('click', () => {
                const speed = parseFloat(option.dataset.speed);
                this.setPlaybackSpeed(speed);
                this.speedOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'ArrowLeft':
                    if (e.ctrlKey) {
                        this.audio.currentTime = Math.max(this.audio.currentTime - 15, 0);
                    } else {
                        this.audio.currentTime = Math.max(this.audio.currentTime - 5, 0);
                    }
                    break;
                case 'ArrowRight':
                    if (e.ctrlKey) {
                        this.audio.currentTime = Math.min(this.audio.currentTime + 15, this.audio.duration);
                    } else {
                        this.audio.currentTime = Math.min(this.audio.currentTime + 5, this.audio.duration);
                    }
                    break;
                case 'PageUp':
                    this.prevSong();
                    break;
                case 'PageDown':
                    this.nextSong();
                    break;
            }
        });

        // 电脑端鼠标事件
        if (!this.isTouchDevice) {
            // 鼠标悬停处理
            this.lyricsContainer.addEventListener('mouseenter', () => {
                this.isHovering = true;
            });

            this.lyricsContainer.addEventListener('mouseleave', () => {
                this.isHovering = false;
            });

            // 电脑端点击事件
            this.lyricsContainer.addEventListener('click', (e) => {
                const lyricLine = e.target.closest('.lyrics-line');
                if (lyricLine) {
                    const time = parseFloat(lyricLine.dataset.time);
                    if (!isNaN(time)) {
                        this.audio.currentTime = time;
                        if (!this.isPlaying) {
                            this.togglePlay();
                        }
                        
                        // 点击后立即滚动到对应位置
                        const containerRect = this.lyricsContainer.getBoundingClientRect();
                        const oneThirdHeight = containerRect.height / 3;
                        const scrollTop = lyricLine.offsetTop - oneThirdHeight;
                        
                        this.lyricsContainer.scrollTo({
                            top: scrollTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }

        // 移动端触摸事件
        if (this.isTouchDevice) {
            // 滚动事件处理
            this.lyricsContainer.addEventListener('scroll', () => {
                this.isScrolling = true;
                
                if (this.scrollTimer) {
                    clearTimeout(this.scrollTimer);
                }
                
                this.scrollTimer = setTimeout(() => {
                    this.isScrolling = false;
                }, 3000);
            });

            // 触摸开始事件
            this.lyricsContainer.addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
            });

            // 触摸结束事件
            this.lyricsContainer.addEventListener('touchend', (e) => {
                const touchEndY = e.changedTouches[0].clientY;
                const touchDiff = Math.abs(touchEndY - this.touchStartY);
                
                // 如果是点击（移动距离小于阈值）
                if (touchDiff < 5) {
                    const lyricLine = e.target.closest('.lyrics-line');
                    if (lyricLine) {
                        const time = parseFloat(lyricLine.dataset.time);
                        if (!isNaN(time)) {
                            // 设置音频时间
                            this.audio.currentTime = time;
                            
                            // 如果没在播放，开始播放
                            if (!this.isPlaying) {
                                this.togglePlay();
                            }
                            
                            // 重置滚动状态
                            this.isScrolling = false;
                            if (this.scrollTimer) {
                                clearTimeout(this.scrollTimer);
                            }
                            
                            // 立即滚动到点击的歌词位置
                            requestAnimationFrame(() => {
                                const containerRect = this.lyricsContainer.getBoundingClientRect();
                                const oneThirdHeight = containerRect.height / 3;
                                const scrollTop = lyricLine.offsetTop - oneThirdHeight;
                                
                                this.lyricsContainer.scrollTo({
                                    top: scrollTop,
                                    behavior: 'smooth'
                                });
                            });
                        }
                    }
                }
            });
        }
    }

    loadSong(index) {
        if (!this.playlist.length) return;
        
        const song = this.playlist[index];
        this.songTitle.textContent = song.title;
        this.artist.textContent = song.artist;
        this.audio.src = song.audio;

        if (song.background) {
            const encodedPath = encodeURIComponent(song.background);
                this.background.style.backgroundImage = `url("${encodedPath}")`;
                this.background.style.display = 'block';
        } else {
                this.background.style.backgroundImage = 'none';
        }

        // 添加音频加载完成事件监听
        this.audio.addEventListener('loadedmetadata', () => {
            // 更新总时长显示
            this.duration.textContent = this.formatTime(this.audio.duration);
            // 重置当前时间显示
            this.currentTime.textContent = this.formatTime(0);
            // 重置进度条
            this.progress.style.width = '0%';
        });

        this.initializeLyrics();
        this.audio.playbackRate = this.currentSpeed;
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.playBtn.innerHTML = '<i class="ri-play-fill"></i>';
        } else {
            this.audio.play();
            this.playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
        }
        this.isPlaying = !this.isPlaying;
    }

    prevSong() {
        this.currentSongIndex--;
        if (this.currentSongIndex < 0) {
            this.currentSongIndex = this.playlist.length - 1;
        }
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    nextSong() {
        this.currentSongIndex++;
        if (this.currentSongIndex >= this.playlist.length) {
            this.currentSongIndex = 0;
        }
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    updateProgress() {
        const { currentTime, duration } = this.audio;
        const progressPercent = (currentTime / duration) * 100;
        this.progress.style.width = `${progressPercent}%`;

        this.currentTime.textContent = this.formatTime(currentTime);
        this.duration.textContent = this.formatTime(duration);

        this.updateLyrics(currentTime);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    updateLyrics(currentTime) {
        const currentLyrics = this.playlist[this.currentSongIndex].lyrics;
        if (!currentLyrics || !this.lyricsContainer) return;

        // 提前 0.5 秒显示歌词
        const adjustedTime = currentTime + 0.5;

        // 找到当前应该显示的歌词
        const currentLine = currentLyrics.find((lyric, index) => {
            const nextLyric = currentLyrics[index + 1];
            return adjustedTime >= lyric.time && (!nextLyric || adjustedTime < nextLyric.time);
        });

        if (currentLine) {
            const allLines = this.lyricsContainer.querySelectorAll('.lyrics-line');
            allLines.forEach(line => {
                line.classList.remove('active');
                const lineFill = line.querySelector('.line-fill');
                if (lineFill) {
                    lineFill.style.width = '0';
                }
            });
            
            const activeLine = this.lyricsContainer.querySelector(`[data-time="${currentLine.time}"]`);
            if (activeLine) {
                activeLine.classList.add('active');
                
                // 检查是否有时间标签
                const timeTagRegex = /[<\[]([\d:\.]+)[>\]]/g;
                const timeTags = [...currentLine.text.matchAll(timeTagRegex)];
                
                // 如果没有时间标签，直接显示整句
                if (timeTags.length < 2) {
                    const lineFill = activeLine.querySelector('.line-fill');
                    if (lineFill) {
                        lineFill.style.width = '100%';
                    }
                } else {
                    // 使用当前行的第一个和最后一个时间标签计算进度
                    const firstTag = timeTags[0][1].split(/[:\.]/);
                    const lastTag = timeTags[timeTags.length - 1][1].split(/[:\.]/);
                    
                    const firstTime = parseInt(firstTag[0]) * 60 + parseInt(firstTag[1]) + parseInt(firstTag[2]) / 100;
                    const lastTime = parseInt(lastTag[0]) * 60 + parseInt(lastTag[1]) + parseInt(lastTag[2]) / 100;
                    
                    const duration = lastTime - firstTime;
                    const elapsedTime = adjustedTime - currentLine.time;
                    const progress = Math.min(elapsedTime / duration, 1);

                    // 更新进度条
                    const lineFill = activeLine.querySelector('.line-fill');
                    if (lineFill) {
                        lineFill.style.width = `${Math.min(progress * 100, 100)}%`;
                    }
                }
                
                // 根据设备类型判断是否自动滚动
                if (this.isTouchDevice) {
                    // 移动端：只在非滚动状态下自动滚动
                    if (!this.isScrolling) {
                        const containerRect = this.lyricsContainer.getBoundingClientRect();
                        const oneThirdHeight = containerRect.height / 3;
                        const scrollTop = activeLine.offsetTop - oneThirdHeight;
                        
                        this.lyricsContainer.scrollTo({
                            top: scrollTop,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // 电脑端：只在非鼠标悬停状态下自动滚动
                    if (!this.isHovering) {
                        const containerRect = this.lyricsContainer.getBoundingClientRect();
                        const oneThirdHeight = containerRect.height / 3;
                        const scrollTop = activeLine.offsetTop - oneThirdHeight;
                        
                        this.lyricsContainer.scrollTo({
                            top: scrollTop,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        }
    }

    // 渲染歌词行
    renderLyricLine(line) {
        return `
            <div class="lyrics-line" data-time="${line.time}">
                <div class="highlight">${line.text}</div>
                <div class="text">${line.text}</div>
            </div>
        `;
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.updateTheme();
    }

    updateTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.themeBtn.innerHTML = this.currentTheme === 'light' ?
            '<i class="ri-moon-line"></i>' :
            '<i class="ri-sun-line"></i>';
    }

    setProgress(e) {
        const width = this.progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;

        // 如果是拖动事件，需要计算相对于进度条的位置
        const rect = this.progressBar.getBoundingClientRect();
        const x = e.type === 'mousemove' ? e.clientX - rect.left : clickX;

        this.audio.currentTime = (x / width) * duration;
    }

    setPlaybackSpeed(speed) {
        this.currentSpeed = speed;
        this.audio.playbackRate = speed;
        this.speedBtn.innerHTML = '<i class="ri-speed-line"></i>';
    }

    // 添加初始化歌词的方法
    initializeLyrics() {
        const song = this.playlist[this.currentSongIndex];
        if (song.lyrics && this.lyricsContainer) {
            const wrapper = document.createElement('div');
            wrapper.className = 'lyrics-wrapper';
            
            // 创建所有歌词行
            const lyricsHTML = song.lyrics.map(lyric => {
                // 移除所有格式的时间标签
                const cleanText = lyric.text
                    .replace(/\[\d+:\d+\.\d+\]/g, '')    // 移除 [mm:ss.xx] 格式
                    .replace(/\[\d+:\d+\]/g, '')         // 移除 [mm:ss] 格式
                    .replace(/\[.*?\]/g, '')             // 移除任何其他方括号内的内容
                    .replace(/<\d+:\d+\.\d+>/g, '')      // 移除 <mm:ss.xx> 格式
                    .replace(/<\d+:\d+>/g, '')           // 移除 <mm:ss> 格式
                    .replace(/<.*?>/g, '')               // 移除任何其他尖括号内的内容
                    .trim();
                
                return `
                    <div class="lyrics-line" data-time="${lyric.time}">
                        <div class="line-content">
                            <div class="line-fill">${cleanText}</div>
                            <div class="line-bg">${cleanText}</div>
                        </div>
                    </div>
                `;
            }).join('');
            
            wrapper.innerHTML = lyricsHTML;
            this.lyricsContainer.innerHTML = '';
            this.lyricsContainer.appendChild(wrapper);
        }
    }
}

// 初始化播放器
const player = new MusicPlayer(); 