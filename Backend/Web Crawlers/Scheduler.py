import schedule
import os
from .crawler import runCrawler


if __name__ == "__main__":
    schedule.every().day.at("00:00").do(runCrawler)
