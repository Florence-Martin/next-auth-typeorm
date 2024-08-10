### Mise en Place d’un Système d’Authentification avec Next.js, TypeScript, NextAuth.js, TypeORM et Bcrypt

<details>
  <summary> 1. Installation les Dépendances</summary>

- Installer les dépendances nécessaires pour Next.js, TypeScript, NextAuth.js, TypeORM, bcrypt pour le hachage des mots de passe et jsonwebtoken pour les tokens JWT.
  ```sh
  npm install next@latest react@latest react-dom@latest
  npm install typescript @types/react @types/node --save-dev
  npm install next-auth typeorm bcrypt jsonwebtoken
  ```
  </details>

<details>
  <summary>2. Configuration de TypeORM</summary>

- Créer un fichier de configuration pour TypeORM afin de connecter l’application à la base de données.
- Définir par exempl une entité **User** pour représenter les utilisateurs dans la base de données, avec des champs comme id, name, email, et password.
</details>

<details>
  <summary>3. Définition de l’Entité Utilisateur</summary>

- Créer une entité User dans TypeORM pour gérer les informations des utilisateurs dans la base de données.

</details>

<details>
  <summary>4. Récupération des CLIENT_ID et CLIENT_SECRET des Réseaux Sociaux</summary>

• **Google**

1.  Aller sur Google Developer Console.
2.  Créer un nouveau projet.
3.  Activer les API “Google+ API” ou “Google People API”.
4.  Créer des identifiants d’application OAuth 2.0.
5.  Ajouter votre URL de redirection autorisée (par exemple, http://localhost:3000/api/auth/callback/google).
6.  Copier le CLIENT_ID et le CLIENT_SECRET.
    • **GitHub**
7.  Aller sur GitHub Developer Settings.
8.  Créer une nouvelle application OAuth.
9.  Ajouter votre URL de redirection autorisée (par exemple, http://localhost:3000/api/auth/callback/github).
10. Copier le CLIENT_ID et le CLIENT_SECRET.

</details>

<details>
  <summary>5. Configuration de NextAuth</summary>

- Configurer NextAuth pour utiliser différents fournisseurs d’authentification comme Google, GitHub et Credentials (email et mot de passe).
- Définir les options de session et les callbacks pour manipuler les tokens JWT et les sessions.

</details>

<details>
  <summary>6. Mise en Place de Bcrypt pour le Hachage des Mots de Passe</summary>

- Utiliser bcrypt pour hacher les mots de passe des utilisateurs lors de leur création.
- Comparer les mots de passe fournis lors de la connexion avec ceux stockés dans la base de données en utilisant bcrypt.

</details>

<details>
  <summary>7. Utilisation de JWT pour les Sessions</summary>

- Configurer NextAuth pour utiliser la stratégie JWT pour les sessions.
- Ajouter des callbacks pour manipuler les tokens JWT et ajouter des informations supplémentaires comme l’id de l’utilisateur.

</details>

<details>
  <summary>8. Création de l’API d’Authentification</summary>

- Créer des routes API pour gérer les requêtes d’authentification avec NextAuth.
- Configurer les routes pour gérer les méthodes GET et POST pour l’authentification.

</details>

<details>
  <summary>9. Création des Pages d’Authentification</summary>

- Créer une page de connexion personnalisée pour permettre aux utilisateurs de se connecter via des identifiants ou des réseaux sociaux.
- Ajouter des formulaires et des boutons de connexion pour les différents fournisseurs d’authentification.
- Ajouter la possibilité de d'enregistrer **Sign up**

</details>

<details>
  <summary>10. Création des Composants d’Authentification</summary>

    - Créer des composants pour gérer les formulaires de connexion et les boutons de connexion avec les réseaux sociaux.
    - Gérer les états des formulaires et les appels aux fonctions de connexion de NextAuth.

</details>
