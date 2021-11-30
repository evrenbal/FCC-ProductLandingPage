function balSlider(container) {
  var BreakException;
  var duration = 5000;
  var slides = container.querySelectorAll('.slide');
  var intervalId = undefined;
  if (container.dataset.duration && container.dataset.duration > 0)
    duration = container.dataset.duration;

  var current = 0;
  try {
    slides.forEach( (slide, index) => {
      if (slide.classList.contains('active'))
        current = index;
        throw BreakException;
      }
    );
  } catch (e) {
    if (e !== BreakException) throw e;    
  }

  if (slides.length > 1)
  {
    var navigation = document.createElement( 'div' );
    navigation.classList.add('slide-navigation');
    container.appendChild(navigation);
    slides.forEach( (slide, index) => {
      var selector = document.createElement( 'a' );
      selector.setAttribute("id", 'slide-handle-' + index);
      selector.classList.add('slide-handle');
      selector.addEventListener('mouseover', function () {
        pause();
        if (index == current)
          return;
        hide(current);
        current = index;
        show(current);
      })
      navigation.appendChild(selector);
    });
    navigation.addEventListener('mouseleave', function () {
      console.log("out");
      start();
    })
  }

  start();

  function start() {
    if ( undefined != intervalId)
      return;
    intervalId = setInterval(() => { next() } , duration);
    show(current);
  }

  function pause() {
    clearInterval(intervalId);
    intervalId = undefined;
  }

  function next() {
    hide(current);
    current = (current < slides.length-1 ? current + 1 : 0 );
    show(current);
  }

  function prev() {
    clearInterval(intervalId);
    hide(current);
    current = (current == 0  ? slides.length-1 : current -1  );
    show(current);
    intervalId = setInterval(() => { next() } , duration);
  }

  function show(index)
  {
    slides[index].classList.add('active');
    document.getElementById('slide-handle-' + index).classList.add('active');

  }

  function hide(index)
  {
    slides[index].classList.remove('active');
    document.getElementById('slide-handle-' + index).classList.remove('active');
  }
}

window.addEventListener("load", function () {
  document.querySelectorAll('.slider').forEach(function (elm) {
    new balSlider(elm);
  });

  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var formNotice = document.getElementById('form-notice');
    formNotice.innerHTML = 'Your e-mail '+document.getElementById('email').value + ' was not added to the list!<br>Because it is a dummy list!';
    formNotice.style.opacity = '1.0';
    setTimeout(() => { formNotice.style.opacity = '0'}, 3000);
  });

});