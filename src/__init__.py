from warnings import filterwarnings
from flask import Flask

# For filtering out all warnings we will get when starting the application
filterwarnings("ignore")

# A display message when the app starts
print("[INFO] Keep Calm n Enjoy the drill...")


# Main function to start the application
def start_app():
    app = Flask(__name__, instance_relative_config=False)
    with app.app_context():
        from . import routes
        return app
