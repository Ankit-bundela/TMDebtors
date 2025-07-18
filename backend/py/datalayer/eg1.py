import datetime
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import socket
import json
import time
#from urllib.parse import parse_qs
from urllib.parse import urlparse, parse_qs
from datalayer.managers import ItemManager
from datalayer.exceptions import DataLayerException
from datalayer.connector import DBConnection
from datalayer.managers import StateManager
from datalayer.managers import TraderManager
from datalayer.entities import Traders
from datalayer.managers import ItemManager
from datalayer.managers import UnitofMeasurmentManager
from datalayer.entities import Item, UnitofMeasurement
from datalayer.managers import CustomerManager
from datalayer.entities import Customer
from datalayer.managers import InvoiceManager
from datalayer.entities import Invoice
from datalayer.managers import InvoiceItemManager
from datalayer.entities import InvoiceItem




ROUTES = {}
def timePass(ms):
    time.sleep(ms / 1000.0)

def getItems():
    try:
        # Optional delay for simulation
        timePass(3000)

        manager = ItemManager()
        items = manager.getAll()

        items_serialized = []
        for item in items:
            item_dict = {
                "code": item.code,
                "name": item.name,
                "cgst": item.cgst,
                "sgst": item.sgst,
                "igst": item.igst,
                "hsnCode": item.hsnCode,
                "unitofMeasurments": []
            }
            if item.unitofMeasurments:
                for uom in item.unitofMeasurments:
                    item_dict["unitofMeasurments"].append({
                        "code": uom.code,
                        "name": uom.name
                    })
            items_serialized.append(item_dict)

        body = json.dumps({
            "success": True,
            "data": items_serialized
        })

        return body, "application/json"

    except DataLayerException as e:
        body = json.dumps({
            "success": False,
            "error": e.message
        })
        return body, "application/json"
    except Exception as e:
        body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return body, "application/json"


def getUnitOfMeasurments():
    try:
        timePass(3000)

        manager = UnitofMeasurmentManager()
        uoms = manager.getAll()

        uoms_serialized = []
        for uom in uoms:
            uoms_serialized.append({
                "code": uom.code,
                "name": uom.name
            })

        body = json.dumps({
            "success": True,
            "data": uoms_serialized
        })
        return body, "application/json"

    except DataLayerException as e:
        body = json.dumps({
            "success": False,
            "error": e.message
        })
        return body, "application/json"
    except Exception as e:
        body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return body, "application/json"


def getItemsDetails():
    try:
        timePass(3000)

        manager = ItemManager()
        items = manager.getAll()

        items_serialized = []
        for item in items:
            item_dict = {
                "code": item.code,
                "name": item.name,
                "cgst": item.cgst,
                "sgst": item.sgst,
                "igst": item.igst,
                "hsnCode": item.hsnCode,
                "unitofMeasurments": []
            }
            if item.unitofMeasurments:
                for uom in item.unitofMeasurments:
                    item_dict["unitofMeasurments"].append({
                        "code": uom.code,
                        "name": uom.name
                    })
            items_serialized.append(item_dict)

        body = json.dumps({
            "success": True,
            "data": items_serialized
        })

        return body, "application/json"

    except DataLayerException as e:
        body = json.dumps({
            "success": False,
            "error": e.message
        })
        return body, "application/json"
    except Exception as e:
        body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return body, "application/json"

