# Projet de fin de Licence 3 : Urbino

***Thomas Larose** : Responsable git, développeur, chef de projet*

***Edouard Delattre** : Responsable graphique*

***Théo Toulotte** : Développeur*
 
## Intitulé
> A l'aide du framework **openxum-es6**, on veut réaliser un jeu nommé Urbino. 

## Règles du jeu
- Urbino se joue sur un plateau de 9 par 9 par deux joueurs (Noir et Blanc).
- Le premier joueur pose un architecte sur la grille, puis le deuxième joueur pose le deuxième architecte.
- Le joueur noir décide qui commence.
- Le premier à jouer pose un bâtiment à l'intersection des lignes de vue des deux architectes.
- Le second à jouer peut déplacer un architecte sur n'importe quelle case non occupée, puis pose un bâtiment à l'intersection des lignes de vue des deux architectes sur une case non occupée.
- Les bâtiments de même couleur adjacents forment des **blocks**. Les blocks accolés de couleurs différentes forment des **quartiers**.
- Un quartier ne peut contenir que deux blocks, un de chaque couleur. Il est impossible de poser un bâtiment s'il relie deux quartiers, ou un quartier et un block si cela forme un quartier à plus de deux blocks.
- La partie prend fin lorsque les deux joueurs doivent passer leur tour, n'ayant plus de case disponible pour jouer un bâtiment.
