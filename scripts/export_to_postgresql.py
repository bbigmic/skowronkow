#!/usr/bin/env python3
"""
Skrypt do eksportu danych z SQLite do PostgreSQL
dla projektu Osiedle Skowronków
"""

import sqlite3
import psycopg2
import os
import sys
from pathlib import Path

def connect_sqlite():
    """Łączy się z bazą SQLite"""
    db_path = Path("database/osiedle_skowronkow.db")
    if not db_path.exists():
        raise FileNotFoundError(f"Baza SQLite nie istnieje: {db_path}")
    
    return sqlite3.connect(db_path)

def connect_postgresql():
    """Łączy się z bazą PostgreSQL"""
    # Konfiguracja połączenia - dostosuj do swoich potrzeb
    config = {
        'host': os.getenv('POSTGRES_HOST', 'localhost'),
        'port': os.getenv('POSTGRES_PORT', '5432'),
        'database': os.getenv('POSTGRES_DB', 'osiedle_skowronkow'),
        'user': os.getenv('POSTGRES_USER', 'postgres'),
        'password': os.getenv('POSTGRES_PASSWORD', 'password')
    }
    
    return psycopg2.connect(**config)

def export_blocks(sqlite_conn, pg_conn):
    """Eksportuje bloki z SQLite do PostgreSQL"""
    print("Eksportowanie bloków...")
    
    sqlite_cursor = sqlite_conn.cursor()
    pg_cursor = pg_conn.cursor()
    
    # Pobieramy dane z SQLite
    sqlite_cursor.execute('SELECT * FROM blocks')
    blocks = sqlite_cursor.fetchall()
    
    # Wstawiamy do PostgreSQL
    for block in blocks:
        pg_cursor.execute('''
            INSERT INTO blocks (id, name, description, delivery_date, total_floors, total_apartments, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                description = EXCLUDED.description,
                delivery_date = EXCLUDED.delivery_date,
                total_floors = EXCLUDED.total_floors,
                total_apartments = EXCLUDED.total_apartments
        ''', block)
    
    pg_conn.commit()
    print(f"Zaimportowano {len(blocks)} bloków")

def export_floors(sqlite_conn, pg_conn):
    """Eksportuje piętra z SQLite do PostgreSQL"""
    print("Eksportowanie pięter...")
    
    sqlite_cursor = sqlite_conn.cursor()
    pg_cursor = pg_conn.cursor()
    
    # Pobieramy dane z SQLite
    sqlite_cursor.execute('SELECT * FROM floors')
    floors = sqlite_cursor.fetchall()
    
    # Wstawiamy do PostgreSQL
    for floor in floors:
        pg_cursor.execute('''
            INSERT INTO floors (id, block_id, floor_number, floor_name, total_apartments)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (id) DO UPDATE SET
                block_id = EXCLUDED.block_id,
                floor_number = EXCLUDED.floor_number,
                floor_name = EXCLUDED.floor_name,
                total_apartments = EXCLUDED.total_apartments
        ''', floor)
    
    pg_conn.commit()
    print(f"Zaimportowano {len(floors)} pięter")

def export_apartments(sqlite_conn, pg_conn):
    """Eksportuje mieszkania z SQLite do PostgreSQL"""
    print("Eksportowanie mieszkań...")
    
    sqlite_cursor = sqlite_conn.cursor()
    pg_cursor = pg_conn.cursor()
    
    # Pobieramy dane z SQLite
    sqlite_cursor.execute('SELECT * FROM apartments')
    apartments = sqlite_cursor.fetchall()
    
    # Wstawiamy do PostgreSQL
    for apartment in apartments:
        pg_cursor.execute('''
            INSERT INTO apartments (id, block_id, floor_id, apartment_number, area, rooms, price, status, pdf_path, storage_pdf_path, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO UPDATE SET
                block_id = EXCLUDED.block_id,
                floor_id = EXCLUDED.floor_id,
                apartment_number = EXCLUDED.apartment_number,
                area = EXCLUDED.area,
                rooms = EXCLUDED.rooms,
                price = EXCLUDED.price,
                status = EXCLUDED.status,
                pdf_path = EXCLUDED.pdf_path,
                storage_pdf_path = EXCLUDED.storage_pdf_path
        ''', apartment)
    
    pg_conn.commit()
    print(f"Zaimportowano {len(apartments)} mieszkań")