def postUpdateItem(body_raw):
    try:
        print("Received UpdateItem Request Body:", body_raw)
        data = json.loads(body_raw)

        code = data.get("code")
        if not code:
            raise DataLayerException("code is required for update")

        name = data.get("name")
        hsnCode = data.get("hsnCode")
        cgst = float(data.get("cgst") or 0)
        sgst = float(data.get("sgst") or 0)
        igst = float(data.get("igst") or 0)

        unit_data = data.get("unitofMeasurments")
        if isinstance(unit_data, dict):
            uoms = [UnitofMeasurement(
                code=unit_data.get("code"),
                name=unit_data.get("name")
            )]
        elif isinstance(unit_data, list):
            uoms = [
                UnitofMeasurement(
                    code=u.get("code"),
                    name=u.get("name")
                ) for u in unit_data
            ]
        else:
            uoms = []

        item = Item(
            code=int(code),
            name=name,
            hsnCode=hsnCode,
            cgst=cgst,
            sgst=sgst,
            igst=igst,
            unitofMeasurments=uoms
        )

        manager = ItemManager()
        manager.update(item)

        response_body = json.dumps({
            "success": True,
            "message": f"Item {code} updated successfully"
        })
        return response_body, "application/json"

    except DataLayerException as e:
        response_body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return response_body, "application/json"
    except Exception as e:
        response_body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return response_body, "application/json"
    
def postDeleteItem(body_raw):
    try:
        print("🟢 Received DeleteItem Request Body:", body_raw)

        data = json.loads(body_raw)

        code_str = data.get("itemCode") or data.get("code")
        if not code_str or not str(code_str).strip():
            raise DataLayerException("itemCode is required in body")

        code = int(code_str)
        print(f"🟢 Attempting to delete item with code: {code}")

        manager = ItemManager()

        # Check existence
        existing = manager.getByCode(code)
        if not existing:
            return json.dumps({
                "success": False,
                "error": f"Item with code {code} does not exist"
            }), "application/json"

        # Delete item
        manager.remove(code)

        return json.dumps({
            "success": True,
            "message": f"Item {code} deleted successfully"
        }), "application/json"

    except DataLayerException as e:
        return json.dumps({"success": False, "error": str(e)}), "application/json"
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}), "application/json"
    
def postAddItem(body_raw):
    try:
        print("Received AddItem Request Body:", body_raw)
        data = json.loads(body_raw)

        name = data.get("name")
        hsnCode = data.get("hsnCode")
        cgst = data.get("cgst", 0)
        sgst = data.get("sgst", 0)
        igst = data.get("igst", 0)
        unit_data = data.get("unitofMeasurments") or []

        # Build UOM list with codes
        uom_list = []
        for u in unit_data:
            uom_code = u.get("code")
            if not uom_code:
                raise DataLayerException("Unit code missing")
            uom_list.append(UnitofMeasurement(code=uom_code, name=u.get("name", "")))

        item = Item(
            code=None,
            name=name,
            hsnCode=hsnCode,
            cgst=float(cgst or 0),
            sgst=float(sgst or 0),
            igst=float(igst or 0),
            unitofMeasurments=uom_list
        )

        manager = ItemManager()
        manager.add(item)

        response_body = json.dumps({
            "success": True,
            "message": "Item added successfully",
            "itemCode": item.code
        })
        return response_body, "application/json"

    except DataLayerException as e:
        response_body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return response_body, "application/json"
    except Exception as e:
        response_body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return response_body, "application/json"
def getAllUOMs():
    try:
        connection = DBConnection.getConnection()
        cursor = connection.cursor()
        cursor.execute("SELECT code, name FROM ac_uom ORDER BY name")
        rows = cursor.fetchall()
        cursor.close()
        connection.close()

        uoms = [{"code": int(r[0]), "name": r[1].strip()} for r in rows]

        response_body = json.dumps({
            "success": True,
            "data": uoms
        })
        return response_body, "application/json"

    except Exception as e:
        response_body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return response_body, "application/json"

    

def getStates():
    try:
        manager = StateManager()
        states = manager.getAll()

        # Serialize
        states_serialized = []
        for s in states:
            states_serialized.append({
                "code": s.code,
                "name": s.name,
                "alphaCode": s.alphaCode
            })

        body = json.dumps({
            "success": True,
            "data": states_serialized
        })
        return body, "application/json"

    except DataLayerException as e:
        body = json.dumps({"success": False, "error": e.message})
        return body, "application/json"
    except Exception as e:
        body = json.dumps({"success": False, "error": str(e)})
        return body, "application/json"


