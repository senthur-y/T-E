from flask import Flask, render_template, jsonify, request, redirect, url_for
import json
import os
from datetime import datetime
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
        "tags": ["vulnerability", "OpenSSL", "CVE"]
    },
    {
        "id": 2,
        "title": "Best practices for container security in 2023",
        "description": "With the rise of containerization, what are the current best practices for securing Docker and Kubernetes environments?",
        "author": "DockerPro",
        "replies": 18,
        "views": 876,
        "time": "5 hours ago",
        "tags": ["containers", "docker", "kubernetes"]
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

# Routes
@app.route('/')
def home():
    """Render the home page"""
    return render_template('index.html', threats=THREATS)

@app.route('/community')
def community():
    """Render the community page"""
    return render_template('community.html', discussions=DISCUSSIONS)

@app.route('/labs')
def labs():
    """Render the labs page"""
    return render_template('labs.html', labs=LABS)

@app.route('/resources')
def resources():
    """Render the resources page"""
    return render_template('resources.html')

@app.route('/api/status')
def api_status():
    """API endpoint to check status"""
    return jsonify({
        "status": "Online",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/threats')
def api_threats():
    """API endpoint to get threats"""
    return jsonify({"threats": THREATS})

@app.route('/api/labs')
def api_labs():
    """API endpoint to get labs"""
    return jsonify({"labs": LABS})

@app.route('/api/discussions')
def api_discussions():
    """API endpoint to get discussions"""
    return jsonify({"discussions": DISCUSSIONS})

@app.route('/lab/<int:lab_id>')
def view_lab(lab_id):
    """View a specific lab"""
    lab = next((lab for lab in LABS if lab["id"] == lab_id), None)
    if lab:
        return render_template('lab_detail.html', lab=lab)
    return redirect(url_for('labs'))

@app.route('/api/scan', methods=['POST'])
def scan_target():
    """API endpoint to scan a target"""
    target = request.form.get('target', '')
    
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
    app.run(debug=True, port=5000)
