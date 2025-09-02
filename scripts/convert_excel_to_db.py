#!/usr/bin/env python3
"""
Skrypt do konwersji danych z plików Excel do bazy danych SQLite
dla projektu Osiedle Skowronków
"""

import pandas as pd
import sqlite3
import os
import sys
from pathlib import Path

def read_excel_file(file_path):
    """Odczytuje plik Excel i zwraca DataFrame"""
    try:
        # Próbujemy odczytać wszystkie arkusze
        excel_file = pd.ExcelFile(file_path)
        print(f"Arkusze w pliku {file_path}: {excel_file.sheet_names}")
        
        # Odczytujemy pierwszy arkusz
        df = pd.read_excel(file_path, sheet_name=0)
        print(f"Kolumny w arkuszu: {list(df.columns)}")
        print(f"Liczba wierszy: {len(df)}")
        print(f"Pierwsze 5 wierszy:\n{df.head()}")
        print(f"Typy danych:\n{df.dtypes}")
        print("-" * 50)
        
        return df
    except Exception as e:
        print(f"Błąd przy odczytywaniu pliku {file_path}: {e}")
        return None

def create_database_schema(db_path):
    """Tworzy schemat bazy danych SQLite"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Tabela bloków
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS blocks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            delivery_date TEXT,
            total_floors INTEGER,
            total_apartments INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabela pięter
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS floors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            block_id INTEGER NOT NULL,
            floor_number INTEGER NOT NULL,
            floor_name TEXT NOT NULL,
            total_apartments INTEGER,
            FOREIGN KEY (block_id) REFERENCES blocks (id)
        )
    ''')
    
    # Tabela mieszkań
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS apartments (
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
            FOREIGN KEY (block_id) REFERENCES blocks (id),
            FOREIGN KEY (floor_id) REFERENCES floors (id)
        )
    ''')
    
    # Tabela komórek
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS storage_rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            apartment_id INTEGER NOT NULL,
            storage_number TEXT,
            area REAL,
            pdf_path TEXT,
            FOREIGN KEY (apartment_id) REFERENCES apartments (id)
        )
    ''')
    
    conn.commit()
    conn.close()
    print("Schemat bazy danych został utworzony")

def analyze_excel_structure():
    """Analizuje strukturę plików Excel"""
    excel_files = [
        "Blok nr 1 - tabelka.xlsx",
        "Blok nr 2 - tabelka.xlsx"
    ]
    
    data_frames = {}
    
    for file_path in excel_files:
        if os.path.exists(file_path):
            print(f"\n=== ANALIZA PLIKU: {file_path} ===")
            df = read_excel_file(file_path)
            if df is not None:
                data_frames[file_path] = df
        else:
            print(f"Plik {file_path} nie istnieje")
    
    return data_frames

def main():
    """Główna funkcja skryptu"""
    print("=== KONWERTER EXCEL DO SQLITE - OSIEDLE SKOWRONKÓW ===")
    
    # Sprawdzamy czy pliki Excel istnieją
    excel_files = [
        "Blok nr 1 - tabelka.xlsx",
        "Blok nr 2 - tabelka.xlsx"
    ]
    
    missing_files = [f for f in excel_files if not os.path.exists(f)]
    if missing_files:
        print(f"Brakujące pliki: {missing_files}")
        print("Upewnij się, że pliki Excel są w głównym katalogu projektu")
        return
    
    # Analizujemy strukturę plików
    data_frames = analyze_excel_structure()
    
    if not data_frames:
        print("Nie udało się odczytać żadnych plików Excel")
        return
    
    # Tworzymy katalog dla bazy danych
    db_dir = Path("database")
    db_dir.mkdir(exist_ok=True)
    
    # Tworzymy bazę danych
    db_path = db_dir / "osiedle_skowronkow.db"
    create_database_schema(db_path)
    
    print(f"\nBaza danych została utworzona: {db_path}")
    print("Następnym krokiem będzie analiza struktury danych i import do bazy")

if __name__ == "__main__":
    main()
