// @ts-nocheck
export interface PlayerProps {
  /**  audio类型， 语音播报 或者 音频地址 */
  type: 'SPEAK' | 'AUDIO';
  /**  是音频地址的情况下, 传入地址 */
  src?: string;
  /**  是SPAEK的情况下传入需要播报的语音文字 */
  speakText?: string;
  /**  是否循环 */
  loop?: boolean;
  /** 是否自动播放 */
  auto?: boolean;
  /** 状态改变的时候触发， SUSPEND暂停， RESTART再次播放，START：开始  */
  statusChange?: (
    _: 'SUSPEND' | 'RESTART' | 'START',
    config: PlayerProps,
  ) => void;
  [key: any]: any;
}

export interface PlayerType {
  /** 由于w3c规范，语音播放必须用户手动触发，防止滥用，用户常活动的网站可以传入documen.createElement('div')空节点, auto=true，即实现自动播放 */
  bind: (el: Element, props: PlayerProps) => void;
  /** 解除播放事件 */
  unbind: (el: Element) => void;
}
const AudioContext = window.AudioContext;
const bufferMap = {};
// const audioQueue = [] // 语音队列功能
// let CURRING_AUDIO_STATUS
// const GLOBAL_AUDIO_STATAS = {
//   FINISHED: Symbol('FINISHED'),
//   RUNNING: Symbol('RUNNING'),
//   SUSPEND: Symbol('SUSPEND')
// }
const VOICE_TYPE = {
  ADUIO: Symbol('ADUIO'),
  SPEAK: Symbol('SPEAK'),
};
let speakFn, speechSynthUtterance, audioInstance;

