"""Generate realistic demo data for the Socialife Analytics MVP."""

import json
import random
import os
from datetime import datetime, timedelta

random.seed(42)  # Reproducible data

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "wireframe", "data")


def generate_daily_metrics(platform, base_followers, growth_rate, base_reach, base_engagement_rate, days=31):
    """Generate 31 days of daily metrics with realistic trends."""
    metrics = []
    followers = base_followers
    for day in range(days):
        date = datetime(2026, 1, 1) + timedelta(days=day)
        daily_growth = int(followers * growth_rate * (0.5 + random.random()))
        followers += daily_growth

        # Weekend boost for engagement
        is_weekend = date.weekday() >= 5
        weekend_mult = 1.3 if is_weekend else 1.0

        reach = int(base_reach * (0.6 + random.random() * 0.8) * weekend_mult)
        impressions = int(reach * (1.8 + random.random() * 0.8))
        engagements = int(reach * base_engagement_rate * (0.5 + random.random()))
        views = int(reach * (1.2 + random.random() * 1.5))

        metrics.append({
            "date": date.strftime("%Y-%m-%d"),
            "platform": platform,
            "followers": followers,
            "followersChange": daily_growth,
            "reach": reach,
            "impressions": impressions,
            "engagements": engagements,
            "views": views,
            "engagementRate": round(engagements / max(reach, 1) * 100, 2)
        })
    return metrics


def generate_posts(platform, content_types, captions, days=31, posts_per_week=5):
    """Generate realistic post data."""
    posts = []
    post_id = 1
    for day in range(days):
        date = datetime(2026, 1, 1) + timedelta(days=day)
        if random.random() > (posts_per_week / 7):
            continue

        content_type = random.choice(content_types)
        caption_data = random.choice(captions)

        likes = int(random.gauss(200, 150))
        likes = max(10, likes)
        comments = int(likes * random.uniform(0.02, 0.15))
        shares = int(likes * random.uniform(0.01, 0.08))
        saves = int(likes * random.uniform(0.02, 0.12))
        reach = int(likes * random.uniform(5, 20))
        impressions = int(reach * random.uniform(1.5, 3))
        video_views = int(reach * random.uniform(1.0, 2.5)) if content_type in ["reel", "video"] else 0

        total_eng = likes + comments + shares + saves
        eng_rate = round(total_eng / max(reach, 1) * 100, 2)

        hour = random.choice([18, 19, 20, 21])
        minute = random.randint(0, 59)

        posts.append({
            "id": f"post_{post_id:03d}",
            "platform": platform,
            "publishedAt": date.replace(hour=hour, minute=minute).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "contentType": content_type,
            "caption": caption_data["text"],
            "hashtags": caption_data["hashtags"],
            "likes": likes,
            "comments": comments,
            "shares": shares,
            "saves": saves,
            "reach": reach,
            "impressions": impressions,
            "videoViews": video_views,
            "engagementRate": eng_rate
        })
        post_id += 1
    return posts


# =============================================================================
# ESSEX SPORTS CLUB
# =============================================================================

essex_ig_captions = [
    {"text": "New year, new fitness goals! Join our January challenge and transform your routine. Link in bio for details.", "hashtags": ["#fitness", "#newyear", "#essexsports", "#fitnesschallenge"]},
    {"text": "Monday motivation: Your only limit is you. Come smash your PB today!", "hashtags": ["#mondaymotivation", "#gym", "#essex", "#fitfam"]},
    {"text": "Behind the scenes of our new gym floor! Can not wait for you to see the upgrades", "hashtags": ["#behindthescenes", "#gymlife", "#essexsportsclub", "#newequipment"]},
    {"text": "Class spotlight: Our spin class is back and better than ever! Book your spot now.", "hashtags": ["#spinclass", "#cycling", "#groupfitness", "#essex"]},
    {"text": "Member of the month goes to Sarah! 12 weeks of consistency and incredible results.", "hashtags": ["#memberofthemonth", "#transformation", "#fitnessjourney"]},
    {"text": "Weekend warriors, this one is for you. Saturday morning bootcamp at 9am.", "hashtags": ["#bootcamp", "#weekendworkout", "#essex", "#fitness"]},
    {"text": "Recovery is part of the process. Our new sauna is open!", "hashtags": ["#recovery", "#sauna", "#wellness", "#selfcare"]},
    {"text": "5 exercises you can do at home when you can not make it to the gym", "hashtags": ["#homeworkout", "#fitnesstips", "#exerciseideas"]},
    {"text": "Personal training slots available this February! DM us to book your free consultation.", "hashtags": ["#personaltraining", "#pt", "#essexfitness", "#goals"]},
    {"text": "That post-workout feeling hits different when you have been consistent all month", "hashtags": ["#consistency", "#gains", "#gymrat", "#essexsportsclub"]},
]

