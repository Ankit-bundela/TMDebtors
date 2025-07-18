import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# ✅ अब import करो
from datalayer.entities import Item, UnitofMeasurement
from datalayer.managers import ItemManager
from datalayer.exceptions import DataLayerException


def test_add():
    print("== ADD ITEM TEST ==")
    name = "Pet"
    cgst = 18
    sgst = 18
    igst = 24
    hsnCode = "HSN5678"

    unitofMeasurments = [
    UnitofMeasurement(1, "Kg"),
    UnitofMeasurement(4, "PKT"),
    UnitofMeasurement(5, "Gram"),
    UnitofMeasurement(6, "PCS")
]


    item = Item(
        code=None,
        name=name,
        hsnCode=hsnCode,
        cgst=cgst,
        sgst=sgst,
        igst=igst,
        unitofMeasurments=unitofMeasurments
    )

    manager = ItemManager()
    try:
        manager.add(item)
        print(f"✅ Item '{name}' added successfully with code {item.code}")
    except DataLayerException as e:
        print("❌ DataLayerException:", str(e))
    except Exception as e:
        print("❌ Exception:", str(e))


def test_get_all():
    print("== GET ALL ITEMS TEST ==")
    manager = ItemManager()
    try:
        items = manager.getAll()
        print(f"Total items retrieved: {len(items)}")
        for i, item in enumerate(items, start=1):
            print(f"Item {i}:")
            print(f"  Code: {item.code}")
            print(f"  Name: {item.name}")
            print(f"  CGST: {item.cgst}")
            print(f"  SGST: {item.sgst}")
            print(f"  IGST: {item.igst}")
            print(f"  HSN Code: {item.hsnCode}")
            if item.unitofMeasurments:
                print("  Unit of Measurements:")
                for u in item.unitofMeasurments:
                    print(f"    Code: {u.code}, Name: {u.name}")
            else:
                print("  No Unit of Measurements")
    except DataLayerException as e:
        print("❌ DataLayerException:", str(e))
    except Exception as e:
        print("❌ Exception:", str(e))



def test_update():
    print("== UPDATE ITEM TEST ==")
    
    # Existing code को यहां डालो (getAll() से देख लो)
    existing_code = 80   # ✅ यह Code कोई existing होना चाहिए

    # Update करने के लिए नया data
    name = "Pet Updated"
    cgst = 12
    sgst = 12
    igst = 18
    hsnCode = "HSN8888"

    # New Unit of Measurements
    unitofMeasurments = [
        UnitofMeasurement(1, "KG"),
        UnitofMeasurement(5, "Gram")
    ]

    # Item Object
    item = Item(
        code=existing_code,
        name=name,
        hsnCode=hsnCode,
        cgst=cgst,
        sgst=sgst,
        igst=igst,
        unitofMeasurments=unitofMeasurments
    )

    manager = ItemManager()
    try:
        manager.update(item)
        print(f"✅ Item code {existing_code} updated successfully.")
    except DataLayerException as e:
        print("❌ DataLayerException:", str(e))
    except Exception as e:
        print("❌ Exception:", str(e))
def test_get_by_code(code):
    print(f"== GET ITEM BY CODE: {code} ==")
    manager = ItemManager()
    try:
        item = manager.getByCode(code)
        print("✅ Item fetched successfully:")
        print(f"  Code: {item.code}")
        print(f"  Name: {item.name}")
        print(f"  HSN Code: {item.hsnCode}")
        print(f"  CGST: {item.cgst}")
        print(f"  SGST: {item.sgst}")
        print(f"  IGST: {item.igst}")
        if item.unitofMeasurments:
            print("  Unit of Measurements:")
            for u in item.unitofMeasurments:
                print(f"    Code: {u.code}, Name: {u.name}")
        else:
            print("  No Unit of Measurements")
    except DataLayerException as e:
        print("❌ DataLayerException:", str(e))
    except Exception as e:
        print("❌ Exception:", str(e))


def test_remove(code):
    print(f"== REMOVE ITEM BY CODE: {code} ==")
    manager = ItemManager()
    try:
        manager.remove(code)
        print(f"✅ Item code {code} removed successfully.")
    except DataLayerException as e:
        print("❌ DataLayerException:", str(e))
    except Exception as e:
        print("❌ Exception:", str(e))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❗ Usage:")
        print("   python testItem.py add")
        print("   python testItem.py getall")
        print("   python testItem.py update")
        print("   python testItem.py get <code>")
        print("   python testItem.py remove <code>")
        sys.exit(1)

    command = sys.argv[1].lower()

    if command == "add":
        test_add()
    elif command == "getall":
        test_get_all()
    elif command == "update":
        test_update()
    elif command in ["get", "remove"]:
        if len(sys.argv) < 3:
            print(f"❗ You must provide code for '{command}' operation.")
            sys.exit(1)
        try:
            code = int(sys.argv[2])
        except ValueError:
            print("❌ Code must be an integer.")
            sys.exit(1)
        if command == "get":
            test_get_by_code(code)
        elif command == "remove":
            test_remove(code)
    else:
        print(f"❗ Unknown command '{command}'. Use 'add', 'getall', 'update', 'get', or 'remove'.")
