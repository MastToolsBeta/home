  $(document).ready(function () {
    // Initial SVG icon
    setTimeout(function () {
      $("#splash").hide();
    }, 5000); // Adjust the time as needed (5000 milliseconds = 5 seconds)

    // Interval for creating and showing splash elements
    setInterval(function () {
      createAndShowSplash(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    }, 1000); // Adjust the interval as needed

    function createAndShowSplash(topgap, leftgap) {
      const copy = $("#splash").clone();

      copy[0].setAttribute("id", "copy_splash");
      copy[0].setAttribute("fill", get_random_color());
      let size = rand(50, 300);
      copy[0].setAttribute("width", size + 'px');
      copy[0].setAttribute("height", size + 'px');
      copy.css('marginLeft', topgap - size / 3 + 'px');
      copy.css('margin-top', leftgap - size / 3 + 'px');

      copy.appendTo(".holi-animation");
      copy.show();

      // Remove the element after 3 seconds (adjust the time as needed)
      setTimeout(function () {
        copy.remove();
      }, 3000);
    }

    function rand(min, max) {
      return parseInt(Math.random() * (max - min + 1), 10) + min;
    }

    function get_random_color() {
      var h = rand(1, 360);
      var s = rand(30, 100);
      var l = rand(30, 70);
      return "hsl(" + h + "," + s + "%," + l + "%)";
    }
  });