essex_fb_captions = [
    {"text": "Big news! We are extending our opening hours starting February. Now open 5am-11pm weekdays!", "hashtags": ["#essexsportsclub", "#fitness"]},
    {"text": "Thank you to everyone who came to our January open day! What a turnout", "hashtags": ["#openday", "#community", "#essex"]},
    {"text": "New classes added to the timetable: Pilates on Wednesdays and Boxing on Fridays!", "hashtags": ["#newclasses", "#pilates", "#boxing"]},
    {"text": "Membership offer: Join in January, get February free! Limited spots available.", "hashtags": ["#offer", "#membership", "#newyear"]},
]

essex_tt_captions = [
    {"text": "POV: You finally hit that deadlift PB #gymtok #fitness #pb #deadlift", "hashtags": ["#gymtok", "#fitness", "#pb", "#deadlift"]},
    {"text": "Things you will hear at 6am in our gym #gymhumour #earlybird #fitness", "hashtags": ["#gymhumour", "#earlybird", "#fitness"]},
    {"text": "Trainer vs member: Who has better form? #fitnesschallenge #gym", "hashtags": ["#fitnesschallenge", "#gym", "#trainer"]},
    {"text": "This smoothie recipe will change your post-workout game #nutrition #gym", "hashtags": ["#nutrition", "#gym", "#smoothie", "#protein"]},
]

essex = {
    "id": "essex-sports-club",
    "name": "Essex Sports Club",
    "industry": "Sports & Fitness",
    "status": "active",
    "contact": {"name": "John Smith", "email": "john@essexsports.co.uk"},
    "branding": {
        "logo": None,
        "primaryColour": "#10b981",
        "secondaryColour": "#064e3b",
        "reportFooter": "Prepared by Socialife Management | socialifemanagement.com"
    },
    "website": "www.essexsportsclub.co.uk",
    "contractStart": "2025-06-01",
    "accounts": [
        {"platform": "instagram", "handle": "@essexsportsclub"},
        {"platform": "facebook", "handle": "EssexSportsClub"},
        {"platform": "tiktok", "handle": "@essexsports"}
    ],
    "metrics": {
        "daily": (
            generate_daily_metrics("instagram", 12450, 0.002, 3200, 0.045) +
            generate_daily_metrics("facebook", 8920, 0.001, 1800, 0.025) +
            generate_daily_metrics("tiktok", 4200, 0.005, 5500, 0.035)
        ),
        "posts": (
            generate_posts("instagram", ["image", "reel", "carousel"], essex_ig_captions, posts_per_week=5) +
            generate_posts("facebook", ["image", "video", "text"], essex_fb_captions, posts_per_week=2) +
            generate_posts("tiktok", ["reel"], essex_tt_captions, posts_per_week=3)
        ),
        "demographics": {
            "gender": [
                {"label": "Female", "value": 45.2},
                {"label": "Male", "value": 52.1},
                {"label": "Other", "value": 2.7}
            ],
            "age": [
                {"label": "13-17", "value": 3.2},
                {"label": "18-24", "value": 28.5},
                {"label": "25-34", "value": 32.1},
                {"label": "35-44", "value": 21.4},
                {"label": "45-54", "value": 10.2},
                {"label": "55-64", "value": 3.8},
                {"label": "65+", "value": 0.8}
            ],
            "countries": [
                {"label": "United Kingdom", "value": 89.2},
                {"label": "United States", "value": 4.1},
                {"label": "Australia", "value": 1.8},
                {"label": "Ireland", "value": 1.5},
                {"label": "Canada", "value": 1.2},
                {"label": "Others", "value": 2.2}
            ],
            "cities": [
                {"label": "Brentwood, England", "value": 18.4},
                {"label": "Chelmsford, England", "value": 12.1},
                {"label": "Basildon, England", "value": 8.7},
                {"label": "London, England", "value": 7.2},
                {"label": "Southend-on-Sea, England", "value": 5.6},
                {"label": "Hornchurch, England", "value": 4.3},
                {"label": "Romford, England", "value": 3.8},
                {"label": "Colchester, England", "value": 2.9},
                {"label": "Grays, England", "value": 2.1},
                {"label": "Billericay, England", "value": 1.8}
            ]
        }
    },
    "imports": [
        {"date": "2026-02-01", "filename": "2026-01-metrics.csv", "platform": "instagram", "records": 31},
        {"date": "2026-02-01", "filename": "2026-01-metrics.csv", "platform": "facebook", "records": 31},
        {"date": "2026-02-01", "filename": "2026-01-analytics.csv", "platform": "tiktok", "records": 31}
    ],
    "updatedAt": "2026-02-01T14:30:00Z"
}


