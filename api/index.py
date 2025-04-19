from flask import Flask, jsonify, request, send_from_directory
import os
import json
from datetime import datetime, timedelta
import random

app = Flask(__name__)

# Sample data for the application
LABS = [
    {
        "id": 1,
        "title": "Network Traffic Analysis",
        "description": "Learn to analyze network traffic to identify suspicious activities and potential threats.",
        "category": "network",
        "difficulty": "intermediate",
        "duration": "2 hours",
        "completions": 1245,
        "featured": True
    },
    {
        "id": 2,
        "title": "Web Application Vulnerabilities",
        "description": "Discover and exploit common web vulnerabilities in a controlled environment.",
        "category": "web",
        "difficulty": "beginner",
        "duration": "3 hours",
        "completions": 2187,
        "featured": True
    },
    {
        "id": 3,
        "title": "Advanced Malware Analysis",
        "description": "Analyze sophisticated malware samples and understand their behavior.",
        "category": "malware",
        "difficulty": "advanced",
        "duration": "4 hours",
        "completions": 876,
        "featured": True
    },
    {
        "id": 4,
        "title": "SQL Injection Fundamentals",
        "description": "Learn the basics of SQL injection attacks and how to prevent them.",
        "category": "web",
        "difficulty": "beginner",
        "duration": "1.5 hours",
        "completions": 3245,
        "featured": False
    },
    {
        "id": 5,
        "title": "Packet Sniffing and Analysis",
        "description": "Use Wireshark to capture and analyze network packets for security analysis.",
        "category": "network",
        "difficulty": "intermediate",
        "duration": "2.5 hours",
        "completions": 1567,
        "featured": False
    }
]

DISCUSSIONS = [
    {
        "id": 1,
        "title": "New vulnerability in OpenSSL - CVE-2023-XXXX",
        "description": "A critical vulnerability has been discovered in OpenSSL that could allow remote code execution. Let's discuss mitigation strategies.",
        "author": "SecurityResearcher",
        "replies": 24,
        "views": 1205,
        "time": "2 hours ago",
        "tags": ["vulnerability", "OpenSSL", "CVE"],
        "trending": True,
        "latest": False,
        "popular": False
    },
    {
        "id": 2,
        "title": "Best practices for container security in 2023",
        "description": "With the rise of containerization, what are the current best practices for securing Docker and Kubernetes environments?",
        "author": "DockerPro",
        "replies": 18,
        "views": 876,
        "time": "5 hours ago",
        "tags": ["containers", "docker", "kubernetes"],
        "trending": True,
        "latest": False,
        "popular": False
    },
    {
        "id": 3,
        "title": "Latest security tools for automated pentesting",
        "description": "I've been exploring new tools for automated penetration testing. Here's what I've found so far.",
        "author": "PenTester",
        "replies": 3,
        "views": 124,
        "time": "30 minutes ago",
        "tags": ["pentesting", "automation", "tools"],
        "trending": False,
        "latest": True,
        "popular": False
    },
    {
        "id": 4,
        "title": "The future of cybersecurity: AI and ML in defense strategies",
        "description": "How will artificial intelligence and machine learning shape the future of cybersecurity defense?",
        "author": "AIResearcher",
        "replies": 87,
        "views": 3452,
        "time": "1 week ago",
        "tags": ["AI", "ML", "future"],
        "trending": False,
        "latest": False,
        "popular": True
    }
]

THREATS = [
    {
        "id": 1,
        "name": "Ransomware Campaign",
        "description": "New ransomware targeting healthcare organizations via phishing emails",
        "severity": "High",
        "date": "Today"
    },
    {
        "id": 2,
        "name": "Zero-day Exploit",
        "description": "Unpatched vulnerability in popular CMS being actively exploited",
        "severity": "Critical",
        "date": "Yesterday"
    },
    {
        "id": 3,
        "name": "DDoS Attack Wave",
        "description": "Increased DDoS attacks targeting financial institutions",
        "severity": "Medium",
        "date": "2 days ago"
    }
]

