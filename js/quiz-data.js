
// Pet Breed Quiz Data and Functionality

// Breed Database with detailed information
const breedDatabase = {
    dogs: [
        {
            name: "Golden Retriever",
            image: "images/quiz/dog/golden-retriever.jpg",
            origin: "Scotland, United Kingdom",
            temperament: "Friendly, Intelligent, Devoted",
            suitableTemperature: "15°C - 25°C (59°F - 77°F)",
            lifespan: "10-12 years",
            weight: "25-34 kg (55-75 lbs)",
            food: [
                "High-quality dry dog food (2-3 cups daily)",
                "Lean proteins (chicken, fish, beef)",
                "Vegetables (carrots, green beans)",
                "Avoid: chocolate, grapes, onions"
            ],
            commonDiseases: [
                "Hip Dysplasia",
                "Elbow Dysplasia",
                "Heart Disease",
                "Eye Disorders (cataracts, progressive retinal atrophy)",
                "Cancer"
            ],
            care: [
                "Regular exercise (1-2 hours daily)",
                "Weekly brushing, more during shedding season",
                "Regular vet checkups",
                "Mental stimulation and training"
            ]
        },
        {
            name: "Labrador Retriever",
            image: "images/quiz/dog/labrador.jpg",
            origin: "Newfoundland, Canada",
            temperament: "Outgoing, Even Tempered, Gentle",
            suitableTemperature: "10°C - 25°C (50°F - 77°F)",
            lifespan: "10-12 years",
            weight: "25-36 kg (55-80 lbs)",
            food: [
                "High-quality dog food (2.5-3 cups daily)",
                "Protein-rich diet",
                "Controlled portions to prevent obesity",
                "Fresh water always available"
            ],
            commonDiseases: [
                "Hip and Elbow Dysplasia",
                "Obesity",
                "Ear Infections",
                "Exercise-Induced Collapse",
                "Progressive Retinal Atrophy"
            ],
            care: [
                "High energy - needs lots of exercise",
                "Swimming is excellent exercise",
                "Regular grooming",
                "Training from early age"
            ]
        },
        {
            name: "German Shepherd",
            image: "images/quiz/dog/german-shepherd.jpg",
            origin: "Germany",
            temperament: "Confident, Courageous, Smart",
            suitableTemperature: "5°C - 20°C (41°F - 68°F)",
            lifespan: "9-13 years",
            weight: "30-40 kg (66-88 lbs)",
            food: [
                "High-protein diet (3-4 cups daily)",
                "Quality meat-based food",
                "Joint supplements recommended",
                "Avoid overfeeding"
            ],
            commonDiseases: [
                "Hip Dysplasia",
                "Degenerative Myelopathy",
                "Bloat (Gastric Dilatation-Volvulus)",
                "Epilepsy",
                "Allergies"
            ],
            care: [
                "Needs extensive exercise and mental stimulation",
                "Regular brushing (daily during shedding)",
                "Early socialization important",
                "Working dog - needs purpose/tasks"
            ]
        },
        {
            name: "Beagle",
            image: "images/quiz/dog/beagle.jpg",
            origin: "England, United Kingdom",
            temperament: "Friendly, Curious, Merry",
            suitableTemperature: "15°C - 25°C (59°F - 77°F)",
            lifespan: "12-15 years",
            weight: "9-11 kg (20-24 lbs)",
            food: [
                "Quality dog food (1-1.5 cups daily)",
                "Portion control essential",
                "Prone to overeating",
                "Healthy treats in moderation"
            ],
            commonDiseases: [
                "Obesity",
                "Epilepsy",
                "Hypothyroidism",
                "Cherry Eye",
                "Ear Infections"
            ],
            care: [
                "Regular exercise to prevent obesity",
                "Check and clean ears regularly",
                "Secure fencing (they love to follow scents)",
                "Mental stimulation important"
            ]
        },
        {
            name: "Pug",
            image: "images/quiz/dog/pug.jpg",
            origin: "China",
            temperament: "Charming, Mischievous, Loving",
            suitableTemperature: "18°C - 24°C (64°F - 75°F)",
            lifespan: "12-15 years",
            weight: "6-8 kg (14-18 lbs)",
            food: [
                "High-quality small breed food (1/2 - 1 cup daily)",
                "Portion control crucial",
                "Avoid table scraps",
                "Monitor for food allergies"
            ],
            commonDiseases: [
                "Breathing problems (Brachycephalic syndrome)",
                "Eye problems (proptosis, dry eye)",
                "Hip Dysplasia",
                "Obesity",
                "Skin fold infections"
            ],
            care: [
                "Clean facial wrinkles daily",
                "Moderate exercise (avoid heat)",
                "Regular eye cleaning",
                "Indoor dog - sensitive to temperature extremes"
            ]
        },
        {
            name: "Boxer",
            image: "images/quiz/dog/Boxer.jpg",
            origin: "Germany",
            temperament: "Playful, Energetic, Loyal",
            suitableTemperature: "15°C - 25°C (59°F - 77°F)",
            lifespan: "10-12 years",
            weight: "25-32 kg (55-70 lbs)",
            food: [
                "High-quality dog food (2-3 cups daily)",
                "Protein-rich diet",
                "Multiple small meals recommended",
                "Avoid exercise immediately after eating"
            ],
            commonDiseases: [
                "Cardiomyopathy",
                "Hip Dysplasia",
                "Cancer",
                "Bloat",
                "Allergies"
            ],
            care: [
                "High energy - needs vigorous exercise",
                "Short coat - minimal grooming",
                "Early training and socialization",
                "Great with families and children"
            ]
        },
        {
            name: "Chihuahua",
            image: "images/quiz/dog/Chihuahua.jpg",
            origin: "Mexico",
            temperament: "Alert, Quick, Devoted",
            suitableTemperature: "20°C - 28°C (68°F - 82°F)",
            lifespan: "14-16 years",
            weight: "1.5-3 kg (3-6 lbs)",
            food: [
                "Small breed formula (1/4 - 1/2 cup daily)",
                "Multiple small meals",
                "High-quality protein",
                "Avoid human food"
            ],
            commonDiseases: [
                "Patellar Luxation",
                "Heart Disease",
                "Hypoglycemia",
                "Dental problems",
                "Tracheal Collapse"
            ],
            care: [
                "Sensitive to cold - may need sweaters",
                "Dental care crucial",
                "Socialization important",
                "Fragile - careful handling needed"
            ]
        },
        {
            name: "Cocker Spaniel",
            image: "images/quiz/dog/Cocker-Spaniel.jpg",
            origin: "England, United Kingdom",
            temperament: "Gentle, Smart, Happy",
            suitableTemperature: "15°C - 25°C (59°F - 77°F)",
            lifespan: "12-15 years",
            weight: "12-15 kg (26-33 lbs)",
            food: [
                "Quality dog food (1.5-2 cups daily)",
                "Balanced diet",
                "Monitor for food allergies",
                "Fresh water always"
            ],
            commonDiseases: [
                "Ear Infections",
                "Eye problems (cataracts, glaucoma)",
                "Hip Dysplasia",
                "Autoimmune diseases",
                "Skin allergies"
            ],
            care: [
                "Regular ear cleaning essential",
                "Daily brushing required",
                "Professional grooming every 6-8 weeks",
                "Moderate exercise needs"
            ]
        },
        {
            name: "Dachshund",
            image: "images/quiz/dog/Dachshund.jpg",
            origin: "Germany",
            temperament: "Clever, Stubborn, Devoted",
            suitableTemperature: "15°C - 25°C (59°F - 77°F)",
            lifespan: "12-16 years",
            weight: "7-15 kg (16-32 lbs)",
            food: [
                "Quality small to medium breed food (1-1.5 cups daily)",
                "Weight control important",
                "Avoid overfeeding",
                "Joint supplements beneficial"
            ],
            commonDiseases: [
                "Intervertebral Disc Disease (IVDD)",
                "Obesity",
                "Dental problems",
                "Patellar Luxation",
                "Progressive Retinal Atrophy"
            ],
            care: [
                "Prevent jumping to protect back",
                "Use ramps for furniture/stairs",
                "Regular exercise but avoid strain",
                "Brush weekly (more for long-haired)"
            ]
        },
        {
            name: "Dalmatian",
            image: "images/quiz/dog/Dalmatian.jpg",
            origin: "Croatia",
            temperament: "Energetic, Playful, Intelligent",
            suitableTemperature: "10°C - 25°C (50°F - 77°F)",
            lifespan: "11-13 years",
            weight: "20-32 kg (45-70 lbs)",
            food: [
                "High-quality dog food (2-3 cups daily)",
                "Low-purine diet recommended",
                "Plenty of fresh water",
                "Avoid organ meats"
            ],
            commonDiseases: [
                "Deafness",
                "Urinary stones",
                "Skin allergies",
                "Hip Dysplasia",
                "Hyperuricemia"
            ],
            care: [
                "Very high energy - needs extensive exercise",
                "Regular brushing (sheds year-round)",
                "Early socialization crucial",
                "Hearing tests recommended"
            ]
        },
        {
            name: "Doberman Pinscher",
            image: "images/quiz/dog/Doberman-Pinscher.jpg",
            origin: "Germany",
            temperament: "Loyal, Fearless, Alert",
            suitableTemperature: "10°C - 25°C (50°F - 77°F)",
            lifespan: "10-12 years",
            weight: "32-45 kg (70-100 lbs)",
            food: [
                "High-quality large breed food (3-4 cups daily)",
                "Protein-rich diet",
                "Multiple meals to prevent bloat",
                "Joint supplements recommended"
            ],
            commonDiseases: [
                "Dilated Cardiomyopathy",
                "Hip Dysplasia",
                "Von Willebrand's Disease",
                "Wobbler Syndrome",
                "Hypothyroidism"
            ],
            care: [
                "Needs vigorous daily exercise",
                "Minimal grooming required",
                "Early training and socialization essential",
                "Not suited for outdoor living"
            ]
        },
        {
            name: "English Bulldog",
            image: "images/quiz/dog/English-Bulldog.jpg",
            origin: "England, United Kingdom",
            temperament: "Docile, Willful, Friendly",
            suitableTemperature: "18°C - 24°C (64°F - 75°F)",
            lifespan: "8-10 years",
            weight: "18-25 kg (40-55 lbs)",
            food: [
                "Quality dog food (2-3 cups daily)",
                "Weight management crucial",
                "Avoid overfeeding",
                "Monitor for food allergies"
            ],
            commonDiseases: [
                "Breathing problems (Brachycephalic syndrome)",
                "Hip Dysplasia",
                "Cherry Eye",
                "Skin fold infections",
                "Heart problems"
            ],
            care: [
                "Clean facial wrinkles daily",
                "Moderate exercise only (avoid heat)",
                "Indoor dog - temperature sensitive",
                "Regular vet checkups essential"
            ]
        },
        {
            name: "French Bulldog",
            image: "images/quiz/dog/French-bulldog.jpg",
            origin: "France",
            temperament: "Playful, Adaptable, Smart",
            suitableTemperature: "18°C - 24°C (64°F - 75°F)",
            lifespan: "10-12 years",
            weight: "8-14 kg (18-30 lbs)",
            food: [
                "High-quality small breed food (1-1.5 cups daily)",
                "Portion control important",
                "Avoid table scraps",
                "Monitor for allergies"
            ],
            commonDiseases: [
                "Brachycephalic syndrome",
                "Hip Dysplasia",
                "Allergies",
                "Intervertebral Disc Disease",
                "Eye problems"
            ],
            care: [
                "Clean facial folds regularly",
                "Moderate exercise (avoid heat/humidity)",
                "Indoor dog - temperature sensitive",
                "Great for apartment living"
            ]
        },
        {
            name: "Great Dane",
            image: "images/quiz/dog/Great-Dane.jpg",
            origin: "Germany",
            temperament: "Friendly, Patient, Dependable",
            suitableTemperature: "10°C - 25°C (50°F - 77°F)",
            lifespan: "7-10 years",
            weight: "50-90 kg (110-200 lbs)",
            food: [
                "Large breed formula (6-10 cups daily)",
                "Multiple meals to prevent bloat",
                "High-quality protein",
                "Joint supplements essential"
            ],
            commonDiseases: [
                "Bloat (life-threatening)",
                "Hip Dysplasia",
                "Cardiomyopathy",
                "Bone Cancer",
                "Wobbler Syndrome"
            ],
            care: [
                "Moderate exercise (avoid overexertion when young)",
                "Minimal grooming",
                "Needs large living space",
                "Short lifespan - cherish every moment"
            ]
        },
        {
            name: "Indian Pariah Dog (Indie)",
            image: "images/quiz/dog/Indian-Pariah-Dog-(Indie).jpg",
            origin: "India",
            temperament: "Alert, Social, Intelligent",
            suitableTemperature: "20°C - 35°C (68°F - 95°F)",
            lifespan: "13-16 years",
            weight: "15-25 kg (33-55 lbs)",
            food: [
                "Quality dog food (2-3 cups daily)",
                "Adaptable to various diets",
                "Home-cooked meals acceptable",
                "Fresh water essential"
            ],
            commonDiseases: [
                "Generally very healthy",
                "Tick-borne diseases (if not protected)",
                "Skin infections (if not groomed)",
                "Dental issues (without care)"
            ],
            care: [
                "Very low maintenance",
                "Highly adaptable to Indian climate",
                "Regular exercise needed",
                "Excellent guard dogs and companions"
            ]
        },
        {
            name: "Indian Spitz",
            image: "images/quiz/dog/Indian-spitz.jpg",
            origin: "India",
            temperament: "Intelligent, Active, Playful",
            suitableTemperature: "15°C - 35°C (59°F - 95°F)",
            lifespan: "10-14 years",
            weight: "5-7 kg (11-15 lbs)",
            food: [
                "Quality small breed food (1-1.5 cups daily)",
                "Balanced diet",
                "Avoid overfeeding",
                "Fresh water always"
            ],
            commonDiseases: [
                "Dental problems",
                "Patellar Luxation",
                "Progressive Retinal Atrophy",
                "Skin allergies"
            ],
            care: [
                "Regular brushing (2-3 times weekly)",
                "Moderate exercise needs",
                "Well-suited for Indian climate",
                "Good apartment dog"
            ]
        },
        {
            name: "Maltese",
            image: "images/quiz/dog/Maltese.jpg",
            origin: "Malta",
            temperament: "Gentle, Playful, Charming",
            suitableTemperature: "18°C - 26°C (64°F - 79°F)",
            lifespan: "12-15 years",
            weight: "3-4 kg (6-9 lbs)",
            food: [
                "Small breed formula (1/4 - 1/2 cup daily)",
                "High-quality protein",
                "Multiple small meals",
                "Avoid human food"
            ],
            commonDiseases: [
                "Dental problems",
                "Patellar Luxation",
                "White Dog Shaker Syndrome",
                "Collapsed Trachea",
                "Eye problems"
            ],
            care: [
                "Daily brushing essential",
                "Professional grooming needed",
                "Tear stain cleaning",
                "Indoor dog - fragile"
            ]
        },
        {
            name: "Mudhol Hound",
            image: "images/quiz/dog/mudhol-hound.jpg",
            origin: "Karnataka, India",
            temperament: "Loyal, Intelligent, Graceful",
            suitableTemperature: "20°C - 40°C (68°F - 104°F)",
            lifespan: "13-14 years",
            weight: "20-30 kg (44-66 lbs)",
            food: [
                "High-quality dog food (2-3 cups daily)",
                "Protein-rich diet",
                "Lean meats beneficial",
                "Fresh water essential"
            ],
            commonDiseases: [
                "Generally very healthy",
                "Hip Dysplasia (rare)",
                "Ear infections (if not cleaned)"
            ],
            care: [
                "Needs extensive exercise",
                "Minimal grooming required",
                "Excellent for Indian climate",
                "Natural hunting instinct - needs training"
            ]
        },
        {
            name: "Pomeranian",
            image: "images/quiz/dog/Pomeranian.jpg",
            origin: "Germany/Poland",
            temperament: "Lively, Bold, Inquisitive",
            suitableTemperature: "15°C - 25°C (59°F - 77°F)",
            lifespan: "12-16 years",
            weight: "1.5-3.5 kg (3-7 lbs)",
            food: [
                "Small breed formula (1/4 - 1/2 cup daily)",
                "High-quality protein",
                "Multiple small meals",
                "Avoid overfeeding"
            ],
            commonDiseases: [
                "Patellar Luxation",
                "Collapsed Trachea",
                "Dental problems",
                "Alopecia X",
                "Heart problems"
            ],
            care: [
                "Daily brushing required",
                "Professional grooming needed",
                "Dental care crucial",
                "Moderate exercise needs"
            ]
        },
        {
            name: "Poodle",
            image: "images/quiz/dog/Poodle.jpg",
            origin: "Germany/France",
            temperament: "Intelligent, Active, Elegant",
            suitableTemperature: "15°C - 25°C (59°F - 77°F)",
            lifespan: "12-15 years",
            weight: "20-32 kg (45-70 lbs) for Standard",
            food: [
                "High-quality dog food (1.5-3 cups daily depending on size)",
                "Protein-rich diet",
                "Avoid table scraps",
                "Fresh water always"
            ],
            commonDiseases: [
                "Hip Dysplasia",
                "Progressive Retinal Atrophy",
                "Addison's Disease",
                "Bloat (in Standard Poodles)",
                "Epilepsy"
            ],
            care: [
                "Professional grooming every 4-6 weeks",
                "Daily brushing",
                "High intelligence - needs mental stimulation",
                "Regular exercise essential"
            ]
        },
        {
            name: "Rajapalayam Dog",
            image: "images/quiz/dog/Rajapalayam-dog.jpg",
            origin: "Tamil Nadu, India",
            temperament: "Loyal, Intelligent, Courageous",
            suitableTemperature: "20°C - 40°C (68°F - 104°F)",
            lifespan: "9-12 years",
            weight: "25-30 kg (55-66 lbs)",
            food: [
                "High-quality dog food (3-4 cups daily)",
                "Protein-rich diet",
                "Meat-based meals",
                "Fresh water essential"
            ],
            commonDiseases: [
                "Deafness (in some lines)",
                "Skin problems (due to white coat)",
                "Hip Dysplasia",
                "Mange (if not cared for)"
            ],
            care: [
                "Needs extensive exercise",
                "Minimal grooming",
                "Sun protection for skin",
                "Excellent guard dog - needs training"
            ]
        },
        {
            name: "Rottweiler",
            image: "images/quiz/dog/Rottweiler.jpg",
            origin: "Germany",
            temperament: "Loyal, Loving, Confident Guardian",
            suitableTemperature: "10°C - 25°C (50°F - 77°F)",
            lifespan: "8-10 years",
            weight: "35-60 kg (77-132 lbs)",
            food: [
                "Large breed formula (4-6 cups daily)",
                "High-quality protein",
                "Multiple meals to prevent bloat",
                "Joint supplements recommended"
            ],
            commonDiseases: [
                "Hip Dysplasia",
                "Elbow Dysplasia",
                "Osteosarcoma (bone cancer)",
                "Bloat",
                "Heart problems"
            ],
            care: [
                "Needs regular exercise",
                "Early training and socialization crucial",
                "Minimal grooming",
                "Strong breed - experienced owner recommended"
            ]
        },
        {
            name: "Saint Bernard",
            image: "images/quiz/dog/Saint-Bernard.jpg",
            origin: "Switzerland/Italy",
            temperament: "Gentle, Patient, Friendly",
            suitableTemperature: "5°C - 20°C (41°F - 68°F)",
            lifespan: "8-10 years",
            weight: "64-120 kg (140-264 lbs)",
            food: [
                "Large breed formula (6-8 cups daily)",
                "High-quality protein",
                "Multiple meals essential",
                "Joint supplements crucial"
            ],
            commonDiseases: [
                "Hip Dysplasia",
                "Elbow Dysplasia",
                "Bloat",
                "Dilated Cardiomyopathy",
                "Osteosarcoma"
            ],
            care: [
                "Moderate exercise (avoid overexertion)",
                "Regular brushing (especially long-haired)",
                "Drools significantly",
                "Needs cool climate"
            ]
        },
        {
            name: "Shih Tzu",
            image: "images/quiz/dog/Shih-tzu.jpg",
            origin: "Tibet/China",
            temperament: "Affectionate, Playful, Outgoing",
            suitableTemperature: "18°C - 26°C (64°F - 79°F)",
            lifespan: "10-16 years",
            weight: "4-7 kg (9-16 lbs)",
            food: [
                "Small breed formula (1/2 - 1 cup daily)",
                "High-quality protein",
                "Avoid table scraps",
                "Fresh water always"
            ],
            commonDiseases: [
                "Brachycephalic syndrome",
                "Hip Dysplasia",
                "Eye problems",
                "Ear infections",
                "Dental problems"
            ],
            care: [
                "Daily brushing essential",
                "Professional grooming needed",
                "Face cleaning daily",
                "Moderate exercise needs"
            ]
        },
        {
            name: "Siberian Husky",
            image: "images/quiz/dog/Siberian-Husky.jpg",
            origin: "Siberia, Russia",
            temperament: "Outgoing, Mischievous, Loyal",
            suitableTemperature: "-50°C - 15°C (-58°F - 59°F)",
            lifespan: "12-14 years",
            weight: "16-27 kg (35-60 lbs)",
            food: [
                "High-quality dog food (2-3 cups daily)",
                "Protein and fat-rich diet",
                "Less food than expected for size",
                "Fresh water essential"
            ],
            commonDiseases: [
                "Hip Dysplasia",
                "Eye problems (cataracts, PRA)",
                "Hypothyroidism",
                "Zinc deficiency"
            ],
            care: [
                "Needs extensive exercise",
                "Heavy shedding - regular brushing",
                "Escape artist - secure fencing essential",
                "Not suited for hot climates"
            ]
        },
        {
            name: "Tibetan Mastiff",
            image: "images/quiz/dog/Tibetan-Mastiff.jpg",
            origin: "Tibet",
            temperament: "Independent, Reserved, Intelligent",
            suitableTemperature: "5°C - 20°C (41°F - 68°F)",
            lifespan: "10-12 years",
            weight: "45-73 kg (100-160 lbs)",
            food: [
                "Large breed formula (4-6 cups daily)",
                "High-quality protein",
                "Surprisingly eats less than expected",
                "Fresh water always"
            ],
            commonDiseases: [
                "Hip Dysplasia",
                "Elbow Dysplasia",
                "Hypothyroidism",
                "Eye problems",
                "Bloat"
            ],
            care: [
                "Moderate exercise needs",
                "Heavy seasonal shedding",
                "Independent - needs experienced owner",
                "Excellent guard dog"
            ]
        }
    ],
    cats: [
        {
            name: "Persian Cat",
            image: "images/quiz/cat/Persian.jpg",
            origin: "Iran (Persia)",
            temperament: "Quiet, Sweet, Gentle",
            suitableTemperature: "18°C - 24°C (64°F - 75°F)",
            lifespan: "12-17 years",
            weight: "3-5 kg (7-12 lbs)",
            food: [
                "High-quality cat food (1/4 - 1/2 cup daily)",
                "Wet food recommended for hydration",
                "Protein-rich diet",
                "Avoid: milk, onions, garlic"
            ],
            commonDiseases: [
                "Polycystic Kidney Disease (PKD)",
                "Progressive Retinal Atrophy",
                "Breathing difficulties (flat face)",
                "Dental issues",
                "Eye conditions"
            ],
            care: [
                "Daily grooming essential",
                "Regular eye cleaning",
                "Indoor cat - not suited for outdoors",
                "Calm, quiet environment preferred"
            ]
        },
        {
            name: "Siamese Cat",
            image: "images/quiz/cat/Siamese.jpg",
            origin: "Thailand (Siam)",
            temperament: "Vocal, Social, Intelligent",
            suitableTemperature: "20°C - 26°C (68°F - 79°F)",
            lifespan: "15-20 years",
            weight: "3-5 kg (6-12 lbs)",
            food: [
                "High-protein cat food",
                "Controlled portions (1/3 - 1/2 cup daily)",
                "Fresh water always",
                "Avoid overfeeding"
            ],
            commonDiseases: [
                "Asthma",
                "Dental Disease",
                "Progressive Retinal Atrophy",
                "Amyloidosis",
                "Heart Disease"
            ],
            care: [
                "Very social - needs companionship",
                "Vocal - will 'talk' to you",
                "Minimal grooming needed",
                "Highly intelligent - needs mental stimulation"
            ]
        },
        {
            name: "Maine Coon",
            image: "images/quiz/cat/Maine-Coon.jpg",
            origin: "Maine, United States",
            temperament: "Gentle, Friendly, Playful",
            suitableTemperature: "15°C - 22°C (59°F - 72°F)",
            lifespan: "12-15 years",
            weight: "5-8 kg (11-18 lbs), males can be larger",
            food: [
                "High-quality cat food (1/2 - 3/4 cup daily)",
                "Protein-rich diet",
                "Large breed formula recommended",
                "Fresh water essential"
            ],
            commonDiseases: [
                "Hip Dysplasia",
                "Hypertrophic Cardiomyopathy",
                "Spinal Muscular Atrophy",
                "Polycystic Kidney Disease",
                "Obesity"
            ],
            care: [
                "Regular brushing (2-3 times weekly)",
                "Large litter box needed",
                "Playful - needs toys and interaction",
                "Generally healthy and hardy"
            ]
        },
        {
            name: "British Shorthair Cat",
            image: "images/quiz/cat/British-shorthair-cat.jpg",
            origin: "United Kingdom",
            temperament: "Calm, Easy-going, Affectionate",
            suitableTemperature: "16°C - 23°C (61°F - 73°F)",
            lifespan: "12-17 years",
            weight: "4-8 kg (9-18 lbs)",
            food: [
                "Quality cat food (1/3 - 1/2 cup daily)",
                "Portion control important",
                "Balanced diet to prevent obesity",
                "Wet and dry food combination"
            ],
            commonDiseases: [
                "Hypertrophic Cardiomyopathy",
                "Polycystic Kidney Disease",
                "Obesity",
                "Dental Disease",
                "Hemophilia B"
            ],
            care: [
                "Weekly brushing sufficient",
                "Moderate exercise needed",
                "Independent but affectionate",
                "Monitor weight regularly"
            ]
        },
        {
            name: "Bengal Cat",
            image: "images/quiz/cat/Bengal-Cat.jpg",
            origin: "United States",
            temperament: "Active, Playful, Energetic",
            suitableTemperature: "18°C - 26°C (64°F - 79°F)",
            lifespan: "12-16 years",
            weight: "4-7 kg (8-15 lbs)",
            food: [
                "High-protein cat food",
                "Quality meat-based diet (1/2 - 3/4 cup daily)",
                "Fresh water always",
                "Avoid grain-heavy foods"
            ],
            commonDiseases: [
                "Progressive Retinal Atrophy",
                "Hypertrophic Cardiomyopathy",
                "Patellar Luxation",
                "Flat-chested Kitten Syndrome"
            ],
            care: [
                "Very active - needs lots of play",
                "Minimal grooming needed",
                "Loves water - may join you in shower",
                "Highly intelligent - needs stimulation"
            ]
        },
        {
            name: "Abyssinian Cat",
            image: "images/quiz/cat/Abyssinian-cat.jpg",
            origin: "Ethiopia (Abyssinia)",
            temperament: "Active, Playful, Curious",
            suitableTemperature: "18°C - 26°C (64°F - 79°F)",
            lifespan: "12-15 years",
            weight: "3-5 kg (6-10 lbs)",
            food: [
                "High-quality cat food (1/3 - 1/2 cup daily)",
                "Protein-rich diet",
                "Fresh water essential",
                "Avoid overfeeding"
            ],
            commonDiseases: [
                "Progressive Retinal Atrophy",
                "Patellar Luxation",
                "Pyruvate Kinase Deficiency",
                "Renal Amyloidosis"
            ],
            care: [
                "Very active - needs lots of play",
                "Minimal grooming",
                "Loves to climb - provide cat trees",
                "Social - doesn't like being alone"
            ]
        },
        {
            name: "Himalayan Cat",
            image: "images/quiz/cat/Himalayan-cat.jpg",
            origin: "United States/United Kingdom",
            temperament: "Gentle, Calm, Sweet",
            suitableTemperature: "18°C - 24°C (64°F - 75°F)",
            lifespan: "9-15 years",
            weight: "3-6 kg (7-12 lbs)",
            food: [
                "High-quality cat food (1/4 - 1/2 cup daily)",
                "Wet food recommended",
                "Protein-rich diet",
                "Monitor for obesity"
            ],
            commonDiseases: [
                "Polycystic Kidney Disease",
                "Breathing problems (flat face)",
                "Eye problems",
                "Dental issues",
                "Heat sensitivity"
            ],
            care: [
                "Daily grooming essential",
                "Regular eye and face cleaning",
                "Indoor cat only",
                "Calm environment preferred"
            ]
        },
        {
            name: "Indie Cat",
            image: "images/quiz/cat/indie-cat.jpg",
            origin: "India",
            temperament: "Independent, Adaptable, Intelligent",
            suitableTemperature: "20°C - 35°C (68°F - 95°F)",
            lifespan: "12-18 years",
            weight: "3-5 kg (6-11 lbs)",
            food: [
                "Quality cat food (1/3 - 1/2 cup daily)",
                "Adaptable to various diets",
                "Home-cooked meals acceptable",
                "Fresh water essential"
            ],
            commonDiseases: [
                "Generally very healthy",
                "Tick and flea infestations (if not protected)",
                "Skin issues (if not groomed)"
            ],
            care: [
                "Very low maintenance",
                "Highly adaptable to Indian climate",
                "Independent nature",
                "Excellent mousers"
            ]
        },
        {
            name: "Ragdoll Cat",
            image: "images/quiz/cat/Ragdoll-Cat.jpg",
            origin: "United States",
            temperament: "Docile, Gentle, Affectionate",
            suitableTemperature: "18°C - 24°C (64°F - 75°F)",
            lifespan: "12-17 years",
            weight: "4-9 kg (10-20 lbs)",
            food: [
                "High-quality cat food (1/2 - 3/4 cup daily)",
                "Protein-rich diet",
                "Large breed formula",
                "Monitor portions"
            ],
            commonDiseases: [
                "Hypertrophic Cardiomyopathy",
                "Polycystic Kidney Disease",
                "Bladder stones",
                "Obesity"
            ],
            care: [
                "Regular brushing (2-3 times weekly)",
                "Very docile - keep indoors",
                "Goes limp when picked up (hence the name)",
                "Great with children"
            ]
        },
        {
            name: "Scottish Fold",
            image: "images/quiz/cat/Scottish-Fold.jpg",
            origin: "Scotland",
            temperament: "Sweet, Calm, Adaptable",
            suitableTemperature: "18°C - 24°C (64°F - 75°F)",
            lifespan: "11-15 years",
            weight: "3-6 kg (6-13 lbs)",
            food: [
                "Quality cat food (1/3 - 1/2 cup daily)",
                "Balanced diet",
                "Monitor weight",
                "Fresh water always"
            ],
            commonDiseases: [
                "Osteochondrodysplasia (joint issues)",
                "Polycystic Kidney Disease",
                "Cardiomyopathy",
                "Ear problems"
            ],
            care: [
                "Regular ear cleaning essential",
                "Weekly brushing",
                "Monitor for joint pain",
                "Gentle, quiet companion"
            ]
        },
        {
            name: "Sphynx Cat",
            image: "images/quiz/cat/Sphynx-cat.jpg",
            origin: "Canada",
            temperament: "Energetic, Loyal, Affectionate",
            suitableTemperature: "20°C - 26°C (68°F - 79°F)",
            lifespan: "8-14 years",
            weight: "3-5 kg (6-12 lbs)",
            food: [
                "High-quality cat food (1/3 - 1/2 cup daily)",
                "Higher calorie needs (no fur)",
                "Protein-rich diet",
                "Fresh water essential"
            ],
            commonDiseases: [
                "Hypertrophic Cardiomyopathy",
                "Skin conditions",
                "Respiratory issues",
                "Dental problems"
            ],
            care: [
                "Weekly bathing required (oils build up)",
                "Sun protection needed",
                "Keep warm - sensitive to cold",
                "Very social - needs attention"
            ]
        }
    ]
};

