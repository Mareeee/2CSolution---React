# GraphQL API i React Klijent za Upravljanje Korisnicima

Ovaj projekat predstavlja jednostavan sistem za upravljanje korisnicima pomoću **GraphQL API-ja** razvijenog u **Node.js** i **Apollo** Server-u, uz PostgreSQL kao bazu podataka. Klijentska aplikacija je izrađena u **React-u** i koristi Apollo Client za komunikaciju sa API-jem.

## Opis projekta

API omogućava:

-   Registraciju novih korisnika (name, email)
-   Dohvatanje svih korisnika
-   Filtriranje korisnika po imenu ili email adresi
-   Brisanje korisnika
-   Validaciju email adrese pre registracije

Frontend aplikacija omogućava vizuelnu interakciju sa ovim funkcijama kroz jednostavan UI.

-   [Primer pokretanja](https://youtu.be/Ia-A5HFtzpw)

---

## Tehnologije

-   Backend: Node.js, Apollo Server, GraphQL, PostgreSQL
-   Frontend: React, Apollo Client
-   Baza podataka: PostgreSQL (lokalno)

## Pokretanje projekta

### Preduslovi

Potrebno je instalirati:

-   [Node.js](https://nodejs.org/)
-   [PostgreSQL](https://www.postgresql.org/)

### Podesi bazu

Projekat koristi sledeće parametre za konekciju sa PostgreSQL bazom (nalaze se u `server.js`):

```bash
user: 'postgres',
host: 'localhost',
database: 'postgres',
password: 'password',
port: 5432
```

1. Kloniranje projekta:

```bash
git clone https://github.com/Mareeee/2CSolution---React.git
cd 2CSolution---React
```

2. Pokretanje backenda:

```bash
cd 2csolution/back
npm install
node server.js
```

3. Pokretanje frontenda:

```bash
cd ../front/2csolution
npm install
npm start
```

4. Aplikacija će biti dostupna na: http://localhost:3000
