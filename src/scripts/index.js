window.onload = () => {
  const light = document.getElementById('light-01');
  const picker = document.getElementById('color-01');
  const text = document.getElementById('text-01');
  const presetContainer = document.getElementById('presets-01');

  const brightness = color => {
    const isHEX = color && color.indexOf('#') == 0;
    if (isHEX) {
      const m = color
        .substr(1)
        .match(color.length == 7 ? /(\S{2})/g : /(\S{1})/g);
      if (m) {
        const r = parseInt(m[0], 16);
        const g = parseInt(m[1], 16);
        const b = parseInt(m[2], 16);
        return (r * 299 + g * 587 + b * 114) / 1000;
      }
    }
    return 0;
  };

  const generateRandomColor = () => {
    return '#000000'.replace(/0/g, function() {
      return (~~(Math.random() * 16)).toString(16);
    });
  };
  const setColors = (color, includeInputs = false) => {
    const isLight = brightness(color) > 128;

    light.style.backgroundColor = color;
    text.style.backgroundColor = color;
    text.style.color = isLight ? 'black' : 'white';

    if (includeInputs) {
      text.value = color;
      picker.value = color;
    }

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
  const handlePresetClick = e => {
    e.stopPropagation();

    const color = e.target.getAttribute('color');
    setColors(color, true);
  };
  const handleLightClick = () => {
    const hidden = '0.1';
    let opacity = picker.style.opacity;
    opacity = opacity === hidden ? 1.0 : hidden;

    text.style.opacity = opacity;
    presetContainer.style.opacity = opacity;
    picker.style.opacity = opacity;
  };

  const loadColor = window.location.hash;
  setColors(loadColor || generateRandomColor(), true);

  Array.from(document.getElementsByClassName('preset')).forEach(presetEl => {
    presetEl.addEventListener('click', handlePresetClick);
  });

  picker.addEventListener('input', handleColorPickerInput);
  picker.addEventListener('click', e => e.stopPropagation());

  text.addEventListener('change', handleColorTextChange);
  text.addEventListener('click', e => e.stopPropagation());

  light.addEventListener('click', handleLightClick);
};
