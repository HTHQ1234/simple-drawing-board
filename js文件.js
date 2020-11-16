let boxs = document.querySelectorAll('.color > div');
    let color = 'red';
    let linewidth = 10;
    let text = document.querySelector('.colorvalue');
    let penweight = document.querySelector('.colorweight')
    let colorbutton = document.querySelector('.colorbutton');
    let cleanbutton = document.querySelector('.cleanbutton');
    let cleanpen = document.querySelector('.clean');
    let weightbutton = document.querySelector('.weightbutton');




    function draw() {
      var canvas = document.querySelector('#canvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.lineWidth = linewidth;

        for (let i = 0; i < boxs.length; i++) {
          boxs[i].onclick = function () {
            color = boxs[i].className;
            ctx.globalCompositeOperation = 'source-over';
            if (penweight.value !== '') {
              ctx.lineWidth = penweight.value * 1;
            } else {
              ctx.lineWidth = linewidth;
            }
          }
        };

        weightbutton.addEventListener("click", function () {
          ctx.lineWidth = penweight.value * 1;
        });

        colorbutton.addEventListener("click", function () {
          color = text.value;
        });

        //给canvas添加一个鼠标按下事件
        canvas.onmousedown = function (e) {
          var ev = e || window.event;
          var x = ev.clientX - 475;
          var y = ev.clientY - 20;

          ctx.strokeStyle = color;

          ctx.beginPath();
          ctx.moveTo(x, y);

          //鼠标移动事件
          canvas.onmousemove = function (e) {
            var ev = e || window.event;
            var x = ev.clientX - 475;
            var y = ev.clientY - 20;

            ctx.lineTo(x, y);

            ctx.stroke();
          }

          //鼠标抬起事件
          canvas.onmouseup = function () {
            canvas.onmousemove = '';
          }

          cleanbutton.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          });

          cleanpen.addEventListener('click', () => {
            ctx.globalCompositeOperation = 'destination-out'; //如果鼠标划的地方与画布重叠的话，去掉画布重叠的颜色
            ctx.lineCap = 'round'; //让你的画笔成为一种形状
            ctx.lineWidth = 30;
          });
        }
      }
    }