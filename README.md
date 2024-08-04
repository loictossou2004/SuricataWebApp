<p align="center">
    <img src="image/password.png" height="120px"/>
    <h1 align="center">SuricataWebApp</h1>
    <h4 align="center">
      Testez vos alertes suricata
    </h4>
    <div align="center">
        <img  src="https://img.shields.io/badge/Nodejs-greenlight?logo=Node.js&logoColor=white" alt="Nodejs">
        <img  src="https://img.shields.io/badge/MySQL-purple?logo=MySQL&logoColor=white" alt="Static Badge">
        <img src="https://img.shields.io/badge/React-blue?logo=React
        ">
        <img src="https://img.shields.io/badge/Suricata-orange">
    </div>
  <br>
</p>

Ce projet consiste en la création d'une application web vulnérable aux injections SQL, permettant d'utiliser Suricata pour détecter ces attaques. L'application utilise un frontend en React.js, un backend en Node.js, une base de données MySQL, et des règles Suricata pour la détection d'intrusions.

## Structure du Projet

- **backend**: Contient le code serveur Node.js pour gérer les requêtes et les interactions avec la base de données.
- **frontend**: Contient le code client React.js pour l'interface utilisateur.
- **mysql**: Contient le script SQL pour la configuration de la base de données.
- **suricata_rules**: Contient les règles Suricata personnalisées pour détecter les injections SQL.

## Prérequis

- Node.js
- MySQL
- MariaDB
- Suricata
- npm (Node Package Manager)

## Installation

### Mysql

1. Assurez vous que l'utilisateur mysql que vous voulez utiliser a les droits sur toutes les database ou juste sur celle-ci: **suricataDB**

Exemple:
```sql
GRANT ALL PRIVILEGES ON *.* TO 'USERNAME'@'localhost';
FLUSH PRIVILEGES;
```
ou

```sql
GRANT ALL PRIVILEGES ON suricataDB.* TO 'USERNAME'@'localhost';
FLUSH PRIVILEGES;
```

2. Lancez les commandes suivantes
```sh
cd mysql # En étant dans le dossier SuricataWebApp

mysql -u USER -p < setup.sql
``` 

### Backend

1. Naviguez vers le répertoire backend:
```sh
cd backend # En étant dans le dossier SuricataWebApp


npm install
```

2. Créez un fichier .env et mettez les informations suivante:
```
DB_HOST=127.0.0.1
DB_USER=username
DB_PASSWORD=password
DB_NAME=suricataDB
```

3. Lancez le serveur
```
npm start
```

### Frontend

1. Naviguez vers le répertoire backend:
```sh
cd frontend # En étant dans le dossier SuricataWebApp


npm install
```

2. Modifiez la ligne du fichier LoginForm.js en mettant l'adresse IP de votre machine
```
const response = await axios.post('http://IP:3001/login', {...})
```

3. Lancez le serveur
```
npm start
```

### Suricata

1. Créez un fichier **NAME_FILE.rules** dans le dossier /etc/suricata/rules/

2. Ajoutez le chemin vers ce fichier dans **suricata.yaml** dans la section rule-files:
```
rule-files:
  - /PATH/NAME_FILE.rules
```

3. Redémarrez suricata pour appliquer les nouvelles règles:
```
sudo systemctl restart suricata
```

4. Lancez la commande suivante afin de voir les alertes au fur et à mesure
```bash
tail -f /var/log/suricata/fast.log 
```

## Utilisation

1. Accédez à l'application frontend via une autre machine (VM ou autres) sur l'adresse suivante:
```
http://IP:3000
```

2. Testez les différentes vulnérabilité sur l'application

3. Vérifiez les logs dans votre terminale