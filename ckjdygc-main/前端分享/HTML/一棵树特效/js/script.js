
const seasons = item => {
  let tl = new TimelineMax({ repeat: -1, yoyo: true });
  tl.add("s");
  tl.timeScale(1);
  tl.staggerTo(
      '.cls',
      1.5,
      {
        cycle: {
          fill: ["#3f7027", "#99b061", "#279401", "#d76a79"],
        },
ease: SlowMo.ease.config( 0.7, 0.7, false)
      },
      0.04
    )
    .staggerTo(
      '.cls',
      1.5,
      {
        cycle: {
          fill: ["#9c2706", "#f3bc2e", "#d45b12", "#5f5426"],
        },
ease: SlowMo.ease.config( 0.7, 0.7, false)
      },
      0.04
    )
 
    .staggerTo(
      '.cls',
      1.5,
      {
        cycle: {
          y: [500, 200, 300, 1000],
          x: [200, -200, -700, 700],
          rotation: function(i) {
            return i * 2;
          }
        },
        opacity: 0,
        fill: "#603c14",
        ease: Circ.easeInOut
      },
      0.05
    )
  return tl;
};

const master = new TimelineMax();
master.timeScale(1.5);
master.add(seasons());