import Background from './../index';
import { useState } from 'react';
import { Radio } from 'antd';

const params: any = {
  Simple: {
    particles: {
      number: {
        value: 50,
      },
      size: {
        value: 3,
      },
    },
    // "interactivity": {
    //     "events": {
    //         "onhover": {
    //             "enable": true,
    //             "mode": "repulse"
    //         }
    //     }
    // }
  },
  Bubbles: {
    particles: {
      number: {
        value: 160,
        density: {
          enable: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          speed: 4,
          size_min: 0.3,
        },
      },
      line_linked: {
        enable: false,
      },
      move: {
        random: true,
        speed: 1,
        direction: 'top',
        out_mode: 'out',
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'bubble',
        },
        onclick: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        bubble: {
          distance: 250,
          duration: 2,
          size: 0,
          opacity: 0,
        },
        repulse: {
          distance: 400,
          duration: 4,
        },
      },
    },
  },
  Snow: {
    particles: {
      number: {
        value: 160,
        density: {
          enable: false,
        },
      },
      size: {
        value: 10,
        random: true,
      },
      move: {
        direction: 'bottom',
        out_mode: 'out',
      },
      line_linked: {
        enable: false,
      },
    },
    interactivity: {
      events: {
        onclick: {
          enable: true,
          mode: 'remove',
        },
      },
      modes: {
        remove: {
          particles_nb: 10,
        },
      },
    },
  },
  NightSky: {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 1500,
        },
      },
      line_linked: {
        enable: true,
        opacity: 0.02,
      },
      move: {
        direction: 'right',
        speed: 0.05,
      },
      size: {
        value: 1,
      },
      opacity: {
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.05,
        },
      },
    },
    interactivity: {
      events: {
        onclick: {
          enable: true,
          mode: 'push',
        },
      },
      modes: {
        push: {
          particles_nb: 1,
        },
      },
    },
    retina_detect: true,
  },
  Polygon: {
    fps_limit: 28,
    particles: {
      collisions: {
        enable: false,
      },
      number: {
        value: 200,
        density: {
          enable: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 30,
        opacity: 0.4,
      },
      move: {
        speed: 1,
      },
      opacity: {
        anim: {
          enable: true,
          opacity_min: 0.05,
          speed: 1,
          sync: false,
        },
        value: 0.4,
      },
    },
    polygon: {
      enable: true,
      scale: 0.5,
      type: 'inline',
      move: {
        radius: 10,
      },
      // "url": require('./small-deer.svg'),
      inline: {
        arrangement: 'equidistant',
      },
      draw: {
        enable: true,
        stroke: {
          color: 'rgba(255, 255, 255, .2)',
        },
      },
    },
    retina_detect: false,
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'bubble',
        },
      },
      modes: {
        bubble: {
          size: 6,
          distance: 40,
        },
      },
    },
  },
};
export default () => {
  const [type, setType] = useState('Simple');
  return (
    <div style={{ height: 500 }}>
      常用效果配置：
      <Radio.Group onChange={(e) => setType(e.target.value)}>
        <Radio.Button value="Simple">基础模式</Radio.Button>
        <Radio.Button value="Bubbles">泡泡</Radio.Button>
        <Radio.Button value="Snow">下雪</Radio.Button>
        <Radio.Button value="NightSky">星空</Radio.Button>
        <Radio.Button value="Polygon">自定义形状</Radio.Button>
      </Radio.Group>
      <Background params={params[type]} />
    </div>
  );
};
