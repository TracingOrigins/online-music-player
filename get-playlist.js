const { log } = require('console');
const fs = require('fs');
const path = require('path');

function parseLRC(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const lyrics = [];

    // LRC时间标签格式: [mm:ss.xx]
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/;

    lines.forEach(line => {
        const match = line.match(timeRegex);
        if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseInt(match[2]);
            const centiseconds = parseInt(match[3]);
            let text = match[4].trim();

            // 清理文本中的时间标记 <mm:ss.xx>
            text = text.replace(/<\d{2}:\d{2}\.\d{2}>/g, '');

            // 转换为秒
            const time = minutes * 60 + seconds + centiseconds / 100;

            if (text) {
                lyrics.push({ time: time, text: text });
            }
        }
    });

    // 按时间排序
    lyrics.sort((a, b) => a.time - b.time);

    // 返回歌词
    return lyrics;
}




// 获取单个歌曲信息
function getMusicInfo(file)  {
    const parts = file.split(' - ');
    const artist = parts[0];
    const title = parts[1].split('.')[0];
    const audio = `${artist} - ${title}.mp3`;
    const background = `${artist} - ${title}.png`;
    let lyrics = parseLRC(file);

    // 输出歌曲信息
    const result = {
        title: title,
        artist: artist,
        audio: audio,
        background: background,
        lyrics: lyrics
    };
    // console.log(result);
    return result;
}

// 获取所有歌曲信息
function getPlaylist() {
    const directoryPath = process.cwd(); // 获取当前工作目录
    let playlist = [];
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        // 获取当前目录下的所有lrc文件
        const lrcFiles = files.filter(file => path.extname(file) === '.lrc');
        lrcFiles.forEach(file => {
            playlist.push(getMusicInfo(file));
        });
        console.log(JSON.stringify(playlist));
    });
}


getPlaylist()