def getStateByCode(query_params):
    try:
        code = query_params.get("code")
        if not code:
            body = json.dumps({"success": False, "error": "State code is required"})
            return body, "application/json"

        manager = StateManager()
        state = manager.getByCode(int(code))
        if not state:
            body = json.dumps({"success": False, "error": f"No state found with code {code}"})
            return body, "application/json"

        body = json.dumps({
            "success": True,
            "data": {
                "code": state.code,
                "name": state.name,
                "alphaCode": state.alphaCode
            }
        })
        return body, "application/json"

    except DataLayerException as e:
        body = json.dumps({"success": False, "error": e.message})
        return body, "application/json"
    except Exception as e:
        body = json.dumps({"success": False, "error": str(e)})
        return body, "application/json"


def getStateByAlphaCode(query_params):
    try:
        alphaCode = query_params.get("alphaCode")
        if not alphaCode:
            body = json.dumps({"success": False, "error": "State alpha code is required"})
            return body, "application/json"

        manager = StateManager()
        state = manager.getByAlphaCode(alphaCode.strip())
        if not state:
            body = json.dumps({"success": False, "error": f"No state found with alpha code {alphaCode}"})
            return body, "application/json"

        body = json.dumps({
            "success": True,
            "data": {
                "code": state.code,
                "name": state.name,
                "alphaCode": state.alphaCode
            }
        })
        return body, "application/json"

    except DataLayerException as e:
        body = json.dumps({"success": False, "error": e.message})
        return body, "application/json"
    except Exception as e:
        body = json.dumps({"success": False, "error": str(e)})
        return body, "application/json"
    
def getTrader():
    try:
        manager = TraderManager()
        trader = manager.getAll()

        if not trader:
            body = json.dumps({
                "success": False,
                "error": "Trader not found"
            })
            return body, "application/json"

        # Return the trader as a dict
        trader_data = {
            "code": trader.code,
            "name": trader.name,
            "address": trader.address,
            "gstNum": trader.gstNum,
            "regTitle1": trader.regTitle1,
            "regValue1": trader.regValue1,
            "contact1": trader.contact1,
            "contact2": trader.contact2,
            "stateCode": trader.stateCode,
            "bankName": trader.bankName,
            "accountNo": trader.accountNo,
            "branchName": trader.branchName,
            "ifscCode": trader.ifscCode
        }

        body = json.dumps({
            "success": True,
            "data": trader_data
        })
        return body, "application/json"

    except DataLayerException as e:
        body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return body, "application/json"

    except Exception as e:
        body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return body, "application/json"
    

def postUpdateTrader(body_raw):
    try:
        print("Received UpdateTrader Request Body:")

        # Parse x-www-form-urlencoded body
        parsed = parse_qs(body_raw)
        data = {k: v[0] for k, v in parsed.items()}        
        required_fields = ["code", "name", "address", "gstNum", "stateCode"]
        for f in required_fields:
            if not data.get(f):
                body = json.dumps({"success": False, "error": f"Missing required field: {f}"})
                return body, "application/json"

        # Extract values safely
        code = int(data["code"])
        name = data["name"]
        address = data["address"]
        gstNum = data["gstNum"]
        regTitle1 = data.get("regTitle1")
        regValue1 = data.get("regValue1")
        contact1 = data.get("contact1")
        contact2 = data.get("contact2")
        stateCode = int(data["stateCode"])
        bankName = data.get("bankName")
        accountNo = data.get("accountNo")
        branchName = data.get("branchName")
        ifscCode = data.get("ifscCode")

        trader = Traders(
            code, name, address, gstNum,
            regTitle1, regValue1,
            contact1, contact2,
            stateCode,
            bankName, accountNo, branchName, ifscCode
        )
        print("Trader Entity Values:")
        print("code:", code)
        print("name:", name)
        print("address:", address)
        print("gstNum:", gstNum)
        print("stateCode:", stateCode)
        print("bankName:", bankName)
        print("accountNo:", accountNo)
        print("branchName:", branchName)
        print("ifscCode:", ifscCode)

        manager = TraderManager()
        manager.update(trader)
        print("Update method called successfully")
        body = json.dumps({
            "success": True,
            "message": "Trader updated successfully"
        })
        return body, "application/json"

    except DataLayerException as e:
        body = json.dumps({"success": False, "error": e.message})
        return body, "application/json"
    except Exception as e:
        body = json.dumps({"success": False, "error": str(e)})
        return body, "application/json"
    
