"""
Template for hospital performance
> Outpatients vs Inpatient Trends
> Avg Waiting Time By Division
> Patient by Division

"""

from typing import Sized, overload
from dash import dcc, html
from dash_bootstrap_components._components.Col import Col
import plotly.express as px
import dash_bootstrap_components as dbc
from src.callbacks import *
import dash_table as dt
import pandas as pd


# Dummy Data
pbd_df = pd.DataFrame(
    zip(["Surgery", "Gynaecology", "Dermatology", "Neurology", "Oncology", "Orthopaedics", "Cardiology"],
        [7+2, 7+10, 7+1, 7, 5, 5, 8],
        [17, 10, 9, 8, 14, 17, 12],),
    columns=["Division", "Inpatient", "Outpatient"]
)

avgWaitTime_df = pd.DataFrame(
    zip(["Surgery", "Gynaecology", "Dermatology", "Neurology", "Oncology", "Orthopaedics", "Cardiology"],
        [17, 27, 37, 47, 57, 67, 77],),
    columns=["Division", "Number"]

)


fig = px.bar(
    avgWaitTime_df,
    y="Division",
    x="Number",
    orientation="h"
)

bar_graph = dbc.Container(dcc.Graph(
    id="average_time",
    figure=fig
))


patient_by_division = dbc.Container(
    children=[
        dbc.Table.from_dataframe(
            pbd_df,
            bordered=True,
            dark=True,
            hover=True,
            responsive=True,
            striped=True,
            style={
                "height": "75%"
            }
        ),
    ],
    style={"height": "500px"}

)


patient_by_division_card = dbc.Card(
    children=[
        dbc.CardHeader("Specialist Count"),
        dbc.CardBody(
            [
                patient_by_division
            ],
        ),
    ],
    color="light",
    outline=False,
    style={
        "textAlign": "center",
        "fontSize": "25px",
    }
)

bar_graph_card = dbc.Card(
    children=[
        dbc.CardHeader("Average Waiting Time"),
        dbc.CardBody(
            [
                bar_graph
            ],
        ),
    ],
    color="light",
    outline=False,
    style={
        "textAlign": "center",
        "fontSize": "25px",
        "maxHeight": "auto"

    }
)


hp_template = dbc.Row(
    children=[
        dbc.Col(patient_by_division_card, style={"marginLeft": "30px", }),
        dbc.Col(bar_graph_card,),
    ],

    style={
        # "textAlign" : "center",
        "width": "100%",
        "height": "200px"
    }
)
