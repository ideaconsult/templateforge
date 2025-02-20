import json
import random
import string
import uuid
from datetime import datetime, timedelta
from pathlib import Path


def random_string(length=8):
    return "".join(random.choices(string.printable, k=length))


def random_underscores_string(length=8):
    return "".join(
        random_string(length)
        + "_"
        + random_string(length)
        + "_"
        + random_string(length)
    )


def random_date(start, end):
    delta = end - start
    random_days = random.randint(0, delta.days)
    random_us = random.randint(1, 86400000000)
    return start + timedelta(days=random_days, microseconds=random_us)


start_date = datetime(2023, 7, 1)
end_date = datetime(2024, 7, 1)

data = []

for _ in range(150):
    date = random_date(start_date, end_date)

    random_status = random.choice(["DRAFT", "FINALIZED"])

    uuid_value = str(uuid.uuid4())

    template = {
        "uri": f"https://api-test.ramanchada.ideaconsult.net/template/{uuid_value}",
        "uuid": uuid_value,
        "METHOD": random_string(12),
        "timestamp": date.isoformat(),
        "PROTOCOL_CATEGORY_CODE": random_underscores_string(6),
        "EXPERIMENT": random_string(12),
        "template_name": random_string(42),
        "template_status": random_status,
        "template_author": random_string(42),
        "template_acknowledgment": random_string(34),
    }
    data.append(template)

dir_name = "cypress/fixtures/json"
file_name = "bk_rcapi_templates_generated.json"
file_path = Path.cwd() / dir_name / file_name

templates = {"template": data}

with open(file_path, "w") as file:
    json.dump(templates, file, indent=2)