def getCustomers():
    try:
        manager = CustomerManager()
        customers = manager.getAll()
        body = json.dumps({
            "success": True,
            "data": customers
        })
        return body, "application/json"

    except DataLayerException as e:
        body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return body, "application/json"

    except Exception as e:
        body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return body, "application/json"
def postAddCustomer(body_raw):
    try:
        print("Received AddCustomer Request Body:", body_raw)
        parsed = parse_qs(body_raw)
        data = {k: v[0] for k, v in parsed.items()}

        name = data.get("name")
        address = data.get("address")
        stateCode = data.get("stateCode")

        if not name or not address or not stateCode:
            body = json.dumps({
                "success": False,
                "error": "Name, address, and state code are required"
            })
            return body, "application/json"

        customer = Customer(
            None,
            name,
            address,
            data.get("regTitle1"),
            data.get("regValue1"),
            data.get("regTitle2"),
            data.get("regValue2"),
            data.get("regTitle3"),
            data.get("regValue3"),
            data.get("contact1"),
            data.get("contact2"),
            data.get("contact3"),
            int(stateCode)
        )

        manager = CustomerManager()
        manager.add(customer)
        print("DEBUG: After add - Customer object:", customer.__dict__)

       
        response_body = json.dumps({
            "success": True,
            "message": "Customer added successfully",
            "customerCode": customer.code
        })
        return response_body, "application/json"

    except DataLayerException as e:
        response_body = json.dumps({"success": False, "error": str(e)})
        return response_body, "application/json"
    except Exception as e:
        response_body = json.dumps({"success": False, "error": str(e)})
        return response_body, "application/json"
    

def postUpdateCustomer(body_raw):
    try:
        print("Received UpdateCustomer Request Body:", body_raw)

        # Parse x-www-form-urlencoded body
        parsed = parse_qs(body_raw)
        data = {k: v[0] for k, v in parsed.items()}

        code = data.get("code")
        if not code:
            response_body = json.dumps({
                "success": False,
                "error": "Customer code is required for update"
            })
            return response_body, "application/json"

        manager = CustomerManager()
        existing_customer = manager.getByCode(int(code))
        if not existing_customer:
            response_body = json.dumps({
                "success": False,
                "error": f"No customer found with code {code}"
            })
            return response_body, "application/json"

        # Build updated customer dict
        updated_customer = {
            "code": int(code),
            "name": data.get("name") or existing_customer["name"],
            "address": data.get("address") or existing_customer["address"],
            "regTitle1": data.get("regTitle1") or existing_customer.get("regTitle1"),
            "regValue1": data.get("regValue1") or existing_customer.get("regValue1"),
            "regTitle2": data.get("regTitle2") or existing_customer.get("regTitle2"),
            "regValue2": data.get("regValue2") or existing_customer.get("regValue2"),
            "regTitle3": data.get("regTitle3") or existing_customer.get("regTitle3"),
            "regValue3": data.get("regValue3") or existing_customer.get("regValue3"),
            "contact1": data.get("contact1") or existing_customer.get("contact1"),
            "contact2": data.get("contact2") or existing_customer.get("contact2"),
            "contact3": data.get("contact3") or existing_customer.get("contact3"),
            "stateCode": int(data.get("stateCode") or existing_customer.get("stateCode") or 1)
        }

        manager.update(updated_customer)

        response_body = json.dumps({
            "success": True,
            "message": "Customer updated successfully",
            "updatedCustomer": updated_customer
        })
        return response_body, "application/json"

    except DataLayerException as e:
        response_body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return response_body, "application/json"
    except Exception as e:
        response_body = json.dumps({
            "success": False,
            "error": str(e)
        })
        return response_body, "application/json"
    