def export_storage_rooms(sqlite_conn, pg_conn):
    """Eksportuje komórki z SQLite do PostgreSQL"""
    print("Eksportowanie komórek...")
    
    sqlite_cursor = sqlite_conn.cursor()
    pg_cursor = pg_conn.cursor()
    
    # Pobieramy dane z SQLite
    sqlite_cursor.execute('SELECT * FROM storage_rooms')
    storage_rooms = sqlite_cursor.fetchall()
    
    # Wstawiamy do PostgreSQL
    for storage_room in storage_rooms:
        pg_cursor.execute('''
            INSERT INTO storage_rooms (id, apartment_id, storage_number, area, pdf_path)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (id) DO UPDATE SET
                apartment_id = EXCLUDED.apartment_id,
                storage_number = EXCLUDED.storage_number,
                area = EXCLUDED.area,
                pdf_path = EXCLUDED.pdf_path
        ''', storage_room)
    
    pg_conn.commit()
    print(f"Zaimportowano {len(storage_rooms)} komórek")

def verify_export(pg_conn):
    """Weryfikuje eksport danych"""
    print("\nWeryfikacja eksportu...")
    
    pg_cursor = pg_conn.cursor()
    
    # Sprawdzamy liczbę rekordów
    tables = ['blocks', 'floors', 'apartments', 'storage_rooms']
    
    for table in tables:
        pg_cursor.execute(f'SELECT COUNT(*) FROM {table}')
        count = pg_cursor.fetchone()[0]
        print(f"{table}: {count} rekordów")
    
    # Sprawdzamy przykładowe dane
    print("\nPrzykładowe mieszkania:")
    pg_cursor.execute('''
        SELECT b.name, f.floor_name, a.apartment_number, a.area, a.rooms, a.price, a.status
        FROM apartments a
        JOIN floors f ON a.floor_id = f.id
        JOIN blocks b ON a.block_id = b.id
        ORDER BY b.name, f.floor_number, a.apartment_number
        LIMIT 5
    ''')
    
    for row in pg_cursor.fetchall():
        print(f"{row[0]} | {row[1]} | {row[2]} | {row[3]:.1f}m² | {row[4]} pokoi | {row[5]:,.0f} zł | {row[6]}")

def main():
    """Główna funkcja skryptu"""
    print("=== EKSPORT DANYCH Z SQLITE DO POSTGRESQL - OSIEDLE SKOWRONKÓW ===")
    
    sqlite_conn = None
    pg_conn = None
    
    try:
        # Łączymy się z bazami danych
        print("Łączenie z bazą SQLite...")
        sqlite_conn = connect_sqlite()
        
        print("Łączenie z bazą PostgreSQL...")
        pg_conn = connect_postgresql()
        
        # Eksportujemy dane
        export_blocks(sqlite_conn, pg_conn)
        export_floors(sqlite_conn, pg_conn)
        export_apartments(sqlite_conn, pg_conn)
        export_storage_rooms(sqlite_conn, pg_conn)
        
        # Weryfikujemy eksport
        verify_export(pg_conn)
        
        print("\n✅ Eksport zakończony pomyślnie!")
        
    except Exception as e:
        print(f"❌ Błąd podczas eksportu: {e}")
        sys.exit(1)
        
    finally:
        # Zamykamy połączenia
        if sqlite_conn:
            sqlite_conn.close()
        if pg_conn:
            pg_conn.close()

if __name__ == "__main__":
    main()
