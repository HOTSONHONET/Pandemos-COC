import dash
from src.components.templates import base_layout, bootstrap_styles
from src.callbacks import init_callbacks

app = dash.Dash(
    __name__,
    external_stylesheets=[bootstrap_styles],
    title = "Pandemos",
    )

app._favicon = "icon.ico"
app.layout = base_layout

init_callbacks(app)


