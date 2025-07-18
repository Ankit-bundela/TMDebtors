import sys
import os

# Ensure parent directory is in sys.path to access datalayer modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from datalayer.connector import DBConnection
from datalayer.managers import UserManager
from datalayer.entities import User


def test_add_user():
    manager = UserManager()
    try:
        user = User(
            id=None,
            name="Ankit Bundela",
            email="ankit@example.com",
            password="ankit123",  # plain text; will be hashed internally
            role="admin",
            createdAt=None
        )
        manager.add(user)
        print("✅ User added successfully.")
    except Exception as e:
        print("❌ Failed to add user:", e)


def test_login(email, password):
    manager = UserManager()
    try:
        user = manager.getByEmail(email)
        if user is None:
            print("❌ User not found.")
            return

        is_valid = manager.validate_password(password, user.password)
        if is_valid:
            print(f"✅ Login successful for {user.name} ({user.email})")
        else:
            print("❌ Invalid password.")

    except Exception as e:
        print("❌ Login check failed:", e)


def test_get_all_users():
    manager = UserManager()
    try:
        users = manager.getAll()
        print("📋 All Users:")
        for user in users:
            print(f"  ID: {user['id']}, Name: {user['name']}, Email: {user['email']}, Role: {user['role']}, Created At: {user['createdAt']}")
    except Exception as e:
        print("❌ Failed to fetch users:", e)


def delete_user_by_email(email):
    connection = DBConnection.getConnection()
    cursor = connection.cursor()
    try:
        cursor.execute("DELETE FROM users WHERE email = :email", {"email": email})
        connection.commit()
        print(f"🗑️ Deleted user with email: {email}")
    except Exception as e:
        connection.rollback()
        print("❌ Error deleting user:", e)
    finally:
        cursor.close()
        connection.close()


# -------------------------
if __name__ == "__main__":
    print("== Running UserManager Tests ==")

    # Optional cleanup before test
    delete_user_by_email("ankit@example.com")

    print("\n🧪 Test: Add User")
    test_add_user()

    print("\n🔐 Test: Login")
    test_login("ankit@example.com", "ankit123")

    print("\n📋 Test: Get All Users")
    test_get_all_users()

    # Optional cleanup after test
    delete_user_by_email("ankit@example.com")
