window.onload = () => {
  const body = document.getElementsByTagName('body')[0];
  const light = document.getElementById('light-01');
  const inputContainer = light.getElementsByClassName('selector')[0];
  const picker = document.getElementById('color-01');
  const text = document.getElementById('text-01');
  const presetContainer = document.getElementById('presets-01');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const fullscreenButtonIcon = fullscreenButton.getElementsByTagName('svg')[0];

  const setColors = (color, includeInputs = false) => {
    const tc = tinycolor(color);
    const mostReadable = tinycolor
      .mostReadable(color, ['#333', '#ddd'])
      .toString();
    inputContainer.style.backgroundColor = color;
    light.style.backgroundColor = color;
    text.style.backgroundColor = color;
    text.style.color = mostReadable;

    if (includeInputs) {
      text.value = color;
      picker.value = color;
    }
    const amount = 10;
    const highlight = tc.clone().lighten(amount).toString();
    const lowlight = tc.clone().darken(amount).toString();
    const shadow = `20px 20px 60px ${lowlight}, -20px -20px 60px ${highlight}`;
    inputContainer.style.boxShadow = shadow;
    inputContainer.style.borderBottom = `1px solid ${tc
      .clone()
      .setAlpha(0.2)
      .toString()}`;
    fullscreenButtonIcon.style.fill = mostReadable;

    window.location.hash = color;
  };
  const handleColorPickerInput = () => {
    const color = picker.value;

    setColors(color);
    text.value = color;
  };
  const handleColorTextChange = () => {
    const color = text.value;
    setColors(color);
    picker.value = color;
  };
  const handlePresetClick = (e) => {
    e.stopPropagation();

    const color = e.target.getAttribute('color');
    setColors(color, true);
  };
  const handleLightClick = () => {
    const hidden = '0.1';
    let opacity = picker.style.opacity;
    opacity = opacity === hidden ? 1.0 : hidden;

    text.style.opacity = opacity;
    inputContainer.opacity = opacity;
    presetContainer.style.opacity = opacity;
    picker.style.opacity = opacity;
    fullscreenButton.style.opacity = opacity;
  };
  const toggleFullscreen = () => {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((error) => {
          console.log(error.message);
        });
      } else {
        body.requestFullscreen().catch((error) => {
          console.log(error.message);
        });
      }
    }
  };

  const loadColor = window.location.hash;
  setColors(loadColor || tinycolor.random().toHexString(), true);

  Array.from(document.getElementsByClassName('preset')).forEach((presetEl) => {
    presetEl.addEventListener('click', handlePresetClick);
  });

  picker.addEventListener('input', handleColorPickerInput);
  picker.addEventListener('click', (e) => e.stopPropagation());

  text.addEventListener('change', handleColorTextChange);
  text.addEventListener('click', (e) => e.stopPropagation());

  light.addEventListener('click', handleLightClick);

  fullscreenButton.addEventListener('click', toggleFullscreen);
  fullscreenButton.style.display = document.fullscreenEnabled ? 'block' : 'none';
};
