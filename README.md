# Kalkulator Podatku Dochodowego

Aplikacja webowa do obliczania podatku VAT z możliwością zapisywania historii obliczeń w bazie danych.

## Opis projektu

Aplikacja umożliwia:

-   Obliczanie kwoty brutto i podatku VAT na podstawie kwoty netto i stawki VAT
-   Zapisywanie obliczeń w bazie danych SQLite
-   Przeglądanie historii wszystkich obliczeń
-   Usuwanie zapisanych obliczeń
-   Walidację danych po stronie frontendu i backendu

## Technologie

-   **Frontend**: Nuxt 4, Vue 3, Tailwind CSS
-   **Backend**: Nuxt Server API (Nitro)
-   **Baza danych**: SQLite z Drizzle ORM
-   **Język**: TypeScript

## Wymagania

-   Node.js (wersja 18 lub wyższa)
-   npm lub yarn

## Instalacja

1. **Sklonuj repozytorium** (lub pobierz projekt)

2. **Zainstaluj zależności:**

    ```bash
    npm install
    ```

3. **Skonfiguruj bazę danych:**

    Baza danych SQLite zostanie automatycznie utworzona przy pierwszym uruchomieniu. Migracje są już przygotowane w katalogu `server/db/migrations/`.

    Jeśli chcesz wygenerować nowe migracje po zmianie schematu:

    ```bash
    npm run db:generate
    ```

4. **Uruchom serwer deweloperski:**

    ```bash
    npm run dev
    ```

5. **Otwórz przeglądarkę:**

    Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## Struktura projektu

```
tax_calculator/
├── app/                    # Kod aplikacji Nuxt
│   ├── components/         # Komponenty Vue
│   │   ├── application/    # Komponenty aplikacji
│   │   └── ui/             # Komponenty UI
│   ├── composables/        # Composables Vue
│   ├── pages/              # Strony aplikacji
│   └── assets/             # Zasoby statyczne
├── server/                 # Kod serwera (API)
│   ├── api/                # Endpointy API
│   └── db/                 # Konfiguracja bazy danych
│       ├── schema.ts       # Schemat bazy danych
│       ├── client.ts       # Klient Drizzle
│       └── migrations/     # Migracje bazy danych
├── db.sqlite               # Plik bazy danych (tworzony automatycznie)
└── nuxt.config.ts          # Konfiguracja Nuxt
```

## Dostępne skrypty

-   `npm run dev` - Uruchamia serwer deweloperski
-   `npm run build` - Buduje aplikację produkcyjną
-   `npm run generate` - Generuje statyczną wersję aplikacji
-   `npm run preview` - Podgląd zbudowanej aplikacji
-   `npm run db:generate` - Generuje nowe migracje bazy danych
-   `npm run db:migrate` - Wykonuje migracje bazy danych

## API Endpoints

-   `GET /api/calculator` - Pobiera wszystkie obliczenia
-   `POST /api/calculator` - Zapisuje nowe obliczenie
-   `DELETE /api/calculator/:id` - Usuwa obliczenie o podanym ID

## Uwagi

-   Plik bazy danych `db.sqlite` jest ignorowany przez Git (zobacz `.gitignore`)
-   Każdy developer powinien mieć własną lokalną bazę danych
-   Migracje bazy danych są w repozytorium i powinny być commitowane
