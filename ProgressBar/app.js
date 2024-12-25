$(document).ready(function() {
    var interval;
    var progress;
    var isRunning = false;

    function resetProgressBar() {
        progress = 0;
        $("#progress-bar").css("width", "0%");
        $(".counter").text(progress);
    }

    $("#start-stop-btn").click(function() {
        if (isRunning) {
            // clearInterval(interval);
            $("#start-stop-btn").text("start");
            
            isRunning = false;
        } else {
            isRunning = true;
            $("#start-stop-btn").text("stop");
            $(".counter").css("background-color", "#e0e0e0");
            resetProgressBar();
            interval = setInterval(function() {
                progress++;
                var progressBarWidth = (progress / 10) * 100;
                $("#progress-bar").css("width", progressBarWidth + "%");
                $(".counter").text(progress);
                if (progress >= 10) {
                    clearInterval(interval);
                    $("#start-stop-btn").text("start");
                    $(".counter").css("background-color", "#2da82d");
                    isRunning = false;
                }
            }, 1000);
        }
    });
});