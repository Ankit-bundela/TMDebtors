import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from datalayer.connector import DBConnection

try:
    con = DBConnection.getConnection()
    print("✅ Connection successful.")
    con.close()
except Exception as e:
    print("❌ Connection failed:", e)
