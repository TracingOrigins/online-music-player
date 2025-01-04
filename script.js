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
        this.lyrics = document.querySelector('.lyrics');
        this.themeBtn = document.getElementById('themeBtn');
        this.currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.progressBar = document.querySelector('.progress-bar');
        this.speedBtn = document.getElementById('speedBtn');
        this.speedOptions = document.querySelectorAll('.speed-option');
        this.currentSpeed = 1.0;
        this.playlist = [{"title":"爱在西元前","artist":"周杰伦","audio":"周杰伦 - 爱在西元前.mp3","background":"周杰伦 - 爱在西元前.png","lyrics":[{"time":0,"text":"爱在西元前 - 周杰伦"},{"time":7.92,"text":"词：方文山"},{"time":15.86,"text":"曲：周杰伦"},{"time":23.8,"text":"编曲：林迈可"},{"time":31.75,"text":"古巴比伦王颁布了"},{"time":33.42,"text":"汉摩拉比法典"},{"time":35.17,"text":"刻在黑色的玄武岩"},{"time":37,"text":"距今已经三千七百多年"},{"time":39.42,"text":"你在橱窗前"},{"time":40.78,"text":"凝视碑文的字眼"},{"time":43.03,"text":"我却在旁静静欣赏"},{"time":44.52,"text":"你那张我深爱的脸"},{"time":47.21,"text":"祭司神殿征战"},{"time":49.14,"text":"弓箭是谁的从前"},{"time":51,"text":"喜欢在人潮中"},{"time":52.09,"text":"你只属于我的那画面"},{"time":54.69,"text":"经过苏美女神身边"},{"time":56.72,"text":"我以女神之名许愿"},{"time":58.95,"text":"思念像底格里斯河般的漫延"},{"time":62.81,"text":"当古文明只剩下难解的语言"},{"time":69.2,"text":"传说就成了永垂不朽的诗篇"},{"time":77.96,"text":"我给你的爱写在西元前"},{"time":80.51,"text":"深埋在美索不达米亚平原"},{"time":85.54,"text":"几十个世纪后出土发现"},{"time":88.05,"text":"泥板上的字迹依然清晰可见"},{"time":93.13,"text":"我给你的爱写在西元前"},{"time":95.65,"text":"深埋在美索不达米亚平原"},{"time":100.69,"text":"用楔形文字刻下了永远"},{"time":103.34,"text":"那已风化千年的誓言"},{"time":106.76,"text":"一切又重演"},{"time":111.14,"text":"祭司神殿征战"},{"time":112.86,"text":"弓箭是谁的从前"},{"time":115.33,"text":"喜欢在人潮中"},{"time":116.42,"text":"你只属于我的那画面"},{"time":119.07,"text":"经过苏美女神身边"},{"time":120.98,"text":"我以女神之名许愿"},{"time":123.36,"text":"思念像底格里斯河般的漫延"},{"time":127.17,"text":"当古文明只剩下难解的语言"},{"time":133.48,"text":"传说就成了永垂不朽的诗篇"},{"time":142.33,"text":"我给你的爱写在西元前"},{"time":144.88,"text":"深埋在美索不达米亚平原"},{"time":149.9,"text":"几十个世纪后出土发现"},{"time":152.38,"text":"泥板上的 字迹依然清晰可见"},{"time":157.48,"text":"我给你的爱写在西元前"},{"time":160.02,"text":"深埋在美索不达米亚平原"},{"time":165.06,"text":"用楔形文字刻下了永远"},{"time":167.59,"text":"那已风化千年的誓言"},{"time":171.06,"text":"一切又重演"},{"time":172.1,"text":"我感到很疲倦离家乡还是很远"},{"time":178.84,"text":"害怕再也不能回到你身边"},{"time":187.81,"text":"我给你的爱写在西元前"},{"time":190.3,"text":"深埋在美索不达米亚平原"},{"time":195.32,"text":"几十个世纪后出土发现"},{"time":197.81,"text":"泥板上的字迹依然清晰可见"},{"time":202.87,"text":"我给你的爱写在西元前"},{"time":205.36,"text":"深埋在美索不达米亚平原"},{"time":210.45,"text":"用楔形文字刻下了永远"},{"time":212.96,"text":"那已风化千年的誓言"},{"time":216.39,"text":"一切又重演"},{"time":217.82,"text":"爱在西元前"},{"time":224.66,"text":"爱在西元前"}]},{"title":"孤勇者","artist":"陈奕迅","audio":"陈奕迅 - 孤勇者.mp3","background":"陈奕迅 - 孤勇者.png","lyrics":[{"time":0.35,"text":"陈奕迅 - 孤勇者"},{"time":1.01,"text":"作词：唐恬"},{"time":1.16,"text":"作曲：钱雷"},{"time":1.26,"text":"编曲：钱雷"},{"time":1.41,"text":"吉他：高飞"},{"time":1.5699999999999998,"text":"人声录音师：利伟明"},{"time":1.8199999999999998,"text":"人声录音棚：雅旺录音室"},{"time":2.18,"text":"Vocal edite：汝文博@SBMS Beijing"},{"time":2.38,"text":"混音、母带：周天澈@Studio ２１A"},{"time":2.7800000000000002,"text":"词版权管理方：北京梦织音传媒有限公司"},{"time":3.34,"text":"曲版权管理方：索尼音乐 版权代理（北京）有限公司"},{"time":4,"text":"录音作品及MV版权：EAS MUSIC LTD"},{"time":4.4,"text":"出品监制：霍锦、卢泓宇"},{"time":4.71,"text":"联合出品方：拳头游戏、腾讯游戏、腾讯视频"},{"time":5.26,"text":"制作人：钱雷"},{"time":22.49,"text":"都是勇敢的"},{"time":28.76,"text":"你额头的伤口"},{"time":30.49,"text":"你的不同你犯的错"},{"time":37.22,"text":"都不必隐藏"},{"time":43.54,"text":"你破旧的玩偶"},{"time":45.21,"text":"你的面具你的自我"},{"time":52.09,"text":"他们说要带着光"},{"time":54.31,"text":"驯服每一头怪兽"},{"time":58.91,"text":"他们说要缝好你的伤"},{"time":61.85,"text":"没有人爱小丑"},{"time":66.2,"text":"为何孤独不可光荣"},{"time":69.28,"text":"人只有不完美值得歌颂"},{"time":73.58,"text":"谁说污泥满 身的不算英雄"},{"time":81.02,"text":"爱你孤身走暗巷"},{"time":82.84,"text":"爱你不跪的模样"},{"time":84.71,"text":"爱你对峙过绝望"},{"time":86.54,"text":"不肯哭一场"},{"time":88.36,"text":"爱你破烂的衣裳"},{"time":90.23,"text":"却敢堵命运的枪"},{"time":92.05,"text":"爱你和我那么像"},{"time":93.92,"text":"缺口都一样"},{"time":95.75,"text":"去吗 配吗 这褴褛的披风"},{"time":99.49,"text":"战吗 战啊 以最卑微的梦"},{"time":103.14,"text":"致那黑夜中的呜咽与怒吼"},{"time":110.53,"text":"谁说站在光里的才算英雄"},{"time":129.08,"text":"他们说要戒了你的狂"},{"time":131.77,"text":"就像擦掉了污垢"},{"time":136.41,"text":"他们说要顺台阶而上"},{"time":139.35,"text":"而代价是低头"},{"time":143.6,"text":"那就让我不可乘风"},{"time":146.85,"text":"你一样骄傲着那种孤勇"},{"time":151.15,"text":"谁说对弈平凡的不算英雄"},{"time":158.59,"text":"爱你孤身走暗巷"},{"time":160.41,"text":"爱你不跪的模样"},{"time":162.23,"text":"爱你对峙过绝望"},{"time":164.11,"text":"不肯哭一场"},{"time":165.93,"text":"爱你破烂的衣裳"},{"time":167.8,"text":"却敢堵命运的枪"},{"time":169.58,"text":"爱你和我那么像"},{"time":171.5,"text":"缺口都一样"},{"time":173.33,"text":"去吗 配吗 这褴褛的披风"},{"time":177.02,"text":"战吗 战啊 以最卑微 的梦"},{"time":180.72,"text":"致那黑夜中的呜咽与怒吼"},{"time":188.15,"text":"谁说站在光里的才算英雄"},{"time":192.55,"text":"你的斑驳与众不同"},{"time":200.04,"text":"你的沉默震耳欲聋"},{"time":206.63,"text":"爱你孤身走暗巷"},{"time":208.4,"text":"爱你不跪的模样"},{"time":210.22,"text":"爱你对峙过绝望"},{"time":212.04,"text":"不肯哭一场"},{"time":213.91,"text":"爱你来自于蛮荒"},{"time":215.74,"text":"一生不借谁的光"},{"time":217.61,"text":"你将造你的城邦"},{"time":219.43,"text":"在废墟之上"},{"time":221.31,"text":"去吗 去啊 以最卑微的梦"},{"time":225,"text":"战吗 战啊 以最孤高的梦"},{"time":228.7,"text":"致那黑夜中的呜咽与怒吼"},{"time":236.09,"text":"谁说站在光里的才算英雄"}]}];
        this.currentSongIndex = 0;
        this.isPlaying = false;

        this.initializeTheme();
        this.initializeEvents();
        this.loadSong(this.currentSongIndex);

        // 初始化时立即设置主题
        this.updateTheme();

        // 初始化时显示所有歌词
        this.initializeLyrics();

        // 添加自动滚动标志
        this.autoScroll = true;
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
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextSong());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        this.progressBar.addEventListener('click', (e) => this.setProgress(e));
        this.progressBar.addEventListener('mousedown', () => {
            this.isProgressDragging = true;
        });
        document.addEventListener('mousemove', (e) => {
            if (this.isProgressDragging) {
                this.setProgress(e);
            }
        });
        document.addEventListener('mouseup', () => {
            this.isProgressDragging = false;
        });
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'PageUp':
                    // 上一首
                    this.prevSong();
                    break;
                case 'PageDown':
                    // 下一首
                    this.nextSong();
                    break;
                case 'ArrowRight':
                    if (e.ctrlKey) {
                        // Ctrl + 右方向键，快进15秒
                        this.audio.currentTime = Math.min(this.audio.currentTime + 15, this.audio.duration);
                    } else {
                        // 普通右方向键，快进5秒
                        this.audio.currentTime = Math.min(this.audio.currentTime + 5, this.audio.duration);
                    }
                    break;
                case 'ArrowLeft':
                    if (e.ctrlKey) {
                        // Ctrl + 左方向键，快退15秒
                        this.audio.currentTime = Math.max(this.audio.currentTime - 15, 0);
                    } else {
                        // 普通左方向键，快退5秒
                        this.audio.currentTime = Math.max(this.audio.currentTime - 5, 0);
                    }
                    break;
                case 'Space':
                    // 空格键播放/暂停
                    e.preventDefault(); // 防止页面滚动
                    this.togglePlay();
                    break;
            }
        });

        // 添加倍速选择事件
        this.speedOptions.forEach(option => {
            option.addEventListener('click', () => {
                const speed = parseFloat(option.dataset.speed);
                this.setPlaybackSpeed(speed);

                // 更新选中状态
                this.speedOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                // 更新当前速度
                this.currentSpeed = speed;
            });
        });

        // 初始化默认倍速状态
        this.speedOptions.forEach(option => {
            if (parseFloat(option.dataset.speed) === 1.0) {
                option.classList.add('active');
            }
        });

        // 添加歌词容器的鼠标事件
        this.lyrics.addEventListener('mouseenter', () => {
            this.autoScroll = false;
        });

        this.lyrics.addEventListener('mouseleave', () => {
            this.autoScroll = true;
        });

        // 添加歌词点击事件
        this.lyrics.addEventListener('click', (e) => {
            // 检查点击的是否是歌词行
            const lyricLine = e.target.closest('.lyric-line');
            if (lyricLine) {
                // 获取歌词的时间点
                const time = parseFloat(lyricLine.dataset.time);
                if (!isNaN(time)) {
                    // 设置音频播放时间
                    this.audio.currentTime = time;
                    // 如果当前是暂停状态，自动开始播放
                    if (!this.isPlaying) {
                        this.togglePlay();
                    }
                }
            }
        });
    }

    loadSong(index) {
        const song = this.playlist[index];
        this.songTitle.textContent = song.title;
        this.artist.textContent = song.artist;
        this.audio.src = song.audio;

        // 修改背景图片加载逻辑
        if (song.background) {
            // 对文件路径进行 URL 编码
            const encodedPath = encodeURIComponent(song.background);

            // 创建一个新的 Image 对象来预加载图片
            const img = new Image();
            img.onload = () => {
                // 使用编码后的路径设置背景
                this.background.style.backgroundImage = `url("${encodedPath}")`;
                this.background.style.display = 'block';
            };
            img.onerror = (error) => {
                console.error('背景图片加载失败:', song.background, error);
                this.background.style.backgroundImage = 'none';
            };
            img.src = encodedPath;
        }

        this.initializeLyrics();
        this.audio.playbackRate = this.currentSpeed;

        // 添加音频加载完成后的处理
        this.audio.addEventListener('loadedmetadata', () => {
            // 更新总时长显示
            this.duration.textContent = this.formatTime(this.audio.duration);
            // 重置当前时间显示
            this.currentTime.textContent = this.formatTime(0);
            // 重置进度条
            this.progress.style.width = '0%';
        });
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
        const song = this.playlist[this.currentSongIndex];
        const lyricLines = this.lyrics.querySelectorAll('.lyric-line');

        // 提前 0.5 秒显示歌词
        const adjustedTime = currentTime + 0.5;

        // 找到当前应该高亮的歌词
        let activeIndex = song.lyrics.findIndex((lyric, index) => {
            const nextLyric = song.lyrics[index + 1];
            return adjustedTime >= lyric.time && (!nextLyric || adjustedTime < nextLyric.time);
        });

        // 更新歌词高亮状态
        lyricLines.forEach((line, index) => {
            if (index === activeIndex) {
                line.classList.add('active');
                // 滚动到当前歌词
                this.scrollToActiveLyric(line);
            } else {
                line.classList.remove('active');
            }
        });
    }

    scrollToActiveLyric(activeLine) {
        if (!activeLine || !this.autoScroll) return;

        const container = this.lyrics;
        const lineTop = activeLine.offsetTop;
        const containerHeight = container.clientHeight;

        // 计算滚动位置，使当前歌词位于容器中间
        const scrollTop = lineTop - (containerHeight / 2) + (activeLine.clientHeight / 2);

        container.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
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
        if (song.lyrics) {
            // 获取 lyrics-wrapper 元素
            const wrapper = this.lyrics.querySelector('.lyrics-wrapper') || this.lyrics;
            
            // 创建所有歌词行
            const lyricsHTML = song.lyrics.map((lyric, index) =>
                `<p class="lyric-line" data-time="${lyric.time}" style="cursor: pointer">${lyric.text}</p>`
            ).join('');
            
            // 设置歌词内容
            wrapper.innerHTML = lyricsHTML;

            // 初始滚动到第一行歌词
            const firstLine = wrapper.querySelector('.lyric-line');
            if (firstLine) {
                this.scrollToActiveLyric(firstLine);
            }
        }
    }
}

// 初始化播放器
const player = new MusicPlayer(); 