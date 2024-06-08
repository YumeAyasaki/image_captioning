from transformers import BlipProcessor, BlipForConditionalGeneration
import requests
from PIL import Image
import base64
import io

class CaptioningController:
    def __init__(self, model_name='Salesforce/blip-image-captioning-base', device='cpu'):
        self.processor = BlipProcessor.from_pretrained(model_name)
        self.model = BlipForConditionalGeneration.from_pretrained(model_name).to('cpu')
        self.device = device

    def generate_caption(self, image_base64):
        image_bytes = base64.b64decode(str(image_base64))
        image = Image.open(io.BytesIO(image_bytes))
        inputs = self.processor(image, return_tensors="pt").to(self.device)
        caption = self.model.generate(**inputs)
        return self.processor.decode(caption[0], skip_special_tokens=True)

    def generate_caption_from_url(self, image_url):
        image = Image.open(requests.get(image_url, stream=True).raw)
        inputs = self.processor(image, return_tensors="pt").to(self.device)
        caption = self.model.generate(**inputs)
        return self.processor.decode(caption[0], skip_special_tokens=True)
