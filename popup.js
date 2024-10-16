// Handle "Set Speed" button
document.getElementById('setSpeed').addEventListener('click', () => {
  let speed = document.getElementById('speedInput').value;
  
  if (speed) {
    // Convert input to a number and enforce maximum speed
    speed = Number(speed);
    if (speed > 1e+200) {
      alert("Maximum speed is 1e+200. Please enter a smaller value.");
      return;
    }

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: (speed) => {
          if (localStorage.getItem('config-vehicle-speed')) {
            localStorage.setItem('config-vehicle-speed', speed);
            alert('Vehicle speed set to ' + speed);
            console.log('Vehicle speed set to:', speed);  // Debugging

            // Auto-refresh the page
            location.reload();
          } else {
            alert('config-vehicle-speed not found in localStorage.');
          }
        },
        args: [speed]
      });
    });
  } else {
    alert("Please enter a valid speed.");
  }
});

// Handle "Reset Speed" button
document.getElementById('resetSpeed').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: () => {
        console.log("Resetting speed to 1");

        if (localStorage.getItem('config-vehicle-speed')) {
          localStorage.setItem('config-vehicle-speed', 1);
          console.log("Vehicle speed reset to 1");
          alert('Vehicle speed reset to 1');

          // Auto-refresh the page
          location.reload();
        } else {
          alert('config-vehicle-speed not found in localStorage.');
        }
      }
    });
  });
});
