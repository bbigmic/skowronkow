#!/usr/bin/env python3
"""
Skrypt do importu danych z plików Excel do bazy danych SQLite
dla projektu Osiedle Skowronków
"""

import pandas as pd
import sqlite3
import os
import sys
from pathlib import Path
import re

def clean_apartment_number(apt_num):
    """Czyści numer mieszkania z niepotrzebnych znaków"""
    if pd.isna(apt_num):
        return None
    return str(apt_num).strip()

def parse_floor_number(kondygnacja):
    """Parsuje kondygnację do numeru piętra"""
    if pd.isna(kondygnacja):
        return 0
    
    kondygnacja = str(kondygnacja).lower().strip()
    
    if 'parter' in kondygnacja:
        return 0
    elif 'pietro' in kondygnacja or 'piętro' in kondygnacja:
        # Szukamy numeru piętra
        numbers = re.findall(r'\d+', kondygnacja)
        if numbers:
            return int(numbers[0])
        return 1
    elif 'piwnica' in kondygnacja:
        return -1
    else:
        # Próbujemy wyciągnąć numer
        numbers = re.findall(r'-?\d+', kondygnacja)
        if numbers:
            return int(numbers[0])
        return 0

def get_floor_name(floor_number):
    """Zwraca nazwę piętra na podstawie numeru"""
    if floor_number == 0:
        return 'parter'
    elif floor_number == -1:
        return 'piwnica'
    elif floor_number > 0:
        return f'pietro{floor_number}'
    else:
        return f'piwnica{abs(floor_number)}'

def calculate_rooms_from_area(area):
    """Szacuje liczbę pokoi na podstawie powierzchni"""
    if pd.isna(area):
        return 1
    
    area = float(area)
    if area <= 30:
        return 1
    elif area <= 45:
        return 2
    elif area <= 65:
        return 3
    elif area <= 85:
        return 4
    else:
        return 5

def import_block_data(block_name, file_path, conn):
    """Importuje dane bloku z pliku Excel"""
    cursor = conn.cursor()
    
    # Odczytujemy dane z pierwszego arkusza
    df = pd.read_excel(file_path, sheet_name=0)
    
    print(f"\n=== IMPORT DANYCH: {block_name} ===")
    print(f"Liczba mieszkań: {len(df)}")
    
    # Dodajemy blok do bazy
    cursor.execute('''
        INSERT OR REPLACE INTO blocks (name, description, delivery_date, total_floors, total_apartments)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        block_name,
        f'Blok mieszkalny {block_name}',
        'koniec 2026' if '1' in block_name else 'koniec 2027',
        4,  # parter, piętro 1, piętro 2, piwnica
        len(df)
    ))
    
    block_id = cursor.lastrowid
    
    # Grupujemy mieszkania według pięter
    floors_data = {}
    
    for _, row in df.iterrows():
        apartment_number = clean_apartment_number(row['Mieszkanie'])
        if not apartment_number:
            continue
            
        area = float(row['Powierzchnia']) if not pd.isna(row['Powierzchnia']) else 0
        kondygnacja = row['Kondygnacja']
        floor_number = parse_floor_number(kondygnacja)
        floor_name = get_floor_name(floor_number)
        
        # Cena
        cena_calkowita = row.get('Cena całości brutto', 0)
        if pd.isna(cena_calkowita):
            cena_calkowita = 0
        
        # Status
        status = row.get('Status', 'available')
        if pd.isna(status):
            status = 'available'
        elif 'niedostępne' in str(status).lower():
            status = 'unavailable'
        else:
            status = 'available'
        
        # Ścieżki do PDF-ów
        pdf_path = f'/images/imagemaps_apartments_structure/{block_name.lower()}/{floor_name}/{apartment_number}/{apartment_number}.pdf'
        storage_pdf_path = f'/images/imagemaps_apartments_structure/{block_name.lower()}/{floor_name}/{apartment_number}/{apartment_number} - komórka.pdf'
        
        # Liczba pokoi
        rooms = calculate_rooms_from_area(area)
        
        # Dodajemy do grupy pięter
        if floor_number not in floors_data:
            floors_data[floor_number] = {
                'floor_name': floor_name,
                'apartments': []
            }
        
        floors_data[floor_number]['apartments'].append({
            'number': apartment_number,
            'area': area,
            'rooms': rooms,
            'price': cena_calkowita,
            'status': status,
            'pdf_path': pdf_path,
            'storage_pdf_path': storage_pdf_path
        })
    
    # Dodajemy piętra i mieszkania
    for floor_number, floor_data in floors_data.items():
        floor_name = floor_data['floor_name']
        apartments = floor_data['apartments']
        
        # Dodajemy piętro
        cursor.execute('''
            INSERT OR REPLACE INTO floors (block_id, floor_number, floor_name, total_apartments)
            VALUES (?, ?, ?, ?)
        ''', (block_id, floor_number, floor_name, len(apartments)))
        
        floor_id = cursor.lastrowid
        
        # Dodajemy mieszkania
        for apt in apartments:
            cursor.execute('''
                INSERT OR REPLACE INTO apartments 
                (block_id, floor_id, apartment_number, area, rooms, price, status, pdf_path, storage_pdf_path)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                block_id, floor_id, apt['number'], apt['area'], apt['rooms'],
                apt['price'], apt['status'], apt['pdf_path'], apt['storage_pdf_path']
            ))
            
            apartment_id = cursor.lastrowid
            
            # Dodajemy komórkę (jeśli istnieje)
            cursor.execute('''
                INSERT OR REPLACE INTO storage_rooms (apartment_id, storage_number, area, pdf_path)
                VALUES (?, ?, ?, ?)
            ''', (
                apartment_id, f"{apt['number']}-komórka", 0, apt['storage_pdf_path']
            ))
    
    conn.commit()
    print(f"Zaimportowano {len(df)} mieszkań w {len(floors_data)} piętrach")

