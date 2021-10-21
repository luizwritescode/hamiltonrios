function createKeyframeAnimation () {
    // Figure out the size of the element when collapsed.
    let {x, y} = calculateCollapsedScale();
    let animation = '';
    let inverseAnimation = '';
  
    for (let step = 0; step <= 100; step++) {
      // Remap the step value to an eased one.
      let easedStep = ease(step / 100);
        
      const width = x + (1 - x) * easedStep;
      
      animation += `${step}% {
        transform: scale(${width}, ${y});
      }`;
  
      // And now the inverse for the contents.
      const invWidth = 1 / width;

      inverseAnimation += `${step}% {
        transform: scale(${invWidth}, ${y});
      }`;
  
    }
  
    return `
    @keyframes sideBarAnimation {
      ${animation}
    }
  
    @keyframes menuContentsAnimation {
      ${inverseAnimation}
    }`;
  } 

  function ease (v, pow=4) {
    return 1 - Math.pow(1 - v, pow);
  }