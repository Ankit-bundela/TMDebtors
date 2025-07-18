import sys

#from entities import UnitOfMeasurement
#from managers import UnitOfMeasurementManager
#from exceptions import DataLayerException
from entities import UnitOfMeasurement
from managers import UnitofMeasurmentManager
from exceptions import DataLayerException


if len(sys.argv) < 2:
    print("You need to pass operation and data.")
    sys.exit(0)

test_what = sys.argv[1]

if test_what == "add":
    if len(sys.argv) < 3:
        print("Data to add is missing.")
        sys.exit(0)

    name = sys.argv[2]

    uom = UnitOfMeasurement(code=0, name=name)
    manager = UnitofMeasurmentManager()

    try:
        manager.add(uom)
        print(f"Unit of Measurement '{name}' added with code {uom.code}")
    except DataLayerException as e:
        print(f"Error: {e.message}")
        if e.exceptions:
            print("Details:")
            for k, v in e.exceptions.items():
                print(f"{k}: {v}")

elif test_what == "getAll":
    manager = UnitofMeasurmentManager()
    try:
        unitof_measurements = manager.getAll()
        if len(unitof_measurements) == 0:
            print("No records")
        else:
            for uom in unitof_measurements:
                print(f"Code: {uom.code}, Name: {uom.name}")
    except DataLayerException as e:
        print(f"Error: {e.message}")
        if e.exceptions:
            print("Details:")
            for k, v in e.exceptions.items():
                print(f"{k}: {v}")

elif test_what == "remove":
    if len(sys.argv) < 3:
        print("Code to remove is missing.")
        sys.exit(0)

    try:
        code = int(sys.argv[2])
    except ValueError:
        print("Invalid code, must be an integer.")
        sys.exit(0)

    manager = UnitofMeasurmentManager()

    try:
        manager.remove(code)
        print(f"Unit of Measurement with code {code} removed")
    except DataLayerException as e:
        print(f"Error: {e.message}")
        if e.exceptions:
            print("Details:")
            for k, v in e.exceptions.items():
                print(f"{k}: {v}")

elif test_what == "update":
    if len(sys.argv) < 4:
        print("Code and name are required.")
        sys.exit(0)
    try:
        code = int(sys.argv[2])
    except ValueError:
        print("Invalid code. Must be an integer.")
        sys.exit(0)

    name = sys.argv[3]
    uom = UnitOfMeasurement(code=code, name=name)
    manager = UnitofMeasurmentManager()

    try:
        manager.update(uom)
        print(f"Unit of Measurement with code {code} updated to name '{name}'")
    except DataLayerException as e:
        print(f"Error: {e.message}")

elif test_what == "getByCode":
    if len(sys.argv) < 3:
        print("Code is required.")
        sys.exit(0)

    try:
        code = int(sys.argv[2])
    except ValueError:
        print("Invalid code. Must be an integer.")
        sys.exit(0)

    manager = UnitofMeasurmentManager()

    try:
        uom = manager.getByCode(code)
        print(f"Code: {uom.code}, Name: {uom.name}")
    except DataLayerException as e:
        print(f"Error: {e.message}")
        if e.exceptions:
            for k, v in e.exceptions.items():
                print(f"{k}: {v}")

elif test_what == "getByName":
    if len(sys.argv) < 3:
        print("Name is required.")
        sys.exit(0)

    name = sys.argv[2]
    manager = UnitofMeasurmentManager()

    try:
        uom = manager.getByName(name)
        print(f"Code: {uom.code}, Name: {uom.name}")
    except DataLayerException as e:
        print(f"Error: {e.message}")
        if e.exceptions:
            for k, v in e.exceptions.items():
                print(f"{k}: {v}")
