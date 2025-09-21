import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from base64 import b64decode

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# ------------------------
# Mock service functions
# ------------------------

def extract_text_from_image(image_base64):
    # In reality, you would decode the image and use OCR here
    # For now, return a sample text
    return "COVID-19 vaccines contain microchips to track people"

def extract_claims(content):
    # Mock claim extraction: split content into sentences and pick suspicious ones
    # Here, just return the full content as one claim
    if not content.strip():
        return []
    return [content.strip()]

def check_facts(claim):
    # Mock fact checks
    if "microchip" in claim.lower():
        return [{
            "publisher": {"name": "PolitiFact"},
            "rating": "False",
            "rating_explanation": "COVID-19 vaccines do not contain microchips or tracking devices",
            "url": "https://www.politifact.com/factchecks/2021/jan/15/facebook-posts/covid-19-vaccines-dont-contain-microchips-track-pe/"
        }]
    else:
        return [{
            "publisher": {"name": "Snopes"},
            "rating": "True",
            "rating_explanation": "This claim has been verified as accurate",
            "url": "https://www.snopes.com/fact-check/example-true-claim/"
        }]

def get_evidence(claim):
    # Mock evidence retrieval
    return [
        {
            "title": "CDC Article",
            "snippet": "CDC confirms vaccines do not contain microchips.",
            "reliability": "high",
            "source": "CDC",
            "date": "2021-01-01",
            "link": "https://www.cdc.gov/vaccines"
        }
    ]
def calculate_score(claim, fact_checks, evidence):
    base_score = 50
    # Fact check contribution
    for check in fact_checks:
        rating = check.get('rating', '').lower()
        if 'true' in rating:
            base_score += 15
        elif 'false' in rating:
            base_score -= 25
    
    # Evidence contribution
    for item in evidence:
        reliability = item.get('reliability', 'medium').lower()
        if reliability == 'high':
            base_score += 10
        elif reliability == 'medium':
            base_score += 5
    
    score = max(0, min(100, base_score))
    
    if score >= 70:
        confidence_label = "Likely True"
    elif score <= 40:
        confidence_label = "Likely False"
    else:
        confidence_label = "Uncertain"
    
    return {"score": score, "confidence_label": confidence_label}


def generate_explanation(claim, fact_checks, evidence, score):
    steps = [
        "Extracted claims from content",
        "Checked claims against trusted fact-check sources",
        "Retrieved supporting evidence from credible websites",
        "Calculated credibility score based on fact checks and evidence"
    ]
    return {
        "summary": "This claim has been analyzed using AI-powered verification tools.",
        "steps": steps
    }

# ------------------------
# Routes
# ------------------------

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'VerifySense API is running'})

@app.route('/api/verify', methods=['POST'])
def verify():
    data = request.json
    input_type = data.get('input_type', 'text')
    content = data.get('content', '')

    # Handle image content
    if input_type == 'image' and content:
        content = extract_text_from_image(content)

    claims = extract_claims(content)
    if not claims:
        return jsonify({
            'status': 'error',
            'message': 'No claims could be extracted from the provided content'
        }), 400

    results = []
    for claim in claims:
        fact_checks = check_facts(claim)
        evidence = get_evidence(claim)
        score = calculate_score(claim, fact_checks, evidence)
        explanation = generate_explanation(claim, fact_checks, evidence, score)

        results.append({
            "claim": claim,
            "fact_checks": fact_checks,
            "evidence": evidence,
            "score": score,
            "explanation": explanation
        })

    return jsonify({
        "status": "success",
        "results": results
    })

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    # TODO: Store feedback in database or Firestore
    return jsonify({'status': 'success', 'message': 'Feedback received'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
