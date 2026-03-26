SYSTEMATIC WEBSITE STRUCTURE

1) To change campus photos:
   Replace files in images/campus/ using the SAME names:
   hero.jpg, campus1.jpg, campus2.jpg, campus3.jpg, campus4.jpg, campus5.jpg

2) To add / edit champions:
   Open data/champions.js
   Add a new object:
   {
     name: "Name",
     highlight: "Highlight",
     quote: "Short quote",
     linkedin: "https://linkedin.com/in/...",
     image: "images/champions/yourfile.jpg",
     show: true
   }

3) Put that student's image in:
   images/champions/

4) To hide someone:
   change show: true -> show: false

5) To run:
   Open index.html
   or use VS Code + Live Server