def postRemoveCustomer(body_raw):
    try:
        print("Received RemoveCustomer Request Body:", body_raw)
        
        # Parse x-www-form-urlencoded body
        parsed = parse_qs(body_raw)
        data = {k: v[0] for k, v in parsed.items()}

        code = data.get("code")
        if not code:
            response_body = json.dumps({
                "success": False,
                "error": "Customer code is required"
            })
            return response_body, "application/json"

        customerManager = CustomerManager()
        
        # Check if customer exists
        existingCustomer = customerManager.getByCode(int(code))
        if not existingCustomer:
            response_body = json.dumps({
                "success": False,
                "error": "Customer not found"
            })
            return response_body, "application/json"

        # Remove customer
        customerManager.remove(int(code))

        response_body = json.dumps({
            "success": True,
            "message": "Customer removed successfully"
        })
        return response_body, "application/json"

    except DataLayerException as e:
        response_body = json.dumps({"success": False, "error": str(e)})
        return response_body, "application/json"
    except Exception as e:
        response_body = json.dumps({"success": False, "error": str(e)})
        return response_body, "application/json"

def getAllInvoices():
    try:
        manager = InvoiceManager()
        invoices = manager.getAll()

        serialized = []
        for inv in invoices:
            serialized.append({
                "code": inv.code,
                "customerCode": inv.customerCode,
                "invoiceDate": inv.invoiceDate.strftime("%Y-%m-%d"),
                "totalAmount": float(inv.totalAmount),
                "createdOn": inv.createdOn.strftime("%Y-%m-%d") if inv.createdOn else None
            })

        return json.dumps({
            "success": True,
            "data": serialized
        }), "application/json"

    except Exception as e:
        return json.dumps({
            "success": False,
            "error": str(e)
        }), "application/json"

    

def postAddInvoice(body_raw):
    try:
        print("Received AddInvoice Request Body:", body_raw)
        data = json.loads(body_raw)

        customerCode = int(data.get("customerCode"))
        invoiceDateStr = data.get("invoiceDate")

        if not invoiceDateStr:
            raise DataLayerException("invoiceDate is required (YYYY-MM-DD)")

        invoiceDate = datetime.datetime.strptime(invoiceDateStr, "%Y-%m-%d")

        invoice = Invoice(
            customerCode=customerCode,
            invoiceDate=invoiceDate,
            totalAmount=0
        )

        manager = InvoiceManager()
        code = manager.add(invoice)

        return json.dumps({
            "success": True,
            "message": "Invoice created successfully.",
            "invoiceCode": code
        }), "application/json"

    except DataLayerException as e:
        return json.dumps({"success": False, "error": str(e)}), "application/json"
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}), "application/json"
    
def getInvoiceDetails(query_params):
    try:
        invoice_code = query_params.get("invoiceCode")
        if not invoice_code:
            raise Exception("invoiceCode parameter is required")

        from datalayer.managers import InvoiceItemManager
        manager = InvoiceItemManager()
        items = manager.getByInvoiceCode(int(invoice_code))

        serialized = []
        for item in items:
            serialized.append({
                "invoiceCode": item.invoiceCode,
                "itemCode": item.itemCode,
                "rate": float(item.rate),
                "quantity": float(item.quantity),
                "sgst": float(item.sgst),
                "cgst": float(item.cgst),
                "igst": float(item.igst),
                "taxableAmount": float(item.taxableAmount),
                "totalAmount": float(item.totalAmount)
            })

        return json.dumps({
            "success": True,
            "data": serialized
        }), "application/json"

    except Exception as e:
        return json.dumps({
            "success": False,
            "error": str(e)
        }), "application/json"

    

