function MIT(canvas, ctx) {
  let assetPath = "images/izod/";
  let itemsToLoad = 4;
  let itemsLoaded = 0;
  let imgMIT1 = new Image();
  let imgMIT2 = new Image();
  let sample1Img = new Image();
  let arrow = new Image();
  let xOffset = 0;
  let yOffset = 0;
  let yMovement = 0; /* 0 to 1 */
  let dragMode = 0; /* 0 = no drag, 1 = drag machine, */
  let isFixed = 0; /* 0=draggable; 1=not draggable */
  let sampleLoaded = false;
  let menuPinText = ["Pin", "Unpin"];
  let menuPinIcon = [ContextMenu.pinIcon, ContextMenu.unpinIcon];
  let mitPlayRef = null;
  let currentSampleState = 0; //0: no crack; 1: necked; 2:cracked
  let currentDialReading = 0;
  let currentLoad = 0;

  let flashArrow = false;


  let scale = 1.2;

  let isActive = false;

  imgMIT1.src = assetPath + "1.png";
  imgMIT1.onload = itemsLoaded++;
  

  sample1Img.src = assetPath + "sample.png";
  sample1Img.onload = itemsLoaded++;


  arrow.src = assetPath + "arrow-h.png";
  arrow.onload = itemsLoaded++;


  var contextMenu;
  var contextMenuInstance = null;
  var degrees = 0;

  const init = () => {
    isActive = true;
    xOffset = 10;
    yOffset = 10;

    if (itemsLoaded >= itemsToLoad) {
      ctx.refresh();
    }

    contextMenu = new ContextMenu();
  };

  const reset = () => {
    degrees = 0;
  }

  const paint = () => {
    if (!isActive) return;
    ctx.fillStyle = "black";
    ctx.font = "9pt sans-serif";

    x = (xOffset + 80) * scale;
    y = (yOffset + 100) * scale;

    ctx.drawImage(imgMIT1, x, y, imgMIT1.width * scale, imgMIT1.height * scale);

    if (sampleLoaded) {
      let currentSample = sample1Img;
      // if (CURRENT_SAMPLE == "izod") {
      //   currentSample = sample1Img;
      // } else if (CURRENT_SAMPLE == "brass") {
      //   currentSample = sample2Img;
      // } else if (CURRENT_SAMPLE == "steel") {
      //   currentSample = sample3Img;
      // }
      let _x = (xOffset + 193) * scale;
      let _y = (yOffset + 284) * scale;
      ctx.drawImage(currentSample, _x, _y, (currentSample.width * scale) / 3, (currentSample.height * scale) / 3);
    }

    let _x = (xOffset + 246) * scale;
    let _y = (yOffset + 268) * scale;
    drawRotated(ctx, imgMIT2, _x, _y, degrees);

    // draw sample
    flashArrow = !flashArrow;
    if (!sampleLoaded && flashArrow) {
      let _y = y + 240 * scale;
      let _x = x + 1 * scale;

      let delX = x + 50;
      ctx.fillText("Drag sample here", _x-50, _y);
      // ctx.drawImage(arrow, _x + 100, _y, arrow.width / 2, arrow.height / 2);
      ctx.drawImage(arrow, delX, _y - 15, arrow.width / 2, arrow.height / 2);
    }

    ctx.save();
  };

  const drawRotated = (ctx, image, x, y, degrees) => {
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, x, y);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
    ctx.restore();
  };

  const start = () => {
   degrees = 0;

    const move1 = () => {
      var mitInterval1 = setInterval(() => {
        if (degrees > 140) {
          clearInterval(mitInterval1);
          move2();
        }
        degrees += 1;
        ctx.refresh();
      }, 10);
    };

    const move2 = () => {
      var mitInterval2 = setInterval(() => {
        if (degrees < 80) {
          clearInterval(mitInterval2);
          move3();
        }
        degrees -= 1;
        ctx.refresh();
      }, 12);
    };

    const move3 = () => {
      var mitInterval2 = setInterval(() => {
        if (degrees < 80) {
          clearInterval(mitInterval2);
          move4();
        }
        degrees -= 1;
        ctx.refresh();
      }, 14);
    };

    const move4 = () => {
      var mitInterval3 = setInterval(() => {
        if (degrees > 110) {
          clearInterval(mitInterval3);
          move5();
        }
        degrees += 1;
        ctx.refresh();
      }, 16);
    };

    const move5 = () => {
      var mitInterval4 = setInterval(() => {
        if (degrees < 88) {
          clearInterval(mitInterval4);
          move6();
        }
        degrees -= 1;
        ctx.refresh();
      }, 20);
    };

    const move6 = () => {
      var mitInterval5 = setInterval(() => {
        if (degrees > 92) {
          clearInterval(mitInterval5);
          degrees = 88;
          ctx.refresh();
          stop();
        }
        degrees += 1;
        ctx.refresh();
      }, 25);
    };

    move1();
  };

  const stop = () => {
    if (mitPlayRef) {
      clearInterval(mitPlayRef);
      mitPlayRef = null;
    }
  };

  const isInside = ({ x, y }) => {
    boundary = {
      xmin: (xOffset + 100) * scale,
      xmax: (xOffset + 550) * scale,
      ymin: (yOffset + 170) * scale,
      ymax: (yOffset + 500) * scale,
    };

     //ctx.fillRect(boundary.xmin, boundary.ymin, boundary.xmax - boundary.xmin, boundary.ymax - boundary.ymin);

    if (x > boundary.xmin && x < boundary.xmax && y > boundary.ymin && y < boundary.ymax) {
      return true;
    }
  };

  const getMouseCoords = (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) * devicePixelRatio;
    let y = (event.clientY - rect.top) * devicePixelRatio;
    return { x: x, y: y };
  };

  function drawLine(point1, point2) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
  }

  const onClickHandler = (event) => {
    if (contextMenuInstance) {
      contextMenu.closeMenu(contextMenuInstance);
    }
  };

  const onMouseDownHandler = (event) => {
    if (isFixed == 0 && isInside(getMouseCoords(event))) {
      dragMode = 1;
      return;
    }
  };

  const onMouseUpHandler = (event) => {
    // if(dragMode == 0){
    //   return;
    // }
    dragMode = 0;
  };

  const onMouseMoveHandler = (event) => {
    if (dragMode == 0) return;
    const rect = canvas.getBoundingClientRect();
    // let x = event.clientX - rect.left;
    // let y = event.clientY - rect.top;
    let { x, y } = getMouseCoords(event);

    // ctx.fillRect(x, y, 5, 5);
    // // ctx.refresh();
    // return;

    // let dx = (x - startX)/scale;
    // let dy = (y - startY)/scale;

    if (dragMode == 1) {
      // xOffset += dx;
      // yOffset += dy;
      xOffset = (x - 300 * scale) / scale;
      yOffset = (y - 300 * scale) / scale;

      ctx.refresh();

      // startX = x;
      // startY = y;
    }
  };

  const onMouseWheelHandler = (event) => {
    if (isActive && isInside(getMouseCoords(event))) {
      let { deltaY } = event;
      if (deltaY > 0) {
        // scale down the image
        scale = Math.max(0.1, scale - 0.05);
      } else {
        // scale up (zoom)
        scale = Math.min(2, scale + 0.05);
      }
      ctx.refresh();
    }
  };

  const onContextMenuHandler = (event) => {
    if (isActive && contextMenuInstance) {
      contextMenu.closeMenu(contextMenuInstance);
    }

    if (isActive && isInside(getMouseCoords(event))) {
      let menuItems = [
        {
          content: `${ContextMenu.deleteIcon}Delete`,
          divider: "top", // top, bottom, top-bottom
          events: {
            click: destroy,
          },
        },
        {
          content: `${menuPinIcon[isFixed]}${menuPinText[isFixed]}`,
          divider: "top", // top, bottom, top-bottom
          events: {
            click: () => {
              if (contextMenuInstance) {
                contextMenu.closeMenu(contextMenuInstance);
              }

              // toggle
              isFixed = isFixed ? 0 : 1;
              ctx.refresh();
            },
          },
        },
      ];

      if (sampleLoaded) {
        menuItems.push({
          content: `${ContextMenu.deleteIcon}Unload Sample`,
          divider: "top", // top, bottom, top-bottom
          events: {
            click: () => {
              if (contextMenuInstance) {
                contextMenu.closeMenu(contextMenuInstance);
              }

              sampleLoaded = false;
              sample.init();
              ctx.refresh();
            },
          },
        });
      }

      contextMenu.setMenuItems(menuItems);
      contextMenuInstance = contextMenu.show(event);
    }
    return true;
  };

  const destroy = () => {
    if (contextMenuInstance) {
      contextMenu.closeMenu(contextMenuInstance);
    }

    isActive = false;
    ctx.refresh();
  };

  return {
    init: init,
    start: start,
    stop: stop,
    isActive: () => isActive,
    isInside: isInside,
    setConfig: (conf) => {
      config = conf;
    },
    isRunning: () => (mitPlayRef ? true : false),
    loadSample: () => {
      sampleLoaded = true;
      yMovement = 0.4;
    },
    unLoadSample: () => {
      sampleLoaded = false;
      ctx.refresh();
    },
    getLoad: () => currentLoad,
    getDialReading: () => currentDialReading,
    isSampleLoaded: () => sampleLoaded,
    getSampleState: () => currentSampleState,
    onMouseDownHandler: onMouseDownHandler,
    onMouseUpHandler: onMouseUpHandler,
    onMouseMoveHandler: onMouseMoveHandler,
    onContextMenuHandler: onContextMenuHandler,
    onClickHandler: onClickHandler,
    onMouseWheelHandler: onMouseWheelHandler,
    paint: paint,
    destroy: destroy,
    reset: reset,
  };
}

