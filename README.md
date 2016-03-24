# angular-material-tryout-server

* Seed database: mongoimport --db angular-material-tryout --collection imageUrls --type json --file server/mongo/imageUrls-seed.json --jsonArray --drop

Attributen Cat
    - naam
    - geboortedatum
    - geslacht
    - gesteriliseerd
    - ras
    - medicijnen
    - dierenarts
    - eigenaar
    - foto
    - voeding
    - gedrag
Attributen Owner
    - naam
    - adres
    - telefoonnummer
    - email
    - noodnummer
Attributen Registration
    - van_tot
    - cat
    - owner