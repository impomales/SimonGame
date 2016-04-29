$(document).ready(function() {
  var isOn = false;
  var inProgress = false;
  var isStrict = false;

  var steps = 0;
  
  const GREEN = 0;
  const RED = 1;
  const YELLOW = 2;
  const BLUE = 3;

  var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  var pattern = [];
  var userIndex = 0;

  $('#greenGlow').fadeOut(0);
  $('#redGlow').fadeOut(0);
  $('#yellowGlow').fadeOut(0);
  $('#blueGlow').fadeOut(0);

  function getColor(x) {
    switch (x) {
      case 0:
        return 'green';
      case 1:
        return 'red';
      case 2:
        return 'yellow';
      case 3:
        return 'blue';
      default:
        return 'invalid color';
    }
  }
  
  function updateSteps() {
  $('#count').html(steps);
  }
  
  $('#strict').click(function() {
    if (isOn && !inProgress) {
      isStrict = !isStrict;
      if (isStrict)
        $('#strict').css('background-color', '#ffff33');
      else
        $('#strict').css('background-color', '#acac00');
    }
  });

  $('#start').click(function() {
    if (isOn) {
      if (inProgress) {
        pattern = [];
        steps = 0;
        userIndex = 0;
        $('#count').html(steps);
      }
      nextColor();
      playPattern();
      inProgress = true;
    }
  });

  function playRandomColor() {
    var color = getColor(Math.floor(Math.random() * 4));
    return color;
  }

  function playPattern() {
    for (var i = 0; i < pattern.length; i++) {
      setTimeout(flash, i * 1000, pattern[i]);
    }
  }

  function flash(color) {
    playAudio(color);
    $('#' + color + 'Glow').fadeIn(500).fadeOut(500);
  }

  function playAudio(color) {
    switch (color) {
      case 'green':
        greenAudio.load();
        greenAudio.play();
        break;
      case 'red':
        redAudio.load();
        redAudio.play();
        break;
      case 'yellow':
        yellowAudio.load();
        yellowAudio.play();
        break;
      case 'blue':
        blueAudio.load();
        blueAudio.play();
        break;
      default:
        console.log('invalid color!');
    }
  }

  function nextColor() {
    var color = playRandomColor();
    pattern.push(color);
  }

  $('#switch').click(function() {
    isOn = !isOn;
    var val = (isOn) ? '20px' : '-3px';
    $(this).css('margin-left', val);
    if (isOn) $('#count').html(0);
    else $('#count').empty();
    if (isOn) {
      inProgress = false;
      steps = 0; userIndex = 0; pattern = [];
    }
  })

  $('.button').click(function() {
    if (isOn) {
      playAudio(this.id);
      $('#' + this.id + 'Glow').fadeIn(200).fadeOut(200);

      if (inProgress) {
        if (this.id === pattern[userIndex]) {
          userIndex++;
          if (userIndex == pattern.length) {
            steps++;
            $('#count').html(steps);
            if (steps === 20) {
              // notify won!
              $('#count').html('win');
              steps = 0;
              pattern = [];
            }
            nextColor();
            setTimeout(updateSteps, 1000);
            setTimeout(playPattern, 1000);
            userIndex = 0;
          }
        } else {
          $('#count').html('!     !');
          if (isStrict) {
            pattern = [];
            nextColor();
          }
          userIndex = 0;
          steps = 0;
          setTimeout(updateSteps, 1000);
          setTimeout(playPattern, 1000);
        }
      }
    }
  })
});