Ce dépôt représente la partie backend du projet Globe Store, un jeu de quiz cinématographique basé sur un concept simple :

--------------------------------------------Backend-----------------------------------------------------------------------

Le joueur voit l’affiche d’un film et la photo d’un acteur, puis doit deviner si cet acteur fait partie du casting du film.
  Le but est d’offrir une expérience ludique et progressive :  
   - Proposer une série de films aléatoires
   - Afficher à chaque tour un acteur (populaire ou non) à associer ou non à un film donné.
   - Augmenter la difficulté en réduisant progressivement la popularité des acteurs proposés.
   - 
Développé avec Node.js + Express, ce backend est structuré de manière modulaire et expose trois endpoints principaux :

GET /movies/list
Récupère une liste aléatoire de films depuis l'API externe TMDb.
Utilisée pour initialiser ou rafraîchir le jeu.

GET /movies/:id/actors
Récupère la liste complète des acteurs d’un film donné (via son ID TMDb).
Utilisée pour déterminer si un acteur appartient réellement au casting.

GET /actors
Récupère une liste aléatoire d’acteurs, triés par popularité décroissante.
Avec chaque nouveau tour, des acteurs moins populaires sont proposés, augmentant ainsi la difficulté du jeu.

L’objectif est de maintenir un taux de randomness équilibré à ~50% :
  - 50% de chance que l’acteur soit bien présent dans le casting du film proposé.
  - 50% de chance qu’il ne le soit pas (choix aléatoire parmi d'autres acteurs populaires non liés au film).
  - Le système est conçu pour augmenter le challenge au fil de la partie, en proposant des visages moins connus dans les tours suivants.

     intégration de redis pour la persisante du hash de la question et réponse 

--------------------------------------------Frontend-----------------------------------------------------------------------

le front est si simple: développer en reactjs la composition du projet est comme suit: 
  - Game contenaire du card play qui affiche les resulatant et le refresh game
  - CardPlay affiche l'image du film et de l'acteur en question
  - Home une jolie interface pour avoir envie de jouer

--------------------------------------------Deploiement-----------------------------------------------------------------------
    
dockeriser les deux app front et back et utilisation de nginx plour server les bundles front et en l'utilisant aussi comme reverse proxy
pour dispatcher les requetes api vers le service du back
les images docker sont ensuite pusher dans mon registry sur dockerhub pour qu'elles soient pull depuis l'instance EC2
l'application est donc deployer sur AWS sous l'url : http://ec2-3-85-43-26.compute-1.amazonaws.com/ ( un certificat ssl n'est pas utliser en ce moment )

--------------------------------------------Screenshots-----------------------------------------------------------------------
  <img width="558" alt="image" src="https://github.com/user-attachments/assets/d487e598-dc59-457e-bbe6-a3e698db018b" />
  <img width="367" alt="image" src="https://github.com/user-attachments/assets/3cd14197-e5e5-4df2-a8b7-477752290035" />
  <img width="479" alt="image" src="https://github.com/user-attachments/assets/79af37f0-672d-43e7-98b8-6836624876b9" />
  <img width="421" alt="image" src="https://github.com/user-attachments/assets/8320a3dc-aa82-4531-b816-892ab3499a75" />




