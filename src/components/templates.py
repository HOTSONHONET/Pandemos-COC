"""
A helper script to export all required components for dashboard

"""

from dash import dcc, html
import plotly.express as px
import dash_bootstrap_components as dbc
from src.callbacks import *

from src.components.hospital_description import hdes_template
from src.components.hospital_performance import hp_template

# Bootstrap Styles
bootstrap_styles = dbc.themes.BOOTSTRAP


# Navbar
navBar = dbc.NavbarSimple(
    children=[
        dbc.NavItem(dbc.NavLink("Home", href="#")),
        dbc.NavItem(dbc.NavLink("About", href="#")),
        dbc.NavItem(dbc.NavLink("Contact", href="#")),
    ],
    brand="Pandemos",
    
    brand_style={
        "fontWeight": "bold",
        "fontSize": "30px",
        "fontFamily": 'Helvetica, sans-serif',
    },
    brand_href="#",
    
    color="#003366",
    dark=True,
)


# Base Layout
base_layout = html.Div(
    children=[      
        navBar,
        dbc.Container(
            children = [
                hdes_template,
                hp_template
            ],
            fluid=True,
            style={
                "padding" : "0px"
            }
        ),


    ]
)
