# AutoPayrollEmailer
AutoPayrollEmailer est un projet Node.js conçu pour automatiser l'envoi mensuel des fiches de paie par e-mail aux employés. Le projet utilise Node.js et le module Nodemailer pour rechercher les fiches de paie de chaque employé dans un dossier spécifié et les envoyer par e-mail en utilisant leurs adresses e-mail correspondantes.

## Installation
Pour utiliser ce projet, vous devez installer [Node.js](https://nodejs.org/en/download/). Une fois Node.js installé, vous pouvez installer les dépendances du projet en exécutant la commande suivante dans le répertoire du projet:
```bash
npm install
```

## Fonctionnalités

- Recherche des fiches de paie mensuelles dans un dossier spécifié. 
- Lecture des informations des employés à partir d'un fichier JSON contenant leurs noms, prénoms et adresses e-mail. 
- Envoi automatique des fiches de paie par e-mail en utilisant le serveur SMTP de Gmail. 
- Personnalisation du contenu de l'e-mail avec le mois, l'année, le nom et le prénom de l'employé. 
- Gestion des noms de fichiers de fiches de paie avec un format spécifique (ex. Paies-06-2023-NOM-PRENOM.pdf).

## Configuration
Avant d'utiliser le projet AutoPayrollEmailer, assurez-vous de suivre ces étapes de configuration :

1. Installez les dépendances en exécutant npm install pour installer les modules nécessaires.
2. Créez un fichier JSON nommé employees.json à la racine du projet pour stocker les informations des employés (nom, prénom, e-mail) ou utilisez le fichier employees.json fourni dans le répertoire du projet.
3. Remplissez le fichier employees.json avec les informations des employés au format suivant :
```bash
[
  { "lastName": "Doe", "firstName": "John", "email": "john.doe@example.com" },
  { "lastName": "Smith", "firstName": "Jane", "email": "jane.smith@example.com" },
  ...
]
```
4. Assurez-vous d'avoir configuré les variables d'environnement GMAIL_ADDRESS et GMAIL_PASSWORD avec les informations d'identification de votre compte Gmail.

Pour ce faire, créez un fichier .env à la racine du projet et ajoutez les lignes suivantes :
```bash
GMAIL_ADDRESS=your_gmail_address
GMAIL_PASSWORD=your_gmail_password
```


## Lancement du projet
Pour lancer le projet, exécutez la commande suivante dans le répertoire du projet :
```bash
npm start
```


