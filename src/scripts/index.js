window.onload = () => {
  const light = document.getElementById('light-01');
  const inputContainer = light.getElementsByClassName('selector')[0];
  const picker = document.getElementById('color-01');
  const text = document.getElementById('text-01');
  const presetContainer = document.getElementById('presets-01');

  const setColors = (color, includeInputs = false) => {
    const tc = tinycolor(color);
    const isLight = tc.isLight;

    inputContainer.style.backgroundColor = color;
    light.style.backgroundColor = color;
    text.style.backgroundColor = color;
    text.style.color = isLight ? 'black' : 'white';

    if (includeInputs) {
      text.value = color;
      picker.value = color;
    }
    const amount = 10;
    const highlight = tc
      .clone()
      .lighten(amount)
      .toString();
    const lowlight = tc
      .clone()
      .darken(amount)
      .toString();
    const shadow = `20px 20px 60px ${lowlight}, -20px -20px 60px ${highlight}`;
    inputContainer.style.boxShadow = shadow;
    inputContainer.style.borderBottom = `1px solid ${tc
      .clone()
      .setAlpha(0.2)
      .toString()}`;
    console.log(shadow);

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
    inputContainer.opacity = opacity;
    presetContainer.style.opacity = opacity;
    picker.style.opacity = opacity;
  };

  const loadColor = window.location.hash;
  setColors(loadColor || tinycolor.random().toHexString(), true);

  Array.from(document.getElementsByClassName('preset')).forEach(presetEl => {
    presetEl.addEventListener('click', handlePresetClick);
  });

  picker.addEventListener('input', handleColorPickerInput);
  picker.addEventListener('click', e => e.stopPropagation());

  text.addEventListener('change', handleColorTextChange);
  text.addEventListener('click', e => e.stopPropagation());

  light.addEventListener('click', handleLightClick);
};