function loadBuffer({ buffer, audioCtx, source, loop, src }) {
  // if(CURRING_AUDIO_STATUS === GLOBAL_AUDIO_STATAS.RUNNING) { // 并发控制， 暂不添加
  //   audioQueue.push({
  //     type: VOICE_TYPE.ADUIO,
  //     src:
  //   })
  // }
  // eslint-disable-next-line no-param-reassign
  !source && (source = audioCtx.createBufferSource());
  source.loop = loop; // 警报忽略true的情况, 也没必要一直播放下去
  source.buffer = buffer;
  source.connect(audioCtx.destination);
  source.start();
  audioInstance = audioCtx;
  // CURRING_AUDIO_STATUS = GLOBAL_AUDIO_STATAS.RUNNING// 并发控制， 暂不添加
  source.onended = function () {
    bufferMap[src].isFinished = true;
    // if (!audioQueue.length) {
    //   CURRING_AUDIO_STATUS = GLOBAL_AUDIO_STATAS.FINISHED// 并发控制， 暂不添加
    // } else {

    // }
  };
  return source;
}
function handleSpeak({ speakText, statusChange, loop }) {
  !loop &&
    speechSynthUtterance &&
    speechSynthUtterance.removeEventListener('end', speakFn);
  audioInstance && audioInstance.state !== 'closed' && audioInstance.suspend();
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
    statusChange && statusChange('SUSPEND');
    speechSynthUtterance &&
      speechSynthUtterance.removeEventListener('end', speakFn);
    window.speechSynthesis.cancel();
  } else {
    window.speechSynthesis.cancel();
    statusChange && statusChange('START');
    speechSynthUtterance = new SpeechSynthesisUtterance(speakText);
    speakFn = function () {
      window.speechSynthesis.speak(speechSynthUtterance);
    };
    window.speechSynthesis.speak(speechSynthUtterance);
    loop && speechSynthUtterance.addEventListener('end', speakFn);
  }
}
function suspendOtherAud(src) {
  // 避免多个音频同时播放
  for (const key in bufferMap) {
    if (key !== src) {
      // 暂停其他音源
      const item = bufferMap[key];
      item.audioCtx.suspend();
    } else {
      audioInstance = bufferMap[key].audioCtx;
    }
  }
  speechSynthesis.pause();
}
function initFn(config) {
  const { el, src, speakText, loop, auto, statusChange, type } = config;
  suspendOtherAud(src);
  if (src && type === 'AUDIO') {
    const req = new Request(src);
    fetch(req).then(async () => {
      // const audioData = await res.arrayBuffer()
      const audioCtx = new AudioContext();
      el.handler = async function () {
        const tempItem = bufferMap[src];
        if (tempItem) {
          // 当前的src对应的音频已经加载过
          const { audioCtx, isFinished } = tempItem;
          const { state } = tempItem.source.context;
          if (isFinished || state === 'suspended') {
            // 已经播完, 重播
            statusChange && statusChange('RESTART', config);
            audioCtx.close();
            const audioCtxNext = new AudioContext();
            const bodyNext = await fetch(req); // buffer  UnImmutable, can not use
            const audioDataNext = await bodyNext.arrayBuffer();
            audioCtxNext.decodeAudioData(audioDataNext, function (buffer) {
              bufferMap[src] = {
                audioCtx: audioCtxNext,
                source: loadBuffer({
                  buffer,
                  audioCtx: audioCtxNext,
                  loop,
                  src,
                }),
                isFinished: false,
              };
            });
          } else if (state === 'running') {
            // 播放  => 暂停
            audioCtx.suspend();
            statusChange && statusChange('SUSPEND', config);
          }
          // else if (state === 'suspended') { // 暂停  => 继续
          //   if (isLoopChange) { // 改变了循环参数 => 需要和重播时一样的操作， 此时的source已经不能用，需要使用最新的配置重新实例后connect
          //     const audioCtxNext = new AudioContext()
          //     const bodyNext = await fetch(req) // buffer  UnImmutable, can not use
          //     const audioDataNext = await bodyNext.arrayBuffer()
          //     audioCtxNext.decodeAudioData(audioDataNext, function (buffer) {
          //       bufferMap[src] = {
          //         audioCtx: audioCtxNext,
          //         source: loadBuffer({ buffer, audioCtx: audioCtxNext, loop, src }),
          //         isFinished: false
          //       }
          //     })
          //   } else {
          //     audioCtx.resume()
          //   }
          //   suspendOtherAud(src)
          //   statusChange && statusChange('RESUME')
          // }
          return;
        }
        audioCtx.resume().then(() => {
          // 需要用户触发
          fetch(req).then(async (res) => {
            const audioData = await res.arrayBuffer();
            audioCtx.decodeAudioData(audioData, function (buffer) {
              bufferMap[src] = {
                audioCtx,
                audioData: res,
                source: loadBuffer({ buffer, audioCtx, loop, src }),
                type: VOICE_TYPE.ADUIO,
                loop,
                auto,
              };
              statusChange && statusChange('START', config);
              suspendOtherAud(src);
            });
          });
        });
      };
      if (auto || !el) {
        el.handler();
      }
      el && el.addEventListener('click', el.handler);
    });
  } else if (speakText && type === 'SPEAK') {
    // 新的任务进来时默认清楚所有的语音播报
    window.speechSynthesis.cancel();
    el &&
      (el.handler = function () {
        handleSpeak({ speakText, statusChange, loop });
      });
    if (!auto && el) {
      el.addEventListener('click', el.handler);
    } else {
      // 自动播放也需要做暂停
      statusChange && statusChange('START');
      handleSpeak({ speakText, statusChange, loop });
      el && el.addEventListener('click', el.handler);
    }
  }
}
function closeAllVoice() {
  // 关闭所有音频
  speechSynthUtterance &&
    speechSynthUtterance.removeEventListener('end', speakFn);
  audioInstance && audioInstance.state !== 'closed' && audioInstance.suspend();
  window.speechSynthesis.cancel();
}
initFn.closeAllVoice = closeAllVoice;

const audioPlayer: PlayerType = {
  bind(el, { type, src, speakText, loop = false, auto, statusChange }) {
    if (!src && !speakText) return;
    initFn({ el, src, speakText, loop, auto, statusChange, type });
  },
  unbind(el) {
    el.removeEventListener('click', el.handler);
  },
  update(
    el,
    {
      oldValue: {
        loop: _loop,
        type: _type,
        speakText: _speakText,
        src: _src,
        auto: _auto,
      },
      value: { type, src, speakText, loop = false, auto, statusChange },
    },
  ) {
    if (!speakText && !src) return;
    if (loop === _loop) {
      // 条件更新，
      if (speakText && type === 'SPEAK' && type === _type && auto === _auto) {
        // 循环参数&& 文字内容不变 && 类型不变 不更新
        if (_speakText === speakText) return;
      }
      if (src && type === 'AUDIO' && type === _type && auto === _auto) {
        // 循环参数&& url链接 && 类型不变  => 不更新
        if (src === _src) return;
      }
    }
    closeAllVoice();
    el.removeEventListener('click', el.handler);
    initFn({ el, src, speakText, loop, auto, statusChange, type }); // 由于webAudio的限制， 基础参数变化后需要new souce 后重新connect
  },
  __initFn: initFn,
};
export default audioPlayer;
