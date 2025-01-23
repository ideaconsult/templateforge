import json
import random
import string
import uuid
from datetime import datetime, timedelta
import os

def random_string(length=8):
    return ''.join(random.choices(string.printable + 
                                  string.digits + 
                                  string.punctuation + 
                                  string.whitespace, k=length))

def random_date(start, end):
    delta = end - start
    random_days = random.randint(0, delta.days)
    return start + timedelta(days=random_days)

start_date = datetime(2020, 1, 1)
end_date = datetime(2025, 1, 1)

data = []

for _ in range(15):
  date = random_date(start_date, end_date)

  random_status = random.choice(['DRAFT', 'FINALIZED'])

  template = {
        "uri": f"https://api-test.ramanchada.ideaconsult.net/template/{random_string(21)}",
        "uuid": str(uuid.uuid4()),
        "METHOD": "CFE",
        "timestamp": date.isoformat(),
        "PROTOCOL_CATEGORY_CODE": "TO_GENETIC_IN_VITRO_SECTION",
        "EXPERIMENT": "CFE-SOP",
        "template_name": random_string(42),
        "template_status": random_status,
        "template_author": random_string(42),
        "template_acknowledgment": random_string(34)
  }
  data.append(template)

current_directory = os.getcwd()

file_name = "templates_generated.json"

parent_directory = os.path.dirname(current_directory) + "/fixtures"

file_path = os.path.join(parent_directory, file_name)

templates = {"template": data}

with open(file_path, "w") as file:
    json.dump(templates, file)