from deep_translator import GoogleTranslator

def translate_sentence (sentence):
    translated = GoogleTranslator(source='en', target='vi').translate(sentence)
    return translated