# =============================================================================
# BELLA'S BOUTIQUE
# =============================================================================

bella_ig_captions = [
    {"text": "New arrivals just dropped! Spring collection is giving everything you need.", "hashtags": ["#newarrivals", "#springfashion", "#boutique", "#essex"]},
    {"text": "Style tip: Layer your neutrals for that effortless chic look", "hashtags": ["#styletip", "#neutrals", "#fashion", "#ootd"]},
    {"text": "Behind the scenes of our photoshoot. The new collection is stunning", "hashtags": ["#bts", "#photoshoot", "#fashionshoot", "#bellasboutique"]},
    {"text": "Sale alert! Up to 40% off selected winter pieces. This weekend only!", "hashtags": ["#sale", "#winterfashion", "#discount", "#shoplocal"]},
    {"text": "Your Saturday outfit sorted. Tap to shop the look.", "hashtags": ["#ootd", "#weekendstyle", "#shopnow", "#essexfashion"]},
    {"text": "Customer spotlight: Emma styled our wrap dress three different ways!", "hashtags": ["#customerstyle", "#wrapdress", "#versatile", "#fashion"]},
]

bella_fb_captions = [
    {"text": "We are open late this Thursday! Pop in after work for some retail therapy", "hashtags": ["#latenight", "#shopping", "#essex"]},
    {"text": "Gift ideas for Valentine's Day sorted! See our curated gift guide in store.", "hashtags": ["#valentines", "#giftideas", "#shoplocal"]},
]

bella = {
    "id": "bellas-boutique",
    "name": "Bella's Boutique",
    "industry": "Fashion & Retail",
    "status": "active",
    "contact": {"name": "Bella Thompson", "email": "bella@bellasboutique.com"},
    "branding": {
        "logo": None,
        "primaryColour": "#ec4899",
        "secondaryColour": "#831843",
        "reportFooter": "Prepared by Socialife Management | socialifemanagement.com"
    },
    "website": "www.bellasboutique.com",
    "contractStart": "2025-09-15",
    "accounts": [
        {"platform": "instagram", "handle": "@bellasboutique_essex"},
        {"platform": "facebook", "handle": "BellasBoutiqueEssex"}
    ],
    "metrics": {
        "daily": (
            generate_daily_metrics("instagram", 6780, 0.003, 2100, 0.055) +
            generate_daily_metrics("facebook", 3450, 0.001, 900, 0.02)
        ),
        "posts": (
            generate_posts("instagram", ["image", "reel", "carousel"], bella_ig_captions, posts_per_week=4) +
            generate_posts("facebook", ["image", "text"], bella_fb_captions, posts_per_week=2)
        ),
        "demographics": {
            "gender": [
                {"label": "Female", "value": 78.3},
                {"label": "Male", "value": 19.2},
                {"label": "Other", "value": 2.5}
            ],
            "age": [
                {"label": "13-17", "value": 5.1},
                {"label": "18-24", "value": 24.8},
                {"label": "25-34", "value": 35.2},
                {"label": "35-44", "value": 22.6},
                {"label": "45-54", "value": 8.9},
                {"label": "55-64", "value": 2.6},
                {"label": "65+", "value": 0.8}
            ],
            "countries": [
                {"label": "United Kingdom", "value": 92.1},
                {"label": "United States", "value": 3.2},
                {"label": "Ireland", "value": 1.4},
                {"label": "Australia", "value": 1.1},
                {"label": "Others", "value": 2.2}
            ],
            "cities": [
                {"label": "Brentwood, England", "value": 22.1},
                {"label": "Chelmsford, England", "value": 14.5},
                {"label": "London, England", "value": 9.8},
                {"label": "Basildon, England", "value": 7.2},
                {"label": "Hornchurch, England", "value": 5.1},
                {"label": "Southend-on-Sea, England", "value": 4.3}
            ]
        }
    },
    "imports": [
        {"date": "2026-02-01", "filename": "2026-01-metrics.csv", "platform": "instagram", "records": 31},
        {"date": "2026-02-01", "filename": "2026-01-insights.csv", "platform": "facebook", "records": 31}
    ],
    "updatedAt": "2026-02-01T10:15:00Z"
}


# =============================================================================
# CASTLE POINT FINANCIAL
# =============================================================================

castle_fb_captions = [
    {"text": "Tax year end is approaching! Book your free financial health check before April.", "hashtags": ["#financialplanning", "#taxseason", "#essex"]},
    {"text": "5 common pension mistakes and how to avoid them. New blog post on our website.", "hashtags": ["#pension", "#retirement", "#financialtips"]},
    {"text": "Congratulations to our team on winning Essex Business of the Year!", "hashtags": ["#award", "#essexbusiness", "#financialservices"]},
]

