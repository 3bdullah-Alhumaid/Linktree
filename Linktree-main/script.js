document.addEventListener('DOMContentLoaded', function() {
    const circle = document.getElementById('picture');
    const clipNumberElement = document.getElementById('clip-number');
    const videos = ['clips/MW2-clip.mp4', 'clips/MW2-clip2.mp4']; // Add the paths to the MP4 videos here
    let currentIndex = -1;
    let currentVideo = null;
    let isMouseInside = false;
    let isVideoPlaying = false;

    function updateClipNumber() {
        clipNumberElement.textContent = `Clip: ${currentIndex + 1}`;
    }

    function changeToNextVideo() {
        currentIndex = (currentIndex + 1) % videos.length;
        updateClipNumber();
        const video = document.createElement('video');
        video.src = videos[currentIndex];
        video.autoplay = true;
        video.loop = true;
        video.muted = true; // Add the muted attribute
        video.addEventListener('ended', function() {
            circle.removeChild(video);
            changeToNextVideo();
        });
        circle.appendChild(video);
        currentVideo = video;
        isVideoPlaying = true;
    }

    function playNextVideo() {
        if (currentVideo) {
            currentVideo.pause();
            circle.removeChild(currentVideo);
            currentVideo = null;
        }
        changeToNextVideo();
    }

    function handleMouseEnter() {
        isMouseInside = true;
        if (!currentVideo) {
            changeToNextVideo();
        } else if (!isVideoPlaying) {
            currentVideo.play();
            isVideoPlaying = true;
        }
        circle.style.backgroundImage = 'none'; // Hide the default image on hover
        clipNumberElement.style.display = 'inline-block'; // Show the clip counter
    }

    function handleMouseLeave() {
        isMouseInside = false;
        if (currentVideo) {
            currentVideo.pause();
            circle.removeChild(currentVideo);
            currentVideo = null;
        }
        currentIndex = -1; // Reset the index
        circle.style.backgroundImage = 'url(\'discord.jpg\')'; // Show the default image on mouse leave
        clipNumberElement.style.display = 'none'; // Hide the clip counter
        clipNumberElement.textContent = ''; // Remove the clip number
    }

    circle.addEventListener('mouseenter', handleMouseEnter);
    circle.addEventListener('mouseleave', handleMouseLeave);

    circle.addEventListener('click', function() {
        playNextVideo();
    });

    setInterval(function() {
        if (isMouseInside && !currentVideo) {
            changeToNextVideo();
        }
    }, 1000); // Check every second if the mouse is inside and play the next video if needed

    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible' && isMouseInside && !currentVideo) {
            changeToNextVideo();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const discord = document.querySelector('.discord');
    discord.addEventListener('click', () => {
      const textToCopy = '.7tf';
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Discord username copied ! تم نسخ اسم حساب الدسكورد');
      }).catch((error) => {
        console.error('Failed to copy text: ', error);
      });
    });
  });
  

function sendMail() {
    var message = document.getElementById("message").value;
    if (message.trim() === "") {
      return;
    }
  
    var currentTime = new Date().getTime();
    var lastSentTimestamp = localStorage.getItem("lastSentTimestamp");
  
    if (lastSentTimestamp && currentTime - lastSentTimestamp < 3600000) {
      var remainingTime = new Date(lastSentTimestamp - currentTime + 3600000);
      var minutes = remainingTime.getUTCMinutes().toString().padStart(2, "0");
      var seconds = remainingTime.getUTCSeconds().toString().padStart(2, "0");
      var formattedTime = minutes + ":" + seconds;
      alert("لك رسالة واحدة في الساعة، تقدر ترسل من جديد بعد " + formattedTime);
      return;
    }
  
    var params = {
      message: message,
    };
  
    const serviceID = "service_6gaqusc";
    const templateID = "template_cw3020c";
  
    emailjs.send(serviceID, templateID, params)
    .then(function (res) {
      document.getElementById("message").value = "";
      console.log(res);
      showPopupMessage();
      localStorage.setItem("lastSentTimestamp", currentTime);
    })
    .catch(function (err) {
      console.log(err);
    });
}
