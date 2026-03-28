# Pet Breed Quiz Images

This directory contains images for the Pet Breed Quiz feature.

## Directory Structure

```
quiz/
├── dog/          # Dog breed images
└── cat/          # Cat breed images
```

## Current Breed Images

### Dog Breeds (26 breeds)
The following dog breed images are included:
1. Beagle
2. Boxer
3. Chihuahua
4. Cocker Spaniel
5. Dachshund
6. Dalmatian
7. Doberman Pinscher
8. English Bulldog
9. French Bulldog
10. German Shepherd
11. Golden Retriever
12. Great Dane
13. Indian Pariah Dog (Indie)
14. Indian Spitz
15. Labrador Retriever
16. Maltese
17. Mudhol Hound
18. Pomeranian
19. Poodle
20. Pug
21. Rajapalayam Dog
22. Rottweiler
23. Saint Bernard
24. Shih Tzu
25. Siberian Husky
26. Tibetan Mastiff

### Cat Breeds (11 breeds)
The following cat breed images are included:
1. Abyssinian Cat
2. Bengal Cat
3. British Shorthair Cat
4. Himalayan Cat
5. Indie Cat
6. Maine Coon
7. Persian Cat
8. Ragdoll Cat
9. Scottish Fold
10. Siamese Cat
11. Sphynx Cat

## Image Format

All images are in HEIC format (.heic), which is supported by modern browsers.

## How the Quiz Works

1. **Random Selection**: The quiz randomly selects a breed from the chosen category (dog or cat)
2. **Image Display**: Shows the breed image from this directory
3. **Multiple Choice**: Presents 4 options including the correct breed name
4. **Detailed Information**: After answering, users can view comprehensive breed information including:
   - Origin and temperament
   - Suitable temperature range
   - Lifespan and weight
   - Dietary requirements
   - Common health issues
   - Care requirements

## Adding New Breeds

To add a new breed to the quiz:

1. Add the breed image to the appropriate directory (dog/ or cat/)
2. Update `/js/quiz-data.js` with the new breed information
3. Include all required fields:
   - name
   - image (path to the image file)
   - origin
   - temperament
   - suitableTemperature
   - lifespan
   - weight
   - food (array)
   - commonDiseases (array)
   - care (array)

## Notes

- The quiz automatically cycles through all breeds before repeating
- Each breed has detailed, veterinary-accurate information
- Images are optimized for web display
- The quiz is fully responsive and works on all devices