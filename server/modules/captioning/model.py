from transformers import BlipProcessor, BlipForConditionalGeneration
import requests
from PIL import Image

class BlipCaptioningModel:
    def __init__(self, model_name='Salesforce/blip-image-captioning-base', device='cuda'):
        self.processor = BlipProcessor.from_pretrained(model_name)
        self.model = BlipForConditionalGeneration.from_pretrained(model_name).to(device)
        self.device = device

    def generate_caption(self, image_path):
        image = Image.open(image_path)
        inputs = self.processor(image, return_tensors="pt").to(self.device)
        caption = self.model.generate(**inputs)
        return self.processor.decode(caption[0], skip_special_tokens=True)

    def generate_caption_from_url(self, image_url):
        image = Image.open(requests.get(image_url, stream=True).raw)
        inputs = self.processor(image, return_tensors="pt").to(self.device)
        caption = self.model.generate(**inputs)
        return self.processor.decode(caption[0], skip_special_tokens=True)