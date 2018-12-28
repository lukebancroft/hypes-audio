# hypes-audio
hypes-audio est une copie du site de vente de plugins audios Mod Devices [https://www.moddevices.com]

**Hébergé à ...**

Ce site est développé avec React et les données sont stockées sur Firebase.

Dans un premier temps, un utilisateur peut se connecter ou créer un compte pour accéder à du contenu réservé aux utilisateurs connectés, cette gestion des utilisateurs est également gérée par Firebase et la connexion peut se faire par simple couple email/mot de passe, ou bien avec un compte Google, Facebook ou Github.
Un utilisateur qui se serait connecté au site sans s'y déconnecter se vera reconnecté automatiquement à sa prochaine visite.

Deux collections de plugins existent sur le site : 
- La première correspond à la gallerie et sert à mettre en avant les plugins phares du site, vous pouvez retrouver ces plugins dans l'onglet "Gallery" du menu
- Le seconde, présentée sous la forme d'une Masonry grid sert à présenter tous les autres plugins en vente sur le site. Cette page se trouve dans l'onglet' "Plugins" du menu du site et les résultats peuvent être filtrés en fonction d'un tag et/ou de leur nom

En cliquant sur un plugin sur une de ces deux pages, la page détaillant les caractéristiques du plugin apparaît.

Les utilisateurs connectés ont accès à l'onglet "Account" du menu. Sur cette page, il est possible de gérer tous les plugins associés à son compte, c'est à dire la mise en ligne, la modification et la suppression de ceux-là. Une fois en ligne, le plugin est visible par tous dans l'onglet "Plugins" du menu.


---


Installation
-

Pré-requis :
- Assurez-vous d'avoir d'abord installé node et npm dans votre terminal
- Installez ensuite le projet à l'aide de la commande :
```sh
npm install
```
- Démarrez l'application :
```sh
npm start
```

- Vous devriez être redirigé vers l'adresse suivante, si ce n'est pas le cas accédez-y dans votre navigateur web :
```sh
localhost:3000
```

Projet M2 MBDS Nice Sophia Antipolis - Promo 2018/2019 - Enseignant: Michel Buffa - Langage : React