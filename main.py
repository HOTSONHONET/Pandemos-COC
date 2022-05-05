from src import start_app

app = start_app()


if __name__ == "__main__":
    app.run(port=5000, debug=1)
