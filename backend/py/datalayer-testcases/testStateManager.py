import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from datalayer.managers import StateManager
from datalayer.exceptions import DataLayerException

def test_get_all():
    manager = StateManager()
    try:
        states = manager.getAll()
        for s in states:
            print(f"{s.code} - {s.name} ({s.alphaCode})")
    except DataLayerException as e:
        print("Error:", e)

def test_get_by_code(code):
    manager = StateManager()
    try:
        state = manager.getByCode(code)
        print(f"{state.code} - {state.name} ({state.alphaCode})")
    except DataLayerException as e:
        print("Error:", e)

def test_get_by_alpha(alpha):
    manager = StateManager()
    try:
        state = manager.getByAlphaCode(alpha)
        print(f"{state.code} - {state.name} ({state.alphaCode})")
    except DataLayerException as e:
        print("Error:", e)

if __name__ == "__main__":
    test_get_all()
    test_get_by_code(5)
    test_get_by_alpha('MP')
