window.onload = function () {
  var ins = document.getElementsByTagName("input");
  for (var i = 0; i < ins.length; i++) {
    clearInput(ins[i], i);
  }
  function clearInput(input, index) {
    input.onfocus = function () {
      input.value = "";
      input.style.opacity = 9;
    };
  }
};
