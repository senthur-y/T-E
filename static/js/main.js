// Main JavaScript file for CyberSecHub

document.addEventListener("DOMContentLoaded", () => {
  // Initialize tab functionality
  initTabs()

  // Initialize terminal if it exists
  initTerminal()
})

function initTabs() {
  // Find all tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn")

  // Add click event to each button
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get the tab ID from the data attribute
      const tabId = button.getAttribute("data-tab")

      // Find the parent tabs container
      const tabsContainer = button.closest(".tabs")

      // Remove active class from all buttons and content in this container
      tabsContainer.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active")
      })

      tabsContainer.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active")
      })

      // Add active class to clicked button
      button.classList.add("active")

      // Add active class to corresponding content
      const tabContent = tabsContainer.querySelector(`#${tabId}-tab`)
      if (tabContent) {
        tabContent.classList.add("active")
      }
    })
  })
}

function initTerminal() {
  const terminal = document.getElementById("terminal")
  if (!terminal) return

  const terminalOutput = document.getElementById("terminal-output")
  const terminalCommand = document.getElementById("terminal-command")

  // Focus terminal on click
  terminal.addEventListener("click", () => {
    terminalCommand.focus()
  })

  // Handle command input
  terminalCommand.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = terminalCommand.value

      // Add command to output
      terminalOutput.textContent += "\n$ " + command

      // Process command
      processCommand(command, terminalOutput)

      // Clear input
      terminalCommand.value = ""

      // Scroll to bottom
      terminal.scrollTop = terminal.scrollHeight
    }
  })
}

function processCommand(command, outputElement) {
    // Simple command processor for the terminal
    if (command === 'help') {
        outputElement.textContent += '\nAvailable commands:\n- help: Show this help message\n- scan_network: Scan the network for devices\n- analyze_traffic: Analyze network traffic\n- inspect <ip>: Inspect a specific IP address\n- block <ip>: Block a specific IP address\n- clear: Clear the terminal';
    } else if (command === 'scan_network') {
        outputElement.textContent += '\nScanning network...\nFound 5 devices on network:\n- 192.168.1.1 (Router)\n- 192.168.1.2 (Your Machine)\n- 192.168.1.3 (Workstation)\n- 192.168.1.4 (Server)\n- 192.168.1.5 (Unknown)';
    } else if (command === 'analyze_traffic') {
        outputElement.textContent += '\nAnalyzing traffic...\nSuspicious activity detected on 192.168.1.5\nMultiple connection attempts to port 22 detected\nPossible SSH brute force attack in progress';
    } else if (command.startsWith('inspect')) {
        const ip = command.split(' ')[1];
        if (ip === '192.168.1.5') {
            outputElement.textContent += '\nInspecting 192.168.1.5...\nDevice info:\n- MAC Address: 00:11:22:33:44:55\n- Open ports: 22, 80, 443\n- Connection attempts to port 22: 157 in the last 5 minutes\n- Source IPs: Multiple';
        } else {
            outputElement.textContent += `\nInspecting ${ip}...\nNo suspicious activity detected`;
        }
    } else if (command.startsWith('block')) {
        const ip = command.split(' ')[1];
        outputElement.textContent += `\nBlocking ${ip}...\nIP address has been blocked successfully`;
        
        // Check objectives
        if (ip === '192.168.1.5') {
            const objective = document.getElementById('obj5');
            if (objective) objective.checked = true;
        }
    } else if\