def postAddInvoiceItem(body_raw):
    try:
        print("🟢 Received AddInvoiceItem Request Body:", body_raw)
        data = json.loads(body_raw)

        invoice_item = InvoiceItem(
            invoiceCode=int(data.get("invoiceCode")),
            itemCode=int(data.get("itemCode")),
            rate=float(data.get("rate")),
            quantity=float(data.get("quantity")),
            sgst=float(data.get("sgst", 0)),
            cgst=float(data.get("cgst", 0)),
            igst=float(data.get("igst", 0)),
            taxableAmount=float(data.get("taxableAmount")),
            totalAmount=float(data.get("totalAmount"))
        )

        manager = InvoiceItemManager()
        manager.add(invoice_item)

        return json.dumps({
            "success": True,
            "message": "Invoice Item added successfully."
        }), "application/json"

    except DataLayerException as e:
        return json.dumps({"success": False, "error": str(e)}), "application/json"
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)}), "application/json"






def serverStatus():
    body = json.dumps({"status": "ready"})
    return body, "application/json"





# Register route
ROUTES = {
    "GET": {
            "/server-status": serverStatus,
            "/getTrader": getTrader,
            "/getStates":getStates,
            "/getStateByCode":getStateByCode,
            "/getStateByAlphaCode":getStateByAlphaCode,
            "/getItems": getItems,
            "/getCustomers": getCustomers,
            "/getItemsDetails": getItemsDetails,
            "/getUnitOfMeasurments":getUnitOfMeasurments,
            "/getAllUOMs":getAllUOMs,
            "/getAllInvoices": getAllInvoices,              
            "/getInvoiceDetails": getInvoiceDetails 

    },
    "POST": {
        "/addItem":postAddItem,
        "/updateTrader": postUpdateTrader,
        "/updateItem":postUpdateItem,
        "/deleteItem":postDeleteItem,
        "/addCustomer":postAddCustomer,
        "/updateCustomer":postUpdateCustomer,
        "/removeCustomer":postRemoveCustomer,
        "/addInvoice":postAddInvoice,
        "/addInvoiceItem": postAddInvoiceItem,
        }
}


serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serverSocket.bind(("localhost", 5050))
serverSocket.listen()
print("Server running on http://localhost:5050")

while True:
    clientSocket, clientAddress = serverSocket.accept()
    request = clientSocket.recv(4096).decode("utf-8")

    # If request is empty, close connection and wait for next
    if not request.strip():
        clientSocket.close()
        continue

    # Split lines safely
    request_lines = request.splitlines()
    if not request_lines:
        clientSocket.close()
        continue

    request_line = request_lines[0]
    parts = request_line.split()
    print(parts)

    if len(parts) < 2:
        body = "Bad Request"
        response = (
            "HTTP/1.1 400 Bad Request\r\n"
            "Content-Type: text/plain\r\n"
            f"Content-Length: {len(body)}\r\n"
            "Connection: close\r\n"
            "\r\n"
            f"{body}"
        )
        clientSocket.sendall(response.encode())
        clientSocket.close()
        continue

    method, path = parts[0], parts[1]

    # Ignore favicon.ico
    if path == "/favicon.ico":
        body = ""
        response = (
            "HTTP/1.1 204 No Content\r\n"
            "Connection: close\r\n"
            "\r\n"
        )
        clientSocket.sendall(response.encode())
        clientSocket.close()
        continue

    if method == "GET" and path in ROUTES["GET"]:
        body, content_type = ROUTES["GET"][path]()
        response = (
            "HTTP/1.1 200 OK\r\n"
            f"Content-Type: {content_type}\r\n"
            f"Content-Length: {len(body)}\r\n"
            "Connection: close\r\n"
            "\r\n"
            f"{body}"
        )
    elif method == "POST" and path in ROUTES["POST"]:
        header_end = request.find("\r\n\r\n")
        body_raw = request[header_end+4:]
        body, content_type = ROUTES["POST"][path](body_raw)
        response = (
            "HTTP/1.1 200 OK\r\n"
            f"Content-Type: {content_type}\r\n"
            f"Content-Length: {len(body)}\r\n"
            "Connection: close\r\n"
            "\r\n"
            f"{body}"
        )
    else:
        body = "Not Found"
        response = (
            "HTTP/1.1 404 Not Found\r\n"
            "Content-Type: text/plain\r\n"
            f"Content-Length: {len(body)}\r\n"
            "Connection: close\r\n"
            "\r\n"
            f"{body}"
        )

    clientSocket.sendall(response.encode())
    clientSocket.close()
