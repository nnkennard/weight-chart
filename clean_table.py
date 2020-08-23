# -*- coding: utf-8 -*-

import sys
import csv
import json


VOLUME_CONVERSION = {
"2 tablespoons": (2, "tablespoons"),
"1/4 cup": (0.25, "cups"),
"1 cup": (1, "cups"),
"2 1/4 tea­spoons": (2.25, "teaspoons"),
"1/2 cup": (0.5, "cups"),
"8 table­spoons (1/2 cup)": (0.5, "cups"),
"1/2 tea­spoon": (0.5, "teaspoons"),
"1 large head": (1, "large heads"),
"1 tea­spoon": (1, "teaspoons"),
"4 cups": (4, "cups"),
"2 table­spoons": (2, "tablespoons"),
"2 cups": (2, "cups"),
"1 table­spoon": (1, "tablespoons"),
"1 large": (1, "large"),
        }


FRACTION_MAP = {
"1/2": 0.5,
"1/4": 0.25,
"1/8": 0.125,
"3/4": 0.75,
"3/8": 0.375,
"5/8": 0.625,
"7/8": 0.875,
}

NUMBER_MAP = {str(i):i for i in range(12)}

def get_number(number):
    if "/" in number:
        assert number in FRACTION_MAP
        return FRACTION_MAP[number]
    else:
        assert number in NUMBER_MAP
        return NUMBER_MAP[number]

def convert_volume(volume_string):
    assert volume_string in VOLUME_CONVERSION
    return VOLUME_CONVERSION[volume_string]


WEIRD_OZS_MAP = {
        "8 to 8 1/2": (8, 8.5),
        "4 1/2 to 5": (4.5, 5),
        "4 1/4 to 5 1/4": (4.25, 5.25)
        }

def convert_ozs(ozs_string):
    items = ozs_string.split()
    if not items:
        return -1
    if len(items) == 1:
        item = items.pop(0)
        return get_number(item)
    elif len(items) == 2:
        whole, part = items
        return get_number(whole) + get_number(part)
    else:
        assert ozs_string in WEIRD_OZS_MAP
        return WEIRD_OZS_MAP[ozs_string]

WEIRD_GRAMS_MAP = {
        "227 to 241": (227, 241),
        "128 to 142": (128, 142),
        "121 to 150": (121, 150)
        }

def convert_grams(gm_string):
    try:
        int_string = int(gm_string)
        return int_string
    except ValueError:
        return WEIRD_GRAMS_MAP[gm_string]

    
def convert_row(row):
    volume, unit = convert_volume(row["Volume"])
    return {
            "ingredient": row["Ingredient"],
            "volume": volume,
            "unit": unit,
            "oz": convert_ozs(row["Ounces"]),
            "gm": convert_grams(row["Grams"]),
            }

def convert_rows(reader):
    rows = []
    for row in reader:
        rows.append(convert_row(row))
    return sorted(rows, key=lambda x: x["ingredient"])


def main():
  with open("original_chart.csv", "r") as f:
    reader = csv.DictReader(f)
    with open("clean_weights.json", 'w') as g:
        rows = convert_rows(reader)
        g.write(json.dumps(rows))


if __name__ == "__main__":
    main()