# API Routes
@app.route('/api/status', methods=['GET'])
def status():
    """Check if the Python backend is running"""
    return jsonify({
        "status": "Online",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/labs', methods=['GET'])
def get_labs():
    """Get all labs"""
    return jsonify({"labs": LABS})

@app.route('/api/labs/<int:lab_id>', methods=['GET'])
def get_lab(lab_id):
    """Get a specific lab by ID"""
    lab = next((lab for lab in LABS if lab["id"] == lab_id), None)
    if lab:
        return jsonify({"lab": lab})
    return jsonify({"error": "Lab not found"}), 404

@app.route('/api/labs/start/<int:lab_id>', methods=['GET'])
def start_lab(lab_id):
    """Start a lab environment"""
    lab = next((lab for lab in LABS if lab["id"] == lab_id), None)
    if not lab:
        return jsonify({"error": "Lab not found"}), 404
    
    # In a real application, this would start a lab environment
    # For this example, we'll just return a simple HTML page
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>CyberSecHub Lab: {lab['title']}</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #1a1a1a; color: #f0f0f0; }}
            .container {{ max-width: 800px; margin: 0 auto; }}
            .header {{ display: flex; align-items: center; margin-bottom: 20px; }}
            .header h1 {{ margin-left: 10px; }}
            .terminal {{ background-color: #000; border-radius: 5px; padding: 15px; font-family: monospace; }}
            .terminal pre {{ margin: 0; color: #0f0; }}
            .btn {{ background-color: #0070f3; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <h1>CyberSecHub Lab: {lab['title']}</h1>
            </div>
            <p>Difficulty: {lab['difficulty'].capitalize()}</p>
            <p>Duration: {lab['duration']}</p>
            <p>{lab['description']}</p>
            
            <h2>Lab Environment</h2>
            <p>This lab is powered by Python and provides a realistic environment for practicing cybersecurity skills.</p>
            
            <div class="terminal">
                <pre>$ python -c "import cybersec_tools"
$ cybersec_tools.scan_network()
Scanning network...
Found 5 devices on network
Analyzing traffic...
Suspicious activity detected on 192.168.1.5
$ _</pre>
            </div>
            
            <h2>Instructions</h2>
            <ol>
                <li>Use the terminal above to interact with the lab environment</li>
                <li>Complete the tasks listed in the objectives section</li>
                <li>Submit your findings when complete</li>
            </ol>
            
            <button class="btn" onclick="window.location.href='/labs'">Return to Labs</button>
        </div>
    </body>
    </html>
    """
    
    return html_content

@app.route('/api/community/discussions', methods=['GET'])
def get_discussions():
    """Get all discussions"""
    return jsonify({"discussions": DISCUSSIONS})

@app.route('/api/community/discussions/<int:discussion_id>', methods=['GET'])
def get_discussion(discussion_id):
    """Get a specific discussion by ID"""
    discussion = next((d for d in DISCUSSIONS if d["id"] == discussion_id), None)
    if discussion:
        return jsonify({"discussion": discussion})
    return jsonify({"error": "Discussion not found"}), 404

@app.route('/api/threats/latest', methods=['GET'])
def get_latest_threats():
    """Get the latest threats"""
    return jsonify({"threats": THREATS})

@app.route('/api/scan', methods=['POST'])
def scan_target():
    """Simulate a security scan of a target"""
    data = request.json
    target = data.get('target', '')
    
    if not target:
        return jsonify({"error": "No target specified"}), 400
    
    # In a real application, this would perform an actual scan
    # For this example, we'll return simulated results
    vulnerabilities = [
        {"name": "Open SSH Port", "severity": "Low", "details": "Port 22 is open"},
        {"name": "Outdated Web Server", "severity": "Medium", "details": "Web server is running an outdated version"},
        {"name": "Missing Security Headers", "severity": "Medium", "details": "HTTP response is missing security headers"}
    ]
    
    # Randomly select a subset of vulnerabilities
    result_count = random.randint(0, len(vulnerabilities))
    results = random.sample(vulnerabilities, result_count)
    
    return jsonify({
        "target": target,
        "scan_time": datetime.now().isoformat(),
        "vulnerabilities": results
    })

if __name__ == '__main__':
    # This is used when running locally
    app.run(host='127.0.0.1', port=5328, debug=True)