####################################################################################

serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serverSocket.bind(("localhost", 5050))
serverSocket.listen()
print("Server running on http://localhost:5050")

while True:
    clientSocket, clientAddress = serverSocket.accept()
    request = clientSocket.recv(4096).decode("utf-8")

    # If request is empty, close connection and wait for next
    if not request.strip():
        clientSocket.close()
        continue

    # Split lines safely
    request_lines = request.splitlines()
    if not request_lines:
        clientSocket.close()
        continue

    request_line = request_lines[0]
    parts = request_line.split()
    print(parts)

    if len(parts) < 2:
        body = "Bad Request"
        response = (
            "HTTP/1.1 400 Bad Request\r\n"
            "Content-Type: text/plain\r\n"
            f"Content-Length: {len(body)}\r\n"
            "Connection: close\r\n"
            "\r\n"
            f"{body}"
        )
        clientSocket.sendall(response.encode())
        clientSocket.close()
        continue

    method, path = parts[0], parts[1]

    # Ignore favicon.ico
    if path == "/favicon.ico":
        body = ""
        response = (
            "HTTP/1.1 204 No Content\r\n"
            "Connection: close\r\n"
            "\r\n"
        )
        clientSocket.sendall(response.encode())
        clientSocket.close()
        continue

    if method == "GET":
        from urllib.parse import urlparse, parse_qs

        parsed_url = urlparse(path)
        base_path = parsed_url.path
        query_params = parse_qs(parsed_url.query)

        if base_path in ROUTES["GET"]:
            handler = ROUTES["GET"][base_path]
            try:
                # Pehle query params ke saath call karo
                body, content_type = handler(query_params)
            except TypeError:
                # Agar function koi argument accept nahi karta ho to bina params ke call karo
                body, content_type = handler()
            response = (
                "HTTP/1.1 200 OK\r\n"
                f"Content-Type: {content_type}\r\n"
                f"Content-Length: {len(body)}\r\n"
                "Connection: close\r\n"
                "\r\n"
                f"{body}"
            )
        else:
            body = "Not Found"
            response = (
                "HTTP/1.1 404 Not Found\r\n"
                "Content-Type: text/plain\r\n"
                f"Content-Length: {len(body)}\r\n"
                "Connection: close\r\n"
                "\r\n"
                f"{body}"
            )

    elif method == "POST" and path in ROUTES["POST"]:
        header_end = request.find("\r\n\r\n")
        body_raw = request[header_end+4:]
        body, content_type = ROUTES["POST"][path](body_raw)
        response = (
            "HTTP/1.1 200 OK\r\n"
            f"Content-Type: {content_type}\r\n"
            f"Content-Length: {len(body)}\r\n"
            "Connection: close\r\n"
            "\r\n"
            f"{body}"
        )
    else:
        body = "Not Found"
        response = (
            "HTTP/1.1 404 Not Found\r\n"
            "Content-Type: text/plain\r\n"
            f"Content-Length: {len(body)}\r\n"
            "Connection: close\r\n"
            "\r\n"
            f"{body}"
        )

    clientSocket.sendall(response.encode())
    clientSocket.close()