function Sample(canvas, ctx) {
  let assetPath = "images/sample/";
  if (typeof SAMPLE_ASSETS_PATH !== "undefined") {
    assetPath = SAMPLE_ASSETS_PATH;
  }

  let itemsToLoad = 2;
  let itemsLoaded = 0;
  let sample1Img = new Image();
  let sample2Img = new Image();
  // let sample2Img = new Image();
  // let sample3Img = new Image();
  // let sample1Cracked = new Image();
  // let sample1Necked = new Image();
  let xOffset = 40;
  let yOffset = 120;
  let yMovement = 0; /* 0 to 1 */
  let dragMode = 0; /* 0 = no drag, 1 = drag machine, */
  let isFixed = 0; /* 0=draggable; 1=not draggable */
  let rotate = 0; /* 0=horizontal; 1=vertical */
  let menuPinText = ["Pin", "Unpin"];
  let menuPinIcon = [ContextMenu.pinIcon, ContextMenu.unpinIcon];
  let menuRotateText = ["Rotate", "Rotate back"];
  let menuRotateIcon = [ContextMenu.rotateRight, ContextMenu.rotateLeft];

  let scale = 0.6;

  let isActive = false;
  sample1Img.src = "images/sample/sample.png";
  sample1Img.onload = itemsLoaded++;
  sample2Img.src = "images/sample/sample_utm.png";
  sample2Img.onload = itemsLoaded++;

  var contextMenu;
  var contextMenuInstance = null;

  const init = () => {
    isActive = true;
    xOffset = 40;
    yOffset = 120;

    if (itemsLoaded >= itemsToLoad) {
      ctx.refresh();
    }

    contextMenu = new ContextMenu();
  };

  const paint = () => {
    if (!isActive) return;

    ctx.save();

    x = xOffset * scale;
    y = yOffset * scale;

    if (rotate) {
      x = -x;
      y = -y;
      ctx.rotate((90 * Math.PI) / 180);
    }

    let currentSample = sample1Img;
    if(CURRENT_SAMPLE == "rolled") {
      currentSample = sample2Img;
    }
    // if (CURRENT_SAMPLE == "aluminium") {
    //   currentSample = sample1Img;
    // } else if (CURRENT_SAMPLE == "brass") {
    //   currentSample = sample2Img;
    // } else if (CURRENT_SAMPLE == "steel") {
    //   currentSample = sample3Img;
    // }

    // if (utm) {
    // if (utm.getSampleState() == 1) {
    //   currentSample = sample1Necked;
    // } else if (utm.getSampleState() == 2) {
    //   currentSample = sample1Cracked;
    // }
    // }
    ctx.drawImage(currentSample, x, y, currentSample.width * scale, currentSample.height * scale);
    ctx.restore();
  };

  const start = (speed, direction) => {
    // speed 0 to 1
    // direction -1:down, 1: up

    if (direction == -1) {
      let ref = setInterval(() => {
        step = speed * 0.05;
        yMovement -= step;

        if (yMovement <= 0) {
          clearInterval(ref);
          return;
        }

        ctx.refresh();
      }, 100);
    } else {
      let ref = setInterval(() => {
        step = speed * 0.05;
        yMovement += step;

        if (yMovement >= 1) {
          clearInterval(ref);
          return;
        }

        ctx.refresh();
      }, 100);
    }
  };

  const isInside = ({ x, y }) => {
    if (rotate) {
      boundary = {
        ymin: (-xOffset + 10) * scale,
        ymax: (-xOffset + 750) * scale,
        xmin: (yOffset - 100) * scale,
        xmax: (yOffset + 5) * scale,
      };
    } else {
      boundary = {
        xmin: (xOffset + 8) * scale,
        xmax: (xOffset + 180) * scale,
        ymin: yOffset * scale,
        ymax: (yOffset + 80) * scale,
      };
    }

    // ctx.fillRect(boundary.xmin, boundary.ymin, boundary.xmax - boundary.xmin, boundary.ymax - boundary.ymin);

    if (x > boundary.xmin && x < boundary.xmax && y > boundary.ymin && y < boundary.ymax) {
      return true;
    }
  };

  const getMouseCoords = (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) * devicePixelRatio;
    let y = (event.clientY - rect.top) * devicePixelRatio;
    return { x: x, y: y };
  };

  const onClickHandler = (event) => {
    if (contextMenuInstance) {
      contextMenu.closeMenu(contextMenuInstance);
    }
  };

  const onMouseDownHandler = (event) => {
    if (isFixed == 0 && isInside(getMouseCoords(event))) {
      dragMode = 1;
      return;
    }
  };

  const onMouseUpHandler = (event) => {
    if (dragMode == 1) {
      if (mit && mit.isActive() && mit.isInside(getMouseCoords(event))) {
        mit.loadSample();
        destroy();
      }
      else if (utm && utm.isActive() && utm.isInside(getMouseCoords(event))) {
        utm.loadSample1();
        destroy();
      }
      ctx.refresh();
    }

    dragMode = 0;
  };

  const onMouseMoveHandler = (event) => {
    if (dragMode == 0) return;

    let { x, y } = getMouseCoords(event);

    if (dragMode == 1) {
      if (rotate) {
        xOffset = -(y - 20 * scale) / scale;
        yOffset = (x + 50 * scale) / scale;
      } else {
        xOffset = (x - 100 * scale) / scale;
        yOffset = (y - 50 * scale) / scale;
      }
      ctx.refresh();
    }
  };

  const onMouseWheelHandler = (event) => {
    if (isActive && isInside(getMouseCoords(event))) {
      let { deltaY } = event;
      if (deltaY > 0) {
        // scale down the image
        scale = Math.max(0.1, scale - 0.05);
      } else {
        // scale up (zoom)
        scale = Math.min(2, scale + 0.05);
      }
      ctx.refresh();
    }
  };

  const onContextMenuHandler = (event) => {
    if (isActive && contextMenuInstance) {
      contextMenu.closeMenu(contextMenuInstance);
    }

    if (isActive && isInside(getMouseCoords(event))) {
      contextMenu.setMenuItems([
        {
          content: `${ContextMenu.deleteIcon}Delete`,
          divider: "top", // top, bottom, top-bottom
          events: {
            click: destory,
          },
        },
        {
          content: `${menuPinIcon[isFixed]}${menuPinText[isFixed]}`,
          divider: "top", // top, bottom, top-bottom
          events: {
            click: () => {
              if (contextMenuInstance) {
                contextMenu.closeMenu(contextMenuInstance);
              }

              // toggle
              isFixed = isFixed ? 0 : 1;
              ctx.refresh();
            },
          },
        },
        {
          content: `${menuRotateIcon[rotate]}${menuRotateText[rotate]}`,
          divider: "top", // top, bottom, top-bottom
          events: {
            click: () => {
              if (contextMenuInstance) {
                contextMenu.closeMenu(contextMenuInstance);
              }

              rotate = rotate == 0 ? 1 : 0;

              xOffset = -rotate * 30 + 10;
              yOffset = 120;

              ctx.refresh();
            },
          },
        },
      ]);
      contextMenuInstance = contextMenu.show(event);
    }
    return true;
  };

  const destroy = () => {
    if (contextMenuInstance) {
      contextMenu.closeMenu(contextMenuInstance);
    }

    isActive = false;
    ctx.refresh();
  };

  return {
    init: init,
    start: start,
    isActive: () => isActive,
    setAssetsPath: (path) => {
      assetPath = path;
    },
    onMouseDownHandler: onMouseDownHandler,
    onMouseUpHandler: onMouseUpHandler,
    onMouseMoveHandler: onMouseMoveHandler,
    onContextMenuHandler: onContextMenuHandler,
    onClickHandler: onClickHandler,
    onMouseWheelHandler: onMouseWheelHandler,
    paint: paint,
    destroy: destroy,
  };
}
function UTM(canvas, ctx) {
  let assetPath = "images/utm/";
  let assetPath2 = "images/izod/";
  let itemsToLoad = 8;
  let itemsLoaded = 0;
  let imgUTM1 = new Image();
  let imgUTM2 = new Image();
  let imgUTMPiller1 = new Image();
  let imgUTMPiller2 = new Image();
  let sample = new Image();
  let sampleNecked = new Image();
  let sampleCracked = new Image();
  let arrow = new Image();
  let xOffset = 60;
  let yOffset = 100;
  let yMovement = 0; /* 0 to 1 */
  let dragMode = 0; /* 0 = no drag, 1 = drag machine, */
  let isFixed = 0; /* 0=draggable; 1=not draggable */
  let sampleLoaded = false;
  let menuPinText = ["Pin", "Unpin"];
  let menuPinIcon = [ContextMenu.pinIcon, ContextMenu.unpinIcon];
  let utmPlayRef = null;
  let currentSampleState = 0; //0: no crack; 1: necked; 2:cracked
  let currentDialReading = 0;
  let currentLoad = 0;
  let config = {
    yield_point: 0.7,
    breaking_point: 0.9,
    finish_point: 1,
  };

  let scale = 0.8;
  let flashArrow = true;

  // let startX = 0;
  // let startY = 0;

  let isActive = false;

  imgUTM1.src = assetPath + "utm1.png";
  imgUTM1.onload = itemsLoaded++;

  imgUTM2.src = assetPath + "utm2.png";
  imgUTM2.onload = itemsLoaded++;

  imgUTMPiller1.src = assetPath + "utm3.png";
  imgUTMPiller1.onload = itemsLoaded++;
  imgUTMPiller2.src = assetPath + "utm3.png";
  imgUTMPiller2.onload = itemsLoaded++;

  sample.src = assetPath2 + "sample_utm.png";
  sample.onload = itemsLoaded++;

  // sampleNecked.src = assetPath + "sample1-necked.png";
  // sampleNecked.onload = itemsLoaded++;

  // sampleCracked.src = assetPath + "sample1-cracked.png";
  // sampleCracked.onload = itemsLoaded++;

  arrow.src = assetPath + "arrow-h.png";
  arrow.onload = itemsLoaded++;

  var contextMenu;
  var contextMenuInstance = null;

  const init = () => {
    isActive = true;
    xOffset = 60;
    yOffset = 100;

    if (itemsLoaded >= itemsToLoad) {
      ctx.refresh();
    }

    contextMenu = new ContextMenu();
  };

  const paint = () => {
    if (!isActive) return;

    flashArrow = !flashArrow;
    ctx.fillStyle = "black";
    ctx.font = "9pt sans-serif";

    if (sampleLoaded) {
      let currentSample = sample;
      currentSampleState = 0;

      // if (yMovement > config.breaking_point) {
      //   currentSample = sampleCracked;
      //   currentSampleState = 2;
      // } else if (yMovement > config.yield_point) {
      //   currentSample = sampleNecked;
      //   currentSampleState = 1;
      // }

      x = (xOffset + 225) * scale;

      let yStart = (yOffset + 485 - yMovement * 90) * scale;
      let yEnd = (50 + yMovement * 90) * scale;
      ctx.drawImage(currentSample, x, yStart, (sample.width * scale) / 4, yEnd);
    } else if (flashArrow) {
      let x = (xOffset + 155) * scale;
      let y = (yOffset + 485) * scale;
      ctx.fillText("Drag sample here", x - 110, y + 12);
      ctx.drawImage(arrow, x, y, arrow.width / 2.5, arrow.height / 2.5);
    }

    x = (xOffset + 105) * scale;
    y = (yOffset + 180) * scale;
    ctx.drawImage(imgUTMPiller1, x, y, imgUTMPiller1.width * scale, imgUTMPiller1.height * scale);

    x = (xOffset + 295) * scale;
    y = (yOffset + 180) * scale;
    ctx.drawImage(imgUTMPiller2, x, y, imgUTMPiller2.width * scale, imgUTMPiller2.height * scale);

    x = (xOffset + 68) * scale;
    let shift = yMovement * 90 - 120;
    y = (yOffset - shift) * scale;
    ctx.drawImage(imgUTM2, x, y, imgUTM2.width * scale, imgUTM2.height * scale);

    (x = xOffset * scale), (y = (yOffset + 500) * scale);
    ctx.drawImage(imgUTM1, x, y, imgUTM1.width * scale, imgUTM1.height * scale);

    ctx.save();
  };

  const start = (speed, direction) => {
    // speed 0 to 1
    // direction -1:down, 1: up

    if (direction == -1) {
      utmPlayRef = setInterval(() => {
        step = speed * 0.05;
        yMovement -= step;

        if (yMovement <= 0) {
          clearInterval(utmPlayRef);
          return;
        }

        ctx.refresh();
      }, 100);
    } else {
      utmPlayRef = setInterval(() => {
        step = speed * 0.05;
        yMovement += step;
        currentLoad += 0.5;
        currentDialReading = currentLoad * Math.round(5 * yMovement);

        if (yMovement >= config.finish_point) {
          clearInterval(utmPlayRef);
          utmPlayRef = null;
          return;
        }

        ctx.refresh();
      }, 100);
    }
  };

  const stop = () => {
    if (utmPlayRef) {
      clearInterval(utmPlayRef);
      utmPlayRef = null;
    }
  };

  const isInside = ({ x, y }) => {
    boundary = {
      xmin: (xOffset + 100) * scale,
      xmax: (xOffset + 450) * scale,
      ymin: (yOffset + 150) * scale,
      ymax: (yOffset + 850) * scale,
    };

    //ctx.fillRect(boundary.xmin, boundary.ymin, boundary.xmax - boundary.xmin, boundary.ymax - boundary.ymin);

    if (x > boundary.xmin && x < boundary.xmax && y > boundary.ymin && y < boundary.ymax) {
      return true;
    }
  };

  const getMouseCoords = (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left) * devicePixelRatio;
    let y = (event.clientY - rect.top) * devicePixelRatio;
    return { x: x, y: y };
  };

  const getCanvasCoords = (x, y) => {
    let rect = canvas.getBoundingClientRect();
    let cx = x / devicePixelRatio + rect.left;
    let cy = y / devicePixelRatio + rect.top;
    return { x: cx, y: cy };
  };

  function drawLine(point1, point2) {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
  }

  const onClickHandler = (event) => {
    if (contextMenuInstance) {
      contextMenu.closeMenu(contextMenuInstance);
    }
  };

  const onMouseDownHandler = (event) => {
    if (isFixed == 0 && isInside(getMouseCoords(event))) {
      dragMode = 1;
      return;
    }
  };

  const onMouseUpHandler = (event) => {
    // if(dragMode == 0){
    //   return;
    // }
    dragMode = 0;
  };

  const onMouseMoveHandler = (event) => {
    if (dragMode == 0) return;
    const rect = canvas.getBoundingClientRect();
    // let x = event.clientX - rect.left;
    // let y = event.clientY - rect.top;
    let { x, y } = getMouseCoords(event);

    // ctx.fillRect(x, y, 5, 5);
    // // ctx.refresh();
    // return;

    // let dx = (x - startX)/scale;
    // let dy = (y - startY)/scale;

    if (dragMode == 1) {
      // xOffset += dx;
      // yOffset += dy;
      xOffset = (x - 100 * scale) / scale;
      yOffset = (y - 300 * scale) / scale;

      ctx.refresh();

      // startX = x;
      // startY = y;
    }
  };

  const onMouseWheelHandler = (event) => {
    if (isActive && isInside(getMouseCoords(event))) {
      let { deltaY } = event;
      if (deltaY > 0) {
        // scale down the image
        scale = Math.max(0.1, scale - 0.05);
      } else {
        // scale up (zoom)
        scale = Math.min(2, scale + 0.05);
      }
      ctx.refresh();
    }
  };

  const onContextMenuHandler = (event) => {
    if (isActive && contextMenuInstance) {
      contextMenu.closeMenu(contextMenuInstance);
    }

    if (isActive && isInside(getMouseCoords(event))) {
      let menuItems = [
        {
          content: `${ContextMenu.deleteIcon}Delete`,
          divider: "top", // top, bottom, top-bottom
          events: {
            click: destory,
          },
        },
        {
          content: `${menuPinIcon[isFixed]}${menuPinText[isFixed]}`,
          divider: "top", // top, bottom, top-bottom
          events: {
            click: () => {
              if (contextMenuInstance) {
                contextMenu.closeMenu(contextMenuInstance);
              }

              // toggle
              isFixed = isFixed ? 0 : 1;
              ctx.refresh();
            },
          },
        },
      ];

      if (sampleLoaded) {
        menuItems.push({
          content: `${ContextMenu.deleteIcon}Unload Sample`,
          divider: "top", // top, bottom, top-bottom
          events: {
            click: () => {
              if (contextMenuInstance) {
                contextMenu.closeMenu(contextMenuInstance);
              }

              sampleLoaded = 0;
              sample1.init();
              ctx.refresh();
            },
          },
        });
      }

      contextMenu.setMenuItems(menuItems);
      let dx = (xOffset + 350) * scale;
      let dy = (yOffset + 120) * scale;
      contextMenuInstance = contextMenu.show(getCanvasCoords(dx, dy));
    }
    return true;
  };

  const destory = () => {
    if (contextMenuInstance) {
      contextMenu.closeMenu(contextMenuInstance);
    }

    isActive = false;
    ctx.refresh();
  };

  return {
    init: init,
    start: start,
    stop: stop,
    isActive: () => isActive,
    isInside: isInside,
    setConfig: (conf) => {
      config = conf;
    },
    isRunning: () => (utmPlayRef ? true : false),
    loadSample1: () => {
      sampleLoaded = true;
      yMovement = 0.55;
    },
    getLoad: () => currentLoad,
    getDialReading: () => currentDialReading,
    isSampleLoaded: () => sampleLoaded,
    getSampleState: () => currentSampleState,
    onMouseDownHandler: onMouseDownHandler,
    onMouseUpHandler: onMouseUpHandler,
    onMouseMoveHandler: onMouseMoveHandler,
    onContextMenuHandler: onContextMenuHandler,
    onClickHandler: onClickHandler,
    onMouseWheelHandler: onMouseWheelHandler,
    paint: paint,
    destory: destory,
  };
}