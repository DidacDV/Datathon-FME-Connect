language_mapping = {
    # Romance languages
    'Spanish': 10,
    'French': 11,
    'Italian': 12,
    'Portuguese': 13,
    'Romanian': 14,
    'Catalan': 15,

    # Germanic languages
    'English': 20,
    'German': 21,
    'Dutch': 22,
    'Swedish': 23,
    'Danish': 24,
    'Norwegian': 25,

    # Slavic languages
    'Russian': 30,
    'Polish': 31,
    'Ukrainian': 32,
    'Czech': 33,
    'Croatian': 34,

    # Asian languages
    'Mandarin': 40,
    'Japanese': 41,
    'Korean': 42,
    'Vietnamese': 43,
    'Thai': 44,

    # Indian languages
    'Hindi': 50,
    'Bengali': 51,
    'Telugu': 52,
    'Tamil': 53,
    'Urdu': 54,

    # Semitic languages
    'Arabic': 60,
    'Hebrew': 61,
    'Amharic': 62,

    # Programming languages
    'Python': 100,
    'Java': 101,
    'C++': 102,
    'JavaScript': 103,
    'R': 104,
    'Ruby': 105,
    'Go': 106,
    'Swift': 107,
    'C#': 108,
    'PHP': 109,
    'TypeScript': 110
}

def getLanguageValue(language):
    if language not in language_mapping:
        return language_mapping['English']
    return language_mapping[language]
