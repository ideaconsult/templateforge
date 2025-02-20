import json
import random
import string
import uuid
from datetime import datetime, timedelta
from pathlib import Path


def random_string(length=32):
    chars = "".join(
        [string.digits, string.ascii_letters, "!#$%&()*+,-./:;<=>?@[]^_`{|}~", " " * 10]
    )
    return "".join(random.choices(chars, k=length)).strip()


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
        "METHOD": random_string(),
        "timestamp": date.isoformat(),
        "PROTOCOL_CATEGORY_CODE": random_string(),
        "EXPERIMENT": random_string(),
        "template_name": random_string(),
        "template_status": random_status,
        "template_author": random_string(),
        "template_acknowledgment": random_string(),
    }
    data.append(template)

dir_name = "cypress/fixtures/json"
file_name = "bk_rcapi_templates_generated.json"
file_path = Path.cwd() / dir_name / file_name

templates = {"template": data}

with open(file_path, "w") as file:
    json.dump(templates, file, indent=2)

drafts = [_ for _ in filter(lambda _: _["template_status"] == "DRAFT", data)]
finals = [_ for _ in filter(lambda _: _["template_status"] == "FINALIZED", data)]
drafts_by_newest = sorted(drafts, key=lambda _: _["timestamp"], reverse=True)
finals_by_newest = sorted(finals, key=lambda _: _["timestamp"], reverse=True)
drafts_first_uuid = drafts_by_newest[0]["uuid"]
finals_first_uuid = finals_by_newest[0]["uuid"]
random_name = drafts[random.randint(0, len(drafts) - 1)]["template_name"]
print("Update cypress/e2e/general.cy.js with:")
print(f'const uuidFirstDraft = "{drafts_first_uuid}";')
print(f'const uuidFirstFinalized = "{finals_first_uuid}";')
print(f'const searchText = "{random_name}";')