// Quiz State
let currentPetType = 'dog';
let currentBreed = null;
let usedBreeds = [];

// Initialize Quiz
function initializeQuiz() {
    loadNewQuestion();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.quiz-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.quiz-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentPetType = this.dataset.pet;
            usedBreeds = [];
            loadNewQuestion();
        });
    });

    // Learn More button
    document.getElementById('learnMoreBtn').addEventListener('click', showBreedInfo);
    
    // Next Question button
    document.getElementById('nextQuestionBtn').addEventListener('click', loadNewQuestion);
}

// Load New Question
function loadNewQuestion() {
    const breeds = breedDatabase[currentPetType + 's'];
    
    // Reset if all breeds have been used
    if (usedBreeds.length >= breeds.length) {
        usedBreeds = [];
    }
    
    // Get available breeds
    const availableBreeds = breeds.filter(b => !usedBreeds.includes(b.name));
    
    // Select random breed
    currentBreed = availableBreeds[Math.floor(Math.random() * availableBreeds.length)];
    usedBreeds.push(currentBreed.name);
    
    // Update image
    const imgElement = document.getElementById('quizImage');
    imgElement.src = currentBreed.image;
    
    // Generate options
    generateOptions(breeds);
    
    // Hide result, show question
    document.getElementById('quizResult').style.display = 'none';
    document.querySelector('.quiz-question').style.display = 'block';
}

