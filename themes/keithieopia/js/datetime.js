function dayOfYear() {
  // https://stackoverflow.com/a/8619946
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function ordinal_suffix_of(i) {
  // https://stackoverflow.com/a/13627586
  var j = i % 10, k = i % 100;

  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }

  return "th";
}

function decimalTime() {
  var now = new Date();

  var h = now.getHours() * 3600;
  var m = now.getMinutes() * 60;
  var s = now.getSeconds();
  var t = (h + m + s) / 86400;

  return t.toFixed(5).substring(1);
}

function keithDate() {
  dn = dayOfYear();

  if ((dn % 30) === 0) {
    return 30;
  }
  else {
    return (dn % 30);
  }
}

function keithDay() {
  var dn = dayOfYear();

  if (dn <= 360) {
    switch (dn % 7) {
      case 0:
        return "Sepday";
        break;
      case 1:
        return "Uniday";
        break;
      case 2:
        return "Duoday";
        break;
      case 3:
        return "Triday";
        break;
      case 4:
        return "Quaday";
        break;
      case 5:
        return "Penday";
        break;
      case 6:
        return "Hexday";
        break;
    }
  }
  else {
    return "";
  }
}

function keithYear() {
  var now = new Date();
  var y = now.getFullYear();
  return (y - 2002);
}

function keithMonth() {
  var dn = dayOfYear();

  if (dn > 360) {
    switch (dn) {
      case 361:
        return "Unimid";
        break;
      case 362:
        return "Duomid";
        break;
      case 363:
        return "Trimid";
        break;
      case 364:
        return "Quamid";
        break;
      case 365:
        return "Penmid";
        break;
      case 366:
        return "Hexmid";
        break;
    }
  }
  else {
    switch (Math.floor((dn / 31) + 1)) {
      case 1:
        return "Unomar";
      case 2:
        return "Dosmar";
      case 3:
        return "Tresmar";
      case 4:
        return "Viermar";
      case 5:
        return "Funfmar";
      case 6:
        return "Sechmar";
      case 7:
        return "Nanamar";
      case 8:
        return "Yamar";
      case 9:
        return "Kokomar";
      case 10:
        return "Dixmar";
      case 11:
        return "Onzemar";
      case 12:
        return "Keithmar";
    }
  }
}

window.onload = function () {
  setTime();
  setDate();
  setInterval(setTime, 1000);
  setInterval(setDate, 600000);

  function setTime() {
    document.querySelectorAll('#clock')[0].innerHTML =  dayOfYear() + decimalTime();
  }

  function setDate() {
    var dn = dayOfYear();
    if (dn > 360) {
      document.querySelectorAll('#date')[0].innerHTML = keithMonth() + " " + keithYear() + "<sup>IY</sup>";
    }
    else {
      document.querySelectorAll('#date')[0].innerHTML =  keithDay() + ", " + keithDate() +
                                                       "<sup>" + ordinal_suffix_of(keithDate()) + "</sup> " +
                                                       keithMonth() + " " + keithYear() + "<sup>IY</sup>";
    }
  };
}

