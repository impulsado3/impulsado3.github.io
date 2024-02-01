const about = document.querySelector('#about')
const projects = document.querySelector('#projects')
const aboutContent = document.querySelector('#about-content')
const projectsContent = document.querySelector('#projects-content')

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function getBoxSize() {
  const { width, height } = getWindowDimensions();
  if (width < 600) {
    return {
      width: '80%',
      height: height > 500 ? '55%' : '80%'
    };
  } else {
    return {
      width: '325px',
      height: '360px'
    };
  }
}

about.addEventListener('click', () => {
  const boxSize = getBoxSize();
  const aboutBox = new WinBox({
    title: 'About Me',
    width: boxSize.width,
    height: boxSize.height,
    top: 50,
    right: 50,
    bottom: 50,
    left: 30,
    mount: aboutContent,
    onfocus: function () {
      this.setBackground('#5B5B5B')
    },
    onblur: function () {
      this.setBackground('#777')
    },
  })
})

projects.addEventListener('click', () => {
  const boxSize = getBoxSize();
  const projectsBox = new WinBox({
    title: 'Projects',
    width: boxSize.width,
    height: boxSize.height,
    top: 70,
    right: 50,
    bottom: 50,
    left: 50,
    mount: projectsContent,
    onfocus: function () {
      this.setBackground('#5B5B5B')
    },
    onblur: function () {
      this.setBackground('#777')
    },
  })
})