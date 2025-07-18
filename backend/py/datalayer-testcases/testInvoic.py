


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from datalayer.entities import InvoiceItem
from datalayer.managers import InvoiceItemManager

# यहां existing Invoice Code डालो जो ac_invoice में हो
invoice_item = InvoiceItem(
    invoiceCode=22,          # यह Code वही होना चाहिए जो पहले create किया
    itemCode=86,             # existing item code
    rate=500.0,
    quantity=2,
    sgst=45.0,
    cgst=45.0,
    igst=0.0,
    taxableAmount=1000.0,
    totalAmount=1090.0
)

try:
    manager = InvoiceItemManager()
    manager.add(invoice_item)
    print("✅ Invoice Item inserted successfully.")
except Exception as e:
    print("❌ Error while inserting Invoice Item:", e)
