from flask import Flask, g
from controllers.captioning import CaptioningController

class CaptioningMiddleware:
    def __init__(self):
        self.model = CaptioningController()
        print('Initialize model.')
        
    def open(self):
        g.model = self.model
        
    # Haven't figure out how to close the model yet
    def register(self, app: Flask):
        if 'captioning_model' not in app.before_request_funcs:  # Check if already registered
            app.before_request(self.open)
            app.before_request_funcs['captioning_model'] = self.open  # Store for future checks