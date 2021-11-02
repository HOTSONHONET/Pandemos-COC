"""
Template for hospital description
> Hospital Image
> Total patient Count
> Total Admitted patient count
> Avg treatment cost
> Avg ER Waiting time
> Total staff count
> Total Doctor Count

"""

from dash import dcc, html
from dash.html.Font import Font
from dash.html.Hr import Hr
from dash_bootstrap_components._components.Row import Row
import plotly.express as px
import dash_bootstrap_components as dbc
from src.callbacks import *



# Helper functions
def giveCardContent(header_name = None, title = "Card title", text = "This is a Card text", color = "primary", outline = False):
    if header_name == None:
        card_content = [
        dbc.CardBody(
            [
                html.H3(title, className="card-title"),
                html.P(
                    text,
                    className="card-text",
                ),
            ]
        ),
    ]


    else :
        card_content = [
        dbc.CardHeader(header_name),
        dbc.CardBody(
            [
                html.H5(title, className="card-title"),
                html.P(
                    text,
                    className="card-text",

                ),
            ],
        ),
    ]

    card_content =  dbc.Card(
                card_content,
                color=color, 
                outline=outline,
                style={
                    "textAlign" : "center",
                    "fontSize" : "25px"
                    
                }
            )

    return card_content


# Components
img = dbc.Row(
    dbc.Container([
        html.Img(
            src='assets/tmp.jpg',
            style={
                'height': '100%',
                'width': '97%'
            })
    ], 
    fluid = True,
    style={'textAlign': 'center', "padding" : "2px", "width" :  "100%"})
)


row_1 = dbc.Row(
    [
        dbc.Col(giveCardContent(title = "Total Patient Count", text="10000", color="#66b3ff")),
        dbc.Col(giveCardContent(title = "Total Admitted Count", text = "5000", color = "#e6f2ff")),
        dbc.Col(giveCardContent(title = "Average Treatment Cost", text = "Rs 20000", color = "#66b3ff")),
    ],
    className="mb-4",
    style={
        "padding" : "5px"
    }
)

row_2 = dbc.Row(
    [
        dbc.Col(giveCardContent(title = "Average ER Time", text="2 Hours", color = "#e6f2ff")),
        dbc.Col(giveCardContent(title = "Total Staff Count", text = "300", color = "#66b3ff")),
        dbc.Col(giveCardContent(title = "Total Staff Count", text = "100", color = "#e6f2ff")),
    ],
    className="mb-4",
    style={
        "padding" : "5px"
    }
)


hdes_template = dbc.Container([
    img,
    row_1,
    row_2    
])
