const fs = require('fs');
const path = require('path');

// LRC 解析函数
function parseLRC(lrc) {
    const lines = lrc.split('\n');
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2})\]/g;
    const lyrics = [];
    
    lines.forEach(line => {
        const matches = [...line.matchAll(timeRegex)];
        if (matches.length > 0) {
            matches.forEach(match => {
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const hundredths = parseInt(match[3]);
                const time = minutes * 60 + seconds + hundredths / 100;
                
                // 提取歌词文本
                const text = line.replace(timeRegex, '').trim();

                // 清理文本中的时间标记 <mm:ss.xx>
                // text = text.replace(/<\d{2}:\d{2}\.\d{2}>/g, '');

                if (text) {
                    lyrics.push({
                        time: time,
                        text: text
                    });
                }
            });
        }
    });
    
    // 按时间排序
    return lyrics.sort((a, b) => a.time - b.time);
}

// 初始化函数
function initialize() {

    // 读取音乐文件目录
    const playlist = [];
    const files = fs.readdirSync('.');
    
    // 获取所有 mp3 文件
    const mp3Files = files.filter(file => file.endsWith('.mp3'));
    console.log('Found MP3 files:', mp3Files);  // 添加日志
    
    mp3Files.forEach(mp3File => {
        const baseName = mp3File.slice(0, -4);
        const lrcFile = baseName + '.lrc';
        const bgFile = baseName + '.png';
        
        console.log('Processing file:', mp3File);  // 添加日志
        console.log('Looking for LRC:', lrcFile);  // 添加日志
        
        // 检查对应的歌词文件是否存在
        let lyrics = [];
        if (fs.existsSync(lrcFile)) {
            console.log('Found LRC file:', lrcFile);  // 添加日志
            const lrcContent = fs.readFileSync(lrcFile, 'utf8');
            lyrics = parseLRC(lrcContent);
        }
        
        // 构建播放列表项
        const [artist, title] = baseName.split(' - ');
        const item = {
            title: title || baseName,
            artist: artist || 'Unknown Artist',
            audio: mp3File,
            background: fs.existsSync(bgFile) ? bgFile : null,
            lyrics: lyrics
        };
        console.log('Adding to playlist:', item);  // 添加日志
        playlist.push(item);
    });
    
    // 将播放列表写入 JSON 文件
    fs.writeFileSync('playlist.json', JSON.stringify(playlist, null, 2));
    console.log('Playlist has been generated successfully!');
    console.log('Total songs:', playlist.length);  // 添加日志

}

// 运行初始化
initialize();