castle_li_captions = [
    {"text": "Market update: What the latest interest rate changes mean for your investments and mortgages.", "hashtags": ["#marketupdate", "#interestrates", "#investing"]},
    {"text": "We are hiring! Looking for a qualified financial adviser to join our growing team in Brentwood.", "hashtags": ["#hiring", "#financialadviser", "#essexjobs"]},
    {"text": "Our latest whitepaper on ESG investing is now available. Download the full report on our website.", "hashtags": ["#ESG", "#sustainableinvesting", "#whitepaper"]},
    {"text": "Proud to announce our partnership with Essex Chamber of Commerce for 2026.", "hashtags": ["#partnership", "#essexbusiness", "#networking"]},
]

castle = {
    "id": "castle-point-financial",
    "name": "Castle Point Financial",
    "industry": "Financial Services",
    "status": "active",
    "contact": {"name": "David Williams", "email": "info@cpfinance.co.uk"},
    "branding": {
        "logo": None,
        "primaryColour": "#1e40af",
        "secondaryColour": "#1e3a5f",
        "reportFooter": "Prepared by Socialife Management | socialifemanagement.com"
    },
    "website": "www.cpfinance.co.uk",
    "contractStart": "2025-03-01",
    "accounts": [
        {"platform": "facebook", "handle": "CastlePointFinancial"},
        {"platform": "linkedin", "handle": "castle-point-financial"}
    ],
    "metrics": {
        "daily": (
            generate_daily_metrics("facebook", 2150, 0.001, 650, 0.018) +
            generate_daily_metrics("linkedin", 1820, 0.002, 450, 0.032)
        ),
        "posts": (
            generate_posts("facebook", ["image", "text", "video"], castle_fb_captions, posts_per_week=2) +
            generate_posts("linkedin", ["text", "image"], castle_li_captions, posts_per_week=2)
        ),
        "demographics": {
            "gender": [
                {"label": "Female", "value": 38.5},
                {"label": "Male", "value": 59.2},
                {"label": "Other", "value": 2.3}
            ],
            "age": [
                {"label": "18-24", "value": 5.2},
                {"label": "25-34", "value": 18.4},
                {"label": "35-44", "value": 28.7},
                {"label": "45-54", "value": 26.1},
                {"label": "55-64", "value": 15.8},
                {"label": "65+", "value": 5.8}
            ],
            "countries": [
                {"label": "United Kingdom", "value": 95.8},
                {"label": "United States", "value": 1.5},
                {"label": "Ireland", "value": 0.9},
                {"label": "Others", "value": 1.8}
            ],
            "cities": [
                {"label": "Brentwood, England", "value": 15.2},
                {"label": "London, England", "value": 12.8},
                {"label": "Chelmsford, England", "value": 8.4},
                {"label": "Basildon, England", "value": 6.9},
                {"label": "Southend-on-Sea, England", "value": 5.1},
                {"label": "Romford, England", "value": 4.2}
            ]
        }
    },
    "imports": [
        {"date": "2026-02-01", "filename": "2026-01-insights.csv", "platform": "facebook", "records": 31},
        {"date": "2026-02-01", "filename": "2026-01-analytics.csv", "platform": "linkedin", "records": 31}
    ],
    "updatedAt": "2026-02-01T09:45:00Z"
}


# =============================================================================
# WRITE OUTPUT FILES
# =============================================================================

os.makedirs(DATA_DIR, exist_ok=True)

# Client index
clients_index = [
    {
        "id": c["id"],
        "name": c["name"],
        "industry": c["industry"],
        "status": c["status"],
        "platforms": [a["platform"] for a in c["accounts"]],
        "primaryColour": c["branding"]["primaryColour"]
    }
    for c in [essex, bella, castle]
]

index_path = os.path.join(DATA_DIR, "clients.json")
with open(index_path, "w", encoding="utf-8") as f:
    json.dump(clients_index, f, indent=2, ensure_ascii=False)
print(f"Written: clients.json ({os.path.getsize(index_path):,} bytes)")

# Individual client files
for client in [essex, bella, castle]:
    filepath = os.path.join(DATA_DIR, f"{client['id']}.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(client, f, indent=2, ensure_ascii=False)
    size = os.path.getsize(filepath)
    daily = len(client["metrics"]["daily"])
    posts = len(client["metrics"]["posts"])
    print(f"Written: {client['id']}.json ({size:,} bytes) - {daily} daily metrics, {posts} posts")

print("\nDone! Demo data generated successfully.")
