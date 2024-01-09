function times_from_config(times) {
  if (times.length == 0) {
    for (var day = 0; day < 7; day++) {
      for (var hour = 0; hour < 24; hour++) {
        times.push(true);
      }
    }
  }
  return times;
}

function Config(times, onChange) {
  function update_class(hour, active) {
    var e = document.getElementById("hour-" + hour)
    e.className = "hour";
    if (active)
      e.className += " active";
  }

  var onoff = true;
  var edit = false;

  function edit_start(hour) {
    onoff = !times[hour];
    edit_do(hour);
    edit = true;
  }

  function edit_do(hour) {
    times[hour] = onoff;
    update_class(hour, onoff);
  }

  function edit_stop() {
    edit = false;
  }

  function hour_from_elem(e) {
    return parseInt(e.id.split("-")[1]);
  }

  function hourMouseDown(e) {
    var hour = hour_from_elem(e.target);
    edit_start(hour);
  }

  function hourMouseOver(e) {
    if (!edit) return;
    var hour = hour_from_elem(e.target);
    edit_do(hour);
  }

  function bodyMouseUp() {
    edit_stop();
    onChange(times);
  }

  var root = document.getElementById('config')
  console.log(times);

  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  for (var hour = 0; hour < times.length; hour++) {
    var active = times[hour];
    if (hour % 24 == 0) {
      var day_div = document.createElement("div");
      var day_txt = document.createTextNode(days[Math.floor(hour/24)]);
      day_div.appendChild(day_txt);
      day_div.className = "day";
      root.appendChild(day_div);
    }

    var hour_div = document.createElement("div");
    var hour_txt = document.createTextNode(hour%24);
    hour_div.appendChild(hour_txt);
    hour_div.id = "hour-" + hour;
    root.appendChild(hour_div);
    update_class(hour, active);

    hour_div.addEventListener("mousedown", hourMouseDown);
    hour_div.addEventListener("mouseover", hourMouseOver);

    if (hour % 24 == 23) {
      var br = document.createElement("br");
      root.appendChild(br);
    }
  }

  document.addEventListener("mouseup", bodyMouseUp);
  return {}
}