// Generate Options
function generateOptions(breeds) {
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    // Get 3 random incorrect options
    const incorrectOptions = breeds
        .filter(b => b.name !== currentBreed.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(b => b.name);
    
    // Add correct answer
    const allOptions = [...incorrectOptions, currentBreed.name].sort(() => 0.5 - Math.random());
    
    // Create option buttons
    allOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, button));
        optionsContainer.appendChild(button);
    });
}

// Check Answer
function checkAnswer(selectedOption, button) {
    const allOptions = document.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => opt.classList.add('disabled'));
    
    const isCorrect = selectedOption === currentBreed.name;
    
    if (isCorrect) {
        button.classList.add('correct');
        showResult(true);
    } else {
        button.classList.add('incorrect');
        // Highlight correct answer
        allOptions.forEach(opt => {
            if (opt.textContent === currentBreed.name) {
                opt.classList.add('correct');
            }
        });
        showResult(false);
    }
}

// Show Result
function showResult(isCorrect) {
    const resultDiv = document.getElementById('quizResult');
    const resultIcon = resultDiv.querySelector('.result-icon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    
    if (isCorrect) {
        resultIcon.className = 'fas fa-check-circle result-icon';
        resultTitle.textContent = 'Correct! 🎉';
        resultMessage.textContent = `That's a ${currentBreed.name}! Great job identifying this breed.`;
    } else {
        resultIcon.className = 'fas fa-times-circle result-icon incorrect';
        resultTitle.textContent = 'Not quite!';
        resultMessage.textContent = `This is actually a ${currentBreed.name}. Learn more about this breed below!`;
    }
    
    document.querySelector('.quiz-question').style.display = 'none';
    resultDiv.style.display = 'block';
}

// Show Breed Information in New Tab
function showBreedInfo() {
    const breed = currentBreed;
    
    // Create HTML content for new window
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${breed.name} - Breed Information</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.4;
            color: #2C3E50;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 1rem;
            margin: 0;
            min-height: 100vh;
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
        }
        .breed-header {
            background: linear-gradient(135deg, #4A90E2, #50C878);
            color: white;
            padding: 1rem;
            text-align: center;
            flex-shrink: 0;
        }
        .breed-header h1 {
            font-size: 1.5rem;
            margin-bottom: 0.25rem;
        }
        .breed-header h1 i {
            font-size: 1.3rem;
        }
        .breed-header p {
            font-size: 0.9rem;
            opacity: 0.9;
            margin: 0;
        }
        .breed-image {
            width: 100%;
            height: 250px;
            object-fit: contain;
            background: #f5f7fa;
            flex-shrink: 0;
        }
        .breed-content {
            padding: 1rem;
            flex: 1;
        }
        .breed-content::-webkit-scrollbar {
            width: 6px;
        }
        .breed-content::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        .breed-content::-webkit-scrollbar-thumb {
            background: #4A90E2;
            border-radius: 3px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
        }
        .info-card {
            background: #f5f7fa;
            padding: 0.75rem;
            border-radius: 8px;
            border-left: 3px solid #4A90E2;
        }
        .info-card h3 {
            color: #4A90E2;
            font-size: 0.75rem;
            margin-bottom: 0.25rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .info-card p {
            color: #2C3E50;
            font-size: 0.85rem;
            font-weight: 600;
            margin: 0;
        }
        .collapsible-section {
            margin-bottom: 0.5rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
        }
        .section-header {
            background: #f5f7fa;
            padding: 0.75rem 1rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.2s;
            user-select: none;
        }
        .section-header:hover {
            background: #e8ecf0;
        }
        .section-header h2 {
            margin: 0;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .section-header h2 i {
            font-size: 0.9rem;
        }
        .section-header i.toggle-icon {
            transition: transform 0.2s;
            font-size: 0.9rem;
        }
        .section-header.active i.toggle-icon {
            transform: rotate(180deg);
        }
        .section-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .section-content.active {
            max-height: 1000px;
            overflow-y: auto;
        }
        .section-inner {
            padding: 0.75rem;
        }
        ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
        }
        ul li {
            padding: 0.5rem;
            margin-bottom: 0.35rem;
            background: #f5f7fa;
            border-radius: 6px;
            display: flex;
            align-items: start;
            gap: 0.5rem;
            font-size: 0.85rem;
        }
        ul li::before {
            content: '✓';
            color: #50C878;
            font-weight: bold;
            font-size: 1rem;
            flex-shrink: 0;
        }
        .warning li {
            background: #fff3cd;
        }
        .warning li::before {
            content: '⚠';
        }
        .close-btn {
            display: block;
            margin: 1rem auto 0.5rem;
            padding: 0.6rem 1.5rem;
            background: #4A90E2;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        .close-btn:hover {
            background: #3A7BC8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="breed-header">
            <h1><i class="fas fa-${currentPetType === 'dog' ? 'dog' : 'cat'}"></i> ${breed.name}</h1>
            <p>${breed.temperament}</p>
        </div>
        
        <img src="${breed.image}" alt="${breed.name}" class="breed-image">
        
        <div class="breed-content">
            <div class="collapsible-section">
                <div class="section-header" onclick="toggleSection(this)">
                    <h2><i class="fas fa-info-circle"></i> Basic Information</h2>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </div>
                <div class="section-content">
                    <div class="section-inner">
                        <div class="info-grid">
                            <div class="info-card">
                                <h3>Origin</h3>
                                <p>${breed.origin}</p>
                            </div>
                            <div class="info-card">
                                <h3>Lifespan</h3>
                                <p>${breed.lifespan}</p>
                            </div>
                            <div class="info-card">
                                <h3>Weight</h3>
                                <p>${breed.weight}</p>
                            </div>
                            <div class="info-card">
                                <h3>Temperature</h3>
                                <p>${breed.suitableTemperature}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="collapsible-section">
                <div class="section-header" onclick="toggleSection(this)">
                    <h2><i class="fas fa-utensils"></i> Diet & Nutrition</h2>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </div>
                <div class="section-content">
                    <div class="section-inner">
                        <ul>
                            ${breed.food.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="collapsible-section">
                <div class="section-header" onclick="toggleSection(this)">
                    <h2><i class="fas fa-heartbeat"></i> Common Health Issues</h2>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </div>
                <div class="section-content">
                    <div class="section-inner">
                        <ul class="warning">
                            ${breed.commonDiseases.map(disease => `<li>${disease}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="collapsible-section">
                <div class="section-header" onclick="toggleSection(this)">
                    <h2><i class="fas fa-hand-holding-heart"></i> Care Requirements</h2>
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </div>
                <div class="section-content">
                    <div class="section-inner">
                        <ul>
                            ${breed.care.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <button class="close-btn" onclick="window.close()">
                <i class="fas fa-times"></i> Close Window
            </button>
        </div>
    </div>
    <script>
        function toggleSection(header) {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');
            
            // Close all sections
            document.querySelectorAll('.section-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            // Open clicked section if it wasn't active
            if (!isActive) {
                header.classList.add('active');
                content.classList.add('active');
            }
        }
        
        // Open first section by default
        window.addEventListener('load', function() {
            const firstSection = document.querySelector('.section-header');
            if (firstSection) {
                firstSection.click();
            }
        });
    </script>
</body>
</html>
    `;
    
    // Open in new window
    const newWindow = window.open('', '_blank', 'width=1000,height=800,scrollbars=yes');
    newWindow.document.write(htmlContent);
    newWindow.document.close();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeQuiz);
} else {
    initializeQuiz();
}