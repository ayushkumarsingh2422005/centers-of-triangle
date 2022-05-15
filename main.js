window.onload = function() {
  alert(`Works on the basic mathmatics.

Drag the three dots of triangle to change vertices position.
  `)
  const canvas = document.querySelector('#canvas');
  const point1 = document.querySelector('#point1');
  const point2 = document.querySelector('#point2');
  const point3 = document.querySelector('#point3');
  const container = document.querySelector('.container');
  const c1 = document.querySelector('#c1');
  const c2 = document.querySelector('#c2');
  const c3 = document.querySelector('#c3');
  const c4 = document.querySelector('#c4');

  var x, y, center_typ;

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const ctx = canvas.getContext('2d');


  var point_pos = {
    point1: [150, 100],
    point2: [200, 150],
    point3: [100, 240]
  }

  function draw_centroid() {
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.setLineDash([5, 3]);
    ctx.lineWidth = 1;
    ctx.moveTo(point_pos.point1[0] + 10, point_pos.point1[1] + 10);
    ctx.lineTo((point_pos.point2[0] + point_pos.point3[0]) / 2 + 10, (point_pos.point2[1] + point_pos.point3[1]) / 2 + 10);

    ctx.moveTo(point_pos.point2[0] + 10, point_pos.point2[1] + 10);
    ctx.lineTo((point_pos.point1[0] + point_pos.point3[0]) / 2 + 10, (point_pos.point1[1] + point_pos.point3[1]) / 2 + 10);

    ctx.moveTo(point_pos.point3[0] + 10, point_pos.point3[1] + 10);
    ctx.lineTo((point_pos.point2[0] + point_pos.point1[0]) / 2 + 10, (point_pos.point2[1] + point_pos.point1[1]) / 2 + 10);

    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "#A52A2A";
    let centroid_x = (point_pos.point1[0] + point_pos.point2[0] + point_pos.point3[0]) / 3 + 10;
    let centroid_y = (point_pos.point1[1] + point_pos.point2[1] + point_pos.point3[1]) / 3 + 10;
    ctx.arc(centroid_x, centroid_y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  function draw_circumcenter() {
    let leng12_ = Math.pow(point_pos.point1[0] - point_pos.point2[0], 2) + Math.pow(point_pos.point1[1] - point_pos.point2[1], 2);

    let leng23_ = Math.pow(point_pos.point3[0] - point_pos.point2[0], 2) + Math.pow(point_pos.point3[1] - point_pos.point2[1], 2);

    let leng31_ = Math.pow(point_pos.point1[0] - point_pos.point3[0], 2) + Math.pow(point_pos.point1[1] - point_pos.point3[1], 2);

    let angle3 = Math.acos((leng23_ + leng31_ - leng12_) / (2 * Math.pow(leng23_, 0.5) * Math.pow(leng31_, 0.5)));
    let angle2 = Math.acos((leng23_ + leng12_ - leng31_) / (2 * Math.pow(leng23_, 0.5) * Math.pow(leng12_, 0.5)));
    let angle1 = Math.acos((leng12_ + leng31_ - leng23_) / (2 * Math.pow(leng12_, 0.5) * Math.pow(leng31_, 0.5)));

    let circumcenter_x = ((point_pos.point1[0] + 10) * Math.sin(2 * angle1) + (point_pos.point2[0] + 10) * Math.sin(2 * angle2) + (point_pos.point3[0] + 10) * Math.sin(2 * angle3)) / (Math.sin(2 * angle1) + Math.sin(2 * angle2) + Math.sin(2 * angle3));

    let circumcenter_y = ((point_pos.point1[1] + 10) * Math.sin(2 * angle1) + (point_pos.point2[1] + 10) * Math.sin(2 * angle2) + (point_pos.point3[1] + 10) * Math.sin(2 * angle3)) / (Math.sin(2 * angle1) + Math.sin(2 * angle2) + Math.sin(2 * angle3));

    let in_radi = Math.pow(Math.pow(circumcenter_x - point_pos.point1[0] - 10, 2) + Math.pow(circumcenter_y - point_pos.point1[1] - 10, 2), 0.5);

    ctx.beginPath();
    ctx.fillStyle = "#0000FF";
    ctx.setLineDash([5, 3]);
    ctx.arc(circumcenter_x, circumcenter_y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#0000FF";
    ctx.arc(circumcenter_x, circumcenter_y, in_radi, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = '#0096FF';
    ctx.moveTo((point_pos.point1[0] + point_pos.point2[0]) / 2+10, (point_pos.point1[1] + point_pos.point2[1]) / 2+10);
    ctx.lineTo(circumcenter_x, circumcenter_y);
    ctx.moveTo((point_pos.point1[0] + point_pos.point3[0]) / 2 + 10, (point_pos.point1[1] + point_pos.point3[1]) / 2 + 10);
    ctx.lineTo(circumcenter_x, circumcenter_y);
    ctx.moveTo((point_pos.point3[0] + point_pos.point2[0]) / 2 + 10, (point_pos.point3[1] + point_pos.point2[1]) / 2 + 10);
    ctx.lineTo(circumcenter_x, circumcenter_y);
    ctx.stroke();

  }

  function draw_incenter() {
    let leng12 = Math.pow(Math.pow(point_pos.point1[0] - point_pos.point2[0], 2) + Math.pow(point_pos.point1[1] - point_pos.point2[1], 2), 0.5);

    let leng23 = Math.pow(Math.pow(point_pos.point3[0] - point_pos.point2[0], 2) + Math.pow(point_pos.point3[1] - point_pos.point2[1], 2), 0.5);

    let leng31 = Math.pow(Math.pow(point_pos.point1[0] - point_pos.point3[0], 2) + Math.pow(point_pos.point1[1] - point_pos.point3[1], 2), 0.5);

    let cord_x = (leng12 * (point_pos.point3[0] + 10) + leng23 * (point_pos.point1[0] + 10) + leng31 * (point_pos.point2[0] + 10)) / (leng12 + leng23 + leng31);

    let cord_y = (leng12 * (point_pos.point3[1] + 10) + leng23 * (point_pos.point1[1] + 10) + leng31 * (point_pos.point2[1] + 10)) / (leng12 + leng23 + leng31);

    let semi_p = (leng12 + leng23 + leng31) / 2;

    let in_radi = Math.pow((semi_p - leng12) * (semi_p - leng23) * (semi_p - leng31) / semi_p, 0.5);

    ctx.beginPath();
    ctx.fillStyle = "#BF40BF";
    ctx.setLineDash([5, 3]);
    ctx.arc(cord_x, cord_y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#DA70D6";
    ctx.arc(cord_x, cord_y, in_radi, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = '#BF40BF';
    ctx.moveTo(point_pos.point1[0]+10, point_pos.point1[1]+10);
    ctx.lineTo(cord_x, cord_y);
    ctx.moveTo(point_pos.point2[0] + 10, point_pos.point2[1] + 10);
    ctx.lineTo(cord_x, cord_y);
    ctx.moveTo(point_pos.point3[0] + 10, point_pos.point3[1] + 10);
    ctx.lineTo(cord_x, cord_y);
    ctx.stroke();
  }

  function draw_orthocenter() {
    let leng12_ = Math.pow(point_pos.point1[0] - point_pos.point2[0], 2) + Math.pow(point_pos.point1[1] - point_pos.point2[1], 2);

    let leng23_ = Math.pow(point_pos.point3[0] - point_pos.point2[0], 2) + Math.pow(point_pos.point3[1] - point_pos.point2[1], 2);

    let leng31_ = Math.pow(point_pos.point1[0] - point_pos.point3[0], 2) + Math.pow(point_pos.point1[1] - point_pos.point3[1], 2);

    let angle3 = Math.acos((leng23_ + leng31_ - leng12_) / (2 * Math.pow(leng23_, 0.5) * Math.pow(leng31_, 0.5)));
    let angle2 = Math.acos((leng23_ + leng12_ - leng31_) / (2 * Math.pow(leng23_, 0.5) * Math.pow(leng12_, 0.5)));
    let angle1 = Math.acos((leng12_ + leng31_ - leng23_) / (2 * Math.pow(leng12_, 0.5) * Math.pow(leng31_, 0.5)));

    let circumcenter_x = ((point_pos.point1[0] + 10) * Math.sin(2 * angle1) + (point_pos.point2[0] + 10) * Math.sin(2 * angle2) + (point_pos.point3[0] + 10) * Math.sin(2 * angle3)) / (Math.sin(2 * angle1) + Math.sin(2 * angle2) + Math.sin(2 * angle3));

    let circumcenter_y = ((point_pos.point1[1] + 10) * Math.sin(2 * angle1) + (point_pos.point2[1] + 10) * Math.sin(2 * angle2) + (point_pos.point3[1] + 10) * Math.sin(2 * angle3)) / (Math.sin(2 * angle1) + Math.sin(2 * angle2) + Math.sin(2 * angle3));

    let centroid_x = (point_pos.point1[0] + point_pos.point2[0] + point_pos.point3[0]) / 3 + 10;
    let centroid_y = (point_pos.point1[1] + point_pos.point2[1] + point_pos.point3[1]) / 3 + 10;





    let cord_x = 3 * centroid_x - 2 * circumcenter_x;
    let cord_y = 3 * centroid_y - 2 * circumcenter_y;
    ctx.beginPath();
    ctx.fillStyle = "#00FF00";
    ctx.setLineDash([5, 3]);
    ctx.arc(cord_x, cord_y, 3, 0, Math.PI * 2);
    ctx.fill();
    //console.log(circumcenter_x);
  }

  /*function get_radio_value() {
    let checked = document.querySelector('input[type=radio]:checked');
    return checked.value;
  }*/


  function create_line() {
    ctx.beginPath();
    ctx.setLineDash([1, 0]);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(point_pos.point1[0] + 10, point_pos.point1[1] + 10);
    ctx.lineTo(point_pos.point2[0] + 10, point_pos.point2[1] + 10);
    ctx.lineTo(point_pos.point3[0] + 10, point_pos.point3[1] + 10);
    ctx.lineTo(point_pos.point1[0] + 10, point_pos.point1[1] + 10);
    ctx.stroke();

    //center_typ = get_radio_value();
    if (c1.checked) {
      draw_centroid();
    }
    if (c2.checked) {
      draw_circumcenter();
    }
    if (c3.checked) {
      draw_incenter();
    }
    if (c4.checked) {
      draw_orthocenter();
    }
  }


  function update_point() {
    point1.style.top = point_pos.point1[1] + 'px';
    point2.style.top = point_pos.point2[1] + 'px';
    point3.style.top = point_pos.point3[1] + 'px';

    point1.style.left = point_pos.point1[0] + 'px';
    point2.style.left = point_pos.point2[0] + 'px';
    point3.style.left = point_pos.point3[0] + 'px';

    create_line();
  }
  update_point();

  point1.addEventListener('touchmove', point_move1);
  point2.addEventListener('touchmove', point_move2);
  point3.addEventListener('touchmove', point_move3);


  function point_move1(event) {
    x = event.touches[0].clientX - 10;
    y = event.touches[0].clientY - 10;
    point_pos.point1 = [x, y];
    update_point();
  }

  function point_move2(event) {
    x = event.touches[0].clientX - 10;
    y = event.touches[0].clientY - 10;
    point_pos.point2 = [x, y];
    update_point();
  }

  function point_move3(event) {
    x = event.touches[0].clientX - 10;
    y = event.touches[0].clientY - 10;
    point_pos.point3 = [x, y];
    update_point();
  }


  container.addEventListener('touchmove', function(event) {
    container.style.left = event.touches[0].clientX - 60 + 'px';
    container.style.top = event.touches[0].clientY - container.clientHeight / 2 + 'px';
  });
}