def create_database_schema(db_path):
    """Tworzy schemat bazy danych SQLite"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Usuwamy istniejące tabele
    cursor.execute('DROP TABLE IF EXISTS storage_rooms')
    cursor.execute('DROP TABLE IF EXISTS apartments')
    cursor.execute('DROP TABLE IF EXISTS floors')
    cursor.execute('DROP TABLE IF EXISTS blocks')
    
    # Tabela bloków
    cursor.execute('''
        CREATE TABLE blocks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            description TEXT,
            delivery_date TEXT,
            total_floors INTEGER,
            total_apartments INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabela pięter
    cursor.execute('''
        CREATE TABLE floors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            block_id INTEGER NOT NULL,
            floor_number INTEGER NOT NULL,
            floor_name TEXT NOT NULL,
            total_apartments INTEGER,
            FOREIGN KEY (block_id) REFERENCES blocks (id) ON DELETE CASCADE,
            UNIQUE(block_id, floor_number)
        )
    ''')
    
    # Tabela mieszkań
    cursor.execute('''
        CREATE TABLE apartments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            block_id INTEGER NOT NULL,
            floor_id INTEGER NOT NULL,
            apartment_number TEXT NOT NULL,
            area REAL NOT NULL,
            rooms INTEGER NOT NULL,
            price REAL,
            status TEXT DEFAULT 'available',
            pdf_path TEXT,
            storage_pdf_path TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (block_id) REFERENCES blocks (id) ON DELETE CASCADE,
            FOREIGN KEY (floor_id) REFERENCES floors (id) ON DELETE CASCADE,
            UNIQUE(block_id, apartment_number)
        )
    ''')
    
    # Tabela komórek
    cursor.execute('''
        CREATE TABLE storage_rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            apartment_id INTEGER NOT NULL,
            storage_number TEXT,
            area REAL,
            pdf_path TEXT,
            FOREIGN KEY (apartment_id) REFERENCES apartments (id) ON DELETE CASCADE
        )
    ''')
    
    # Indeksy dla lepszej wydajności
    cursor.execute('CREATE INDEX idx_apartments_block_id ON apartments(block_id)')
    cursor.execute('CREATE INDEX idx_apartments_floor_id ON apartments(floor_id)')
    cursor.execute('CREATE INDEX idx_apartments_status ON apartments(status)')
    cursor.execute('CREATE INDEX idx_floors_block_id ON floors(block_id)')
    
    conn.commit()
    conn.close()
    print("Schemat bazy danych został utworzony")

def main():
    """Główna funkcja skryptu"""
    print("=== IMPORT DANYCH EXCEL DO SQLITE - OSIEDLE SKOWRONKÓW ===")
    
    # Sprawdzamy czy pliki Excel istnieją
    excel_files = {
        "Blok 1": "Blok nr 1 - tabelka.xlsx",
        "Blok 2": "Blok nr 2 - tabelka.xlsx"
    }
    
    missing_files = [f for f in excel_files.values() if not os.path.exists(f)]
    if missing_files:
        print(f"Brakujące pliki: {missing_files}")
        return
    
    # Tworzymy katalog dla bazy danych
    db_dir = Path("database")
    db_dir.mkdir(exist_ok=True)
    
    # Tworzymy bazę danych
    db_path = db_dir / "osiedle_skowronkow.db"
    create_database_schema(db_path)
    
    # Łączymy się z bazą danych
    conn = sqlite3.connect(db_path)
    
    try:
        # Importujemy dane z każdego bloku
        for block_name, file_path in excel_files.items():
            import_block_data(block_name, file_path, conn)
        
        # Sprawdzamy wyniki
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) FROM blocks')
        blocks_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM floors')
        floors_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM apartments')
        apartments_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM storage_rooms')
        storage_count = cursor.fetchone()[0]
        
        print(f"\n=== PODSUMOWANIE IMPORTU ===")
        print(f"Bloki: {blocks_count}")
        print(f"Piętra: {floors_count}")
        print(f"Mieszkania: {apartments_count}")
        print(f"Komórki: {storage_count}")
        
        # Pokażmy przykładowe dane
        print(f"\n=== PRZYKŁADOWE DANE ===")
        cursor.execute('''
            SELECT b.name, f.floor_name, a.apartment_number, a.area, a.rooms, a.price, a.status
            FROM apartments a
            JOIN floors f ON a.floor_id = f.id
            JOIN blocks b ON a.block_id = b.id
            ORDER BY b.name, f.floor_number, a.apartment_number
            LIMIT 10
        ''')
        
        for row in cursor.fetchall():
            print(f"{row[0]} | {row[1]} | {row[2]} | {row[3]:.1f}m² | {row[4]} pokoi | {row[5]:,.0f} zł | {row[6]}")
        
    finally:
        conn.close()
    
    print(f"\nBaza danych została utworzona: {db_path}")
    print("Dane zostały pomyślnie zaimportowane!")

if __name__ == "__main__":
    main()